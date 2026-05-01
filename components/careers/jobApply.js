// export default JobApply;
import React, { useState, useRef, useId } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import emailjs from '@emailjs/browser';
import { fetchCarrerApplication } from "@services/APIs/common.service";
import { useParams } from "next/navigation";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_cfucsbo";
const EMAILJS_TEMPLATE_ID = "template_r4nul6m";
const EMAILJS_PUBLIC_KEY = "pkUUvmDDEobvJa7L5";

function JobApply({ openInModal, currentCareer, postId }) {
  // Generate unique ID for this component instance
  const uniqueId = useId();
  const fileInputId = `file-upload-${uniqueId}`;
  
  const [documents, setDocuments] = useState([]);
  const [request, setRequest] = useState({
    name: "",
    email: "",
    phone: "",
    career: 0,
    locale: "en",
    document: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);
  const router = useRouter();
  const params = useParams();
  const [phoneError, setPhoneError] = useState("");
  const fileInputRef = useRef(null); // Add ref for file input

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        phone: {
          message: "Please enter a valid phone number",
          rule: (val, params, validator) => {
            try {
              if (!val) return false;
              const cleanedValue = val.replace(/[^\d+]/g, "");
              return isValidPhoneNumber(cleanedValue);
            } catch (error) {
              return false;
            }
          },
        },
      },
    })
  );

  const validatePhone = (phoneValue) => {
    if (!phoneValue) {
      setPhoneError("Phone number is required");
      return false;
    } else if (!isValidPhoneNumber(phoneValue)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    // Validate file type - only PDF
    const allowedTypes = [".pdf"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setUploadStatus("Please upload a PDF document.");
      toast.error("Please upload a PDF document.");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadStatus("File size must be less than 5MB.");
      toast.error("File size must be less than 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus("Uploading...");
      
      const formData = new FormData();
      formData.append("files", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadStatus(`Uploading: ${percentCompleted}%`);
          },
        }
      );

      if (response.data && response.data[0]) {
        setDocuments([response.data[0]]);
        setUploadStatus("File uploaded successfully.");
        toast.success("File uploaded successfully!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      const errorMessage = error.response?.data?.message || "Error uploading file. Please try again.";
      setUploadStatus(errorMessage);
      toast.error(errorMessage);
      setDocuments([]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const removeDocument = () => {
    setDocuments([]);
    setUploadStatus("");
    // Reset file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectFile = () => {
    // Use ref instead of getElementById
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const sendEmailNotification = async (fileUrl, fileName) => {
    try {
      const templateParams = {
        from_name: request.name,
        from_email: request.email,
        phone: request.phone,
        career_position: currentCareer || `Position ID: ${params.postId}`,
        resume_url: fileUrl,
        resume_name: fileName,
        application_date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        message: `New job application received from ${request.name}. Resume can be downloaded from the provided link.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", response);
      return response;
    } catch (error) {
      console.error("EmailJS Error:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const formValid = simpleValidator.current.allValid();
    const isPhoneValid = validatePhone(request.phone);

    if (!formValid || !isPhoneValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      toast.error("Please fill all required fields correctly");
      return;
    }

    if (isUploading) {
      toast.warning("Please wait for the file to finish uploading");
      return;
    }

    if (documents.length === 0 || !documents[0]?.id || !documents[0]?.url) {
      toast.error("Please upload your resume/CV");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        data: {
          name: request.name,
          email: request.email,
          phone: request.phone,
          document: documents[0].id,
          career: parseInt(params.postId),
          locale: "en",
        },
      };

      const apiResponse = await fetchCarrerApplication(payload);

      const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}${documents[0].url}`;
      const fileName = documents[0].name;

      try {
        await sendEmailNotification(fileUrl, fileName);
        console.log("Email notification sent successfully");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        toast.warning("Application saved but email notification failed");
      }

      // Reset form
      setRequest({
        name: "",
        email: "",
        phone: "",
        career: 0,
        locale: "en",
        document: "",
      });
      setPhoneError("");
      setDocuments([]);
      setUploadStatus("");
      
      // Reset file input using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      simpleValidator.current.hideMessages();
      forceUpdate(0);

      toast.success("Application submitted successfully!");
      router.push("/create-thankyou");

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message || "Error submitting application. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setRequest((prev) => ({ ...prev, phone: `+${value}` }));
    validatePhone(`+${value}`);
  };

  return (
    <div className="job-apply-container">
      {!openInModal && <h3>Apply Now</h3>}
      <p className="contact-sub-text">
        By clicking "Apply Now," I understand and agree to terms and conditions
      </p>
      <div className="contact-form">
        <div className="form-group">
          <label className="contact-label" htmlFor={`name-${uniqueId}`}>
            Name *
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            id={`name-${uniqueId}`}
            className="form-control contact-form-control"
            value={request.name}
            onChange={handleChange}
            name="name"
          />
          {simpleValidator.current.message(
            "Name",
            request.name,
            "required"
          ) && (
            <span className="form-error">
              {simpleValidator.current.message(
                "Name",
                request.name,
                "required"
              )}
            </span>
          )}
        </div>

        <div className="form-group mt-3">
          <label className="contact-label" htmlFor={`email-${uniqueId}`}>
            Email Address *
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            id={`email-${uniqueId}`}
            name="email"
            className="form-control contact-form-control"
            value={request.email}
            onChange={handleChange}
          />
          {simpleValidator.current.message(
            "Email",
            request.email,
            "required|email"
          ) && (
            <span className="form-error">
              {simpleValidator.current.message(
                "Email",
                request.email,
                "required|email"
              )}
            </span>
          )}
        </div>

        <div className="form-group my-3">
          <label className="contact-label" htmlFor={`phone-${uniqueId}`}>
            Mobile Number *
          </label>
          <PhoneInput
            country={"in"}
            value={request.phone.replace(/^\+/, "")}
            onChange={handlePhoneChange}
            inputClass="form-control form-control-height w-100 custom-phone-input"
            containerClass="phone-input-container"
            inputProps={{
              name: "phone",
              id: `phone-${uniqueId}`,
              required: true,
            }}
            countryCodeEditable={false}
            enableSearch={true}
            disableCountryCode={false}
            preserveOrder={["onlyCountries", "preferredCountries"]}
            placeholder="Enter Mobile Number"
          />
          {phoneError && <span className="form-error mb-0">{phoneError}</span>}
        </div>

        <div className="form-group">
          <label className="contact-label">Resume/CV *</label>
          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={isUploading}
          />
          <div
            className="resume-drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{ opacity: isUploading ? 0.6 : 1 }}
          >
            <p>Drag & Drop Files Here</p>
            <p>Or</p>
            <button
              type="button"
              className="select-file-btn"
              onClick={selectFile}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Select a file"}
            </button>
            <p className="file-hint">Accepted formats: PDF (Max 5MB)</p>
          </div>

          {uploadStatus && (
            <p
              className={`upload-status ${
                uploadStatus.includes("Error") || uploadStatus.includes("Please") 
                  ? "error" 
                  : uploadStatus.includes("successfully") 
                  ? "success" 
                  : ""
              }`}
            >
              {uploadStatus}
            </p>
          )}

          {documents.length > 0 && documents[0]?.name && (
            <div className="attached-file">
              <p>{documents[0].name}</p>
              <button
                type="button"
                onClick={removeDocument}
                className="remove-file"
                aria-label="Remove file"
                disabled={isUploading}
              >
                <img src="/images/closeSVG.svg" alt="Remove" />
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="theme-button theme-primary-btn w-100 mt-4"
          onClick={handleSubmit}
          disabled={isLoading || isUploading}
        >
          {isLoading ? "Submitting..." : isUploading ? "Please wait..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default JobApply;