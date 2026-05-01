"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
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

const WelcomePopup = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isContactLoading, setContactLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "2BHK",
    message: "",
  });

  // EmailJS Configuration - Replace these with your actual values
  const EMAILJS_SERVICE_ID = "service_cfucsbo";
  const EMAILJS_TEMPLATE_ID = "template_m20yx5d";
  const EMAILJS_PUBLIC_KEY = "pkUUvmDDEobvJa7L5";

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    const img = new window.Image();
    img.src = '/pop-min.jpeg';
    img.onload = () => {
      setImageLoaded(true);
    };
    const cleanup = () => {
      window.removeEventListener('resize', handleResize);
    };
    return cleanup;
  }, []);

  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

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
        [name]: error,
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
        [name]: error,
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
      toast.error("Please fill in all required fields correctly.");
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
        popup_source: "Popup 1",
        submission_date: new Date().toLocaleString(),
      };

      // Prepare Strapi payload
      const strapiPayload = {
        data: {
          name: request.name,
          email: request.email,
          phone: phoneWithPrefix,
          message: request.message || "No additional message provided",
          popupname: "Popup 1",
          apartment: request.propertyType,
        }
      };

      // Call both APIs in parallel
      const [emailResponse, strapiResponse] = await Promise.all([
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ),
        postCreatePopupInquiry(strapiPayload)
      ]);

      // Check if both succeeded
      if (emailResponse.status === 200 && strapiResponse) {
        toast.success("Thank you for your interest! We will contact you soon.");
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
        if (onClose) onClose();
      } else {
        setContactLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setContactLoading(false);
      
      // More specific error messages
      if (error.response) {
        toast.error("Failed to save your enquiry. Please try again.");
      } else if (error.text) {
        toast.error("Failed to send email. Please try again.");
      } else {
        toast.error("Failed to submit your enquiry. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (onClose) onClose();
  };

  if (!mounted || !showModal) {
    return null;
  }

  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95vw" : isTablet ? "85vw" : "min(70vw, 1100px)",
    maxWidth: isMobile ? "400px" : "none",
    height: isMobile ? "95vh" : isTablet ? "85vh" : "min(85vh, 700px)",
    maxHeight: "95vh",
    backgroundColor: "white",
    borderRadius: isMobile ? "12px" : "16px",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
    zIndex: 9999,
    overflow: "hidden",
    animation: "slideIn 0.4s ease-out",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: isMobile ? "12px" : "16px",
    right: isMobile ? "12px" : "16px",
    width: isMobile ? "32px" : "36px",
    height: isMobile ? "32px" : "36px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isMobile ? "18px" : "20px",
    color: "#666",
    zIndex: 10000,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease",
  };

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
      />

      <div style={modalStyles}>
        <button onClick={closeModal} style={closeButtonStyles}>
          ×
        </button>

        <div 
          style={{ 
            display: "flex", 
            height: "100%", 
            width: "100%", 
            flexDirection: isMobile ? "column" : "row" 
          }}
        >
          <div
            style={{
              flex: isMobile ? "none" : 1,
              height: isMobile ? "35%" : "100%",
              minHeight: isMobile ? "200px" : "auto",
              position: "relative",
              padding: isMobile ? "16px" : isTablet ? "24px" : "32px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('/pop-min.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -2,
              }}
            />
          </div>

          <div
            style={{
              width: isMobile ? "100%" : isTablet ? "400px" : "450px",
              flex: isMobile ? 1 : "none",
              padding: isMobile ? "20px" : isTablet ? "24px" : "32px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              height: isMobile ? "65%" : "100%",
              overflowY: "auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: isMobile ? "16px" : "24px" }}>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "8px",
                }}
              >
                Get Started
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.5",
                }}
              >
                Fill in your details and we'll help you find the perfect property
              </p>
            </div>

            <div
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: isMobile ? "16px" : "20px",
                flex: 1,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
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
                    padding: isMobile ? "12px" : "14px",
                    border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                />
                {errors.name && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Phone Number *
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: isMobile ? "12px" : "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6b7280",
                      fontSize: isMobile ? "16px" : "14px",
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
                      padding: isMobile ? "12px 12px 12px 50px" : "14px 14px 14px 50px",
                      border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
                      borderRadius: "8px",
                      fontSize: isMobile ? "16px" : "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                  />
                </div>
                {errors.phone && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
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
                    padding: isMobile ? "12px" : "14px",
                    border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                />
                {errors.email && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "6px",
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
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Choose Apartment
                </label>
                <select
                  name="propertyType"
                  value={request.propertyType}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    outline: "none",
                  }}
                >
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="3.5BHK">3.5 BHK</option>
                  <option value="4BHK">4 BHK</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={request.message}
                  onChange={handleInputChange}
                  rows={isMobile ? 3 : 4}
                  placeholder="Tell us about your requirements..."
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    minHeight: isMobile ? "80px" : "100px",
                    outline: "none",
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isContactLoading}
                style={{
                  width: "100%",
                  padding: isMobile ? "14px" : "16px",
                  background: isContactLoading
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: isMobile ? "16px" : "14px",
                  fontWeight: "600",
                  cursor: isContactLoading ? "not-allowed" : "pointer",
                  opacity: isContactLoading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                  marginTop: "8px",
                }}
              >
                {isContactLoading ? (
                  <span>Submitting...</span>
                ) : (
                  "Get Property Details"
                )}
              </button>

              <p
                style={{
                  fontSize: isMobile ? "12px" : "11px",
                  color: "#6b7280",
                  textAlign: "center",
                  lineHeight: "1.4",
                  marginTop: isMobile ? "12px" : "8px",
                }}
              >
                By submitting this form, you agree to our Terms of Service and
                Privacy Policy. We'll only contact you about relevant property
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePopup;
