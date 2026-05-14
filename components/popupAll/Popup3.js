"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postCreatePopupInquiry } from "services/APIs/common.service";

// Mock functions for demonstration
const getValue = (obj, path, defaultValue) => {
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  return result !== undefined ? result : defaultValue;
};

const isValidPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10;
};

const Popup3 = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isContactLoading, setContactLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "2BHK",
    message: "",
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("pkUUvmDDEobvJa7L5");
  }, []);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      
      const img = new window.Image();
      img.src = '/nambiar-min.png';
      img.onload = () => {
        setImageLoaded(true);
      };
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case "name":
        if (!value || value.trim() === "") {
          error = "The name field is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name can only contain alphabetical characters.";
        }
        break;
      case "phone":
        if (!value || value.trim() === "") {
          error = "The phone field is required.";
        } else if (!isValidPhoneNumber(value)) {
          error = "Please enter a valid 10-digit phone number";
        }
        break;
      case "email":
        if (!value || value.trim() === "") {
          error = "The email field is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "The email field must be a valid email.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle phone number - only allow digits, max 10
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setRequest({
          ...request,
          [name]: digitsOnly,
        });
      }
    }
    // Handle name - only allow alphabetical characters and spaces
    else if (name === "name") {
      const alphabetsOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setRequest({
        ...request,
        [name]: alphabetsOnly,
      });
    }
    // Handle other fields normally
    else {
      setRequest({
        ...request,
        [name]: value,
      });
    }

    if (hasSubmitted && errors[name]) {
      const error = validateField(name, name === "phone" ? value.replace(/\D/g, "") : value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (hasSubmitted) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }));
    }
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);

    const newErrors = {};
    ["name", "phone", "email"].forEach((field) => {
      const error = validateField(field, request[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setContactLoading(true);

      // Add +91 prefix to phone number
      const phoneWithPrefix = `+91${request.phone}`;

      // Prepare EmailJS template parameters
      const templateParams = {
        from_name: request.name,
        from_email: request.email,
        phone: phoneWithPrefix,
        property_type: request.propertyType,
        message: request.message || "No additional message provided",
        popup_source: "Popup 3",
        submission_date: new Date().toLocaleString(),
      };

      // Prepare Strapi payload
      const strapiPayload = {
        data: {
          name: request.name,
          email: request.email,
          phone: phoneWithPrefix,
          message: request.message || "No additional message provided",
          popupname: "Popup 3",
          apartment: request.propertyType,
        }
      };

      // Call both APIs in parallel
      const [emailResponse, strapiResponse] = await Promise.all([
        emailjs.send(
          'service_cfucsbo',
          'template_m20yx5d',
          templateParams
        ),
        postCreatePopupInquiry(strapiPayload)
      ]);

      if (emailResponse.status === 200 && strapiResponse) {
        toast.success("Thank you for your interest! We will contact you soon.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        setContactLoading(false);
        setRequest({
          name: "",
          phone: "",
          email: "",
          propertyType: "2BHK",
          message: "",
        });
        setErrors({});
        setTouched({});
        setHasSubmitted(false);
        setShowModal(false);
      } else {
        setContactLoading(false);
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setContactLoading(false);
      
      if (error.response) {
        toast.error("Failed to save your enquiry. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (error.text) {
        toast.error("Failed to send email. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!mounted || !showModal) {
    return null;
  }

  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 768;
  const isDesktop = windowWidth <= 1024;

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 9998,
        }}
      ></div>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "75vw" : isTablet ? "85vw" : "min(58vw, 1200px)",
          height: isMobile ? "90vh" : isTablet ? "85vh" : "min(78vh, 600px)",
          backgroundColor: "white",
          borderRadius: "8px",
                    
          boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
          zIndex: 9999,
          overflow: "hidden",
          animation: "slideIn 0.4s ease-out",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: isMobile ? "30px" : "36px",
            height: isMobile ? "30px" : "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? "16px" : "20px",
            color: "#666",
            zIndex: 10000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: isMobile ? "column" : "row" }}>
          {/* Left Side - Enhanced Visual Section */}
          <div
            style={{
              flex: isMobile ? "none" : 1,
              height: isMobile ? "auto" : "100%",
              position: "relative",
              padding: isMobile ? "0px" : isTablet ? "20px" : "30px",
              color: "white",
              display: isMobile ? "block" : "block",
            }}
          >
            {/* Image Component */}
            <img
              src="/nambiar-min.png"
              alt="Popup background"
              style={{
                position: isMobile ? "static" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: isMobile ? "auto" : "100%",
                objectFit: "fill",
                objectPosition: "center",
                zIndex: -2,
                display: "block",
                backgroundColor: windowWidth <= 1024 ? "transparent" : "transparent"
              }}
            />

            {/* Bottom Section - Stats & Features */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : isDesktop ? "column" : "row",
                  gap: isMobile ? "6px" : "12px",
                  marginTop: isTablet ? "20px" : "300px",
                }}
              >
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className="no"
            style={{
              width: isMobile ? "100%" : isTablet ? "50%" : "350px",
              flex: isMobile ? 1 : "none",
              padding: isMobile ? "15px" : isTablet ? "20px" : "30px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: isMobile ? "flex-start" : "space-between",
              gap: isMobile ? "15px" : "0",
              height: isMobile ? "auto" : "100%",
              overflowY: "auto",
            }}
          >
            {/* Form Header */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? "0px" : "20px" }}>
              <h3
                style={{
                  fontSize: isMobile ? "18px" : isTablet ? "20px" : "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "6px",
                }}
              >
                Get Started
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: isMobile ? "12px" : "14px",
                  lineHeight: "1.4",
                }}
              >
                Fill in your details and we'll help you find the perfect property
              </p>
            </div>

            {/* Form Fields */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "8px" : "16px"
              }}
            >
              {/* Name Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: isMobile ? "4px" : "6px",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={request.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 10px" : "10px 12px",
                    border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                />
                {errors.name && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: isMobile ? "4px" : "6px",
                  }}
                >
                  Phone Number *
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: isMobile ? "10px" : "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6b7280",
                      fontSize: isMobile ? "13px" : "14px",
                      pointerEvents: "none",
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={request.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="9999999999"
                    maxLength="10"
                    style={{
                      width: "100%",
                      padding: isMobile ? "8px 10px 8px 42px" : "10px 12px 10px 45px",
                      border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
                      borderRadius: "8px",
                      fontSize: isMobile ? "13px" : "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>
                {errors.phone && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: isMobile ? "4px" : "6px",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={request.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 10px" : "10px 12px",
                    border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                />
                {errors.email && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: isMobile ? "4px" : "6px",
                  }}
                >
                  Choose Appartement
                </label>
                <select
                  name="propertyType"
                  value={request.propertyType}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 10px" : "10px 12px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: isMobile ? "13px" : "14px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                  }}
                >
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="3.5BHK">3.5 BHK</option>
                  <option value="4BHK">4 BHK</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: isMobile ? "4px" : "6px",
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={request.message}
                  onChange={handleInputChange}
                  rows={isMobile ? 2 : 3}
                  style={{
                    width: "100%",
                    padding: isMobile ? "6px 10px" : "10px 12px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: isMobile ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    minHeight: isMobile ? "50px" : "80px",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isContactLoading}
                style={{
                  width: "100%",
                  padding: isMobile ? "10px" : "12px",
                  background: isContactLoading
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: isMobile ? "13px" : "14px",
                  fontWeight: "600",
                  cursor: isContactLoading ? "not-allowed" : "pointer",
                  opacity: isContactLoading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                {isContactLoading ? (
                  <span>Submitting...</span>
                ) : (
                  "Get Property Details"
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <p
              style={{
                fontSize: isMobile ? "10px" : "11px",
                color: "#6b7280",
                textAlign: "center",
                lineHeight: "1.4",
                marginTop: isMobile ? "12px" : "16px",
              }}
            >
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy. We'll only contact you about relevant property
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup3;
