"use client";
import React, { useRef } from "react";
import { getValue } from "/utils/lodash";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import SimpleReactValidator from "simple-react-validator";

function Tab1(props) {
  const {
    propertyType = "sale",
    setPropertyType = () => {},
    handleChangeRequest = () => {},
    simpleValidator = { current: { message: () => "" } },
    request = { full_name: "", email: "", phone: "" },
    handleSubmit = () => {},
    isLoading = false,
    setRequest = () => {},
    phoneError = "",
    setPhoneError = () => {},
    isValidPhoneNumber = () => true,
  } = props;
  // function blockSpecialChar(e) {
  //   var k;
  //   document.all ? (k = e.keyCode) : (k = e.which);
  //   return (
  //     (k > 64 && k < 91) ||
  //     (k > 96 && k < 123) ||
  //     k == 8 ||
  //     k == 32 ||
  //     (k >= 48 && k <= 57)
  //   );
  // }

  const handlePhoneChange = (value, country) => {
    try {
      const dialCode = country.dialCode;
      const incomingDialCode = `+${dialCode}`;

      // When user picks a country from the flag dropdown, react-phone-input-2
      // fires onChange with value === dialCode only. In that case just update
      // the dial code and clear the subscriber number so no stale digits carry over.
      const fullPhone = `+${value}`;

      setRequest((prev) => ({
        ...prev,
        phone: fullPhone,
        country_code: incomingDialCode,
      }));

      // Only validate when there is a subscriber number beyond the dial code
      const subscriberPart = value.slice(dialCode.length);
      if (subscriberPart) {
        if (!isValidPhoneNumber(fullPhone)) {
          setPhoneError("Please enter a valid phone number");
        } else {
          setPhoneError("");
        }
      } else {
        setPhoneError("");
      }
    } catch (error) {
      setPhoneError("Please enter a valid phone number");
      console.error("Phone validation error:", error);
    }
  };

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        phone: {
          message: "Please enter a valid phone number",
          rule: (val, params, validator) => {
            try {
              if (!val) return false;
              // Remove spaces and any other non-digit characters except +
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

  // Create a safe validator function that won't throw errors during build
  const safeValidatorMessage = (field, value, rules) => {
    try {
      if (simpleValidator?.current?.message) {
        return simpleValidator.current.message(field, value, rules);
      }
      return "";
    } catch (error) {
      return "";
    }
  };

  return (
    <div>
      <h3>Add Your Details</h3>
      <div className="form-container mt-3">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label
                className={`radio-css ${
                  propertyType === "sale" ? "active" : ""
                }`}
                htmlFor="radio1"
              >
                <div>
                  <h4>Sale</h4>
                  {/* <p>
                                        You are the person who owns the property and fully
                                        incharge
                                    </p> */}
                </div>
                <input
                  type="radio"
                  id="radio1"
                  name="sale"
                  checked={propertyType === "sale" ? true : false}
                  onChange={() =>
                    setPropertyType(propertyType === "sale" ? "rent" : "sale")
                  }
                />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label
                className={`radio-css ${
                  propertyType === "rent" ? "active" : ""
                }`}
                htmlFor="radio2"
              >
                <div>
                  <h4>Rent/Lease</h4>
                  {/* <p>
															You are the person who owns the property and fully
															incharge
														</p> */}
                </div>
                <input
                  type="radio"
                  id="radio2"
                  name="rent"
                  checked={propertyType === "rent" ? true : false}
                  onChange={() =>
                    setPropertyType(propertyType === "sale" ? "rent" : "sale")
                  }
                />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="fullname" className="label-contact">
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Enter Full Name"
                className="form-control form-control-height"
                onChange={(e) => {
                  // Only allow letters and spaces
                  const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  e.target.value = value;
                  handleChangeRequest(e);
                }}
                value={getValue(request, "full_name", "")}
              />
              <div className="form-error">
                {safeValidatorMessage(
                  "Full Name",
                  getValue(request, "full_name", ""),
                  "required"
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="email" className="label-contact">
                Email Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                className="form-control form-control-height"
                onChange={handleChangeRequest}
                value={getValue(request, "email", "")}
              />
              <div className="form-error">
                {safeValidatorMessage(
                  "Email",
                  getValue(request, "email", ""),
                  "required|email"
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="phone" className="label-contact">
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <PhoneInput
                country={"in"}
                value={request?.phone ? request.phone.replace(/^\+/, "") : ""} // value without "+"
                onChange={handlePhoneChange}
                inputClass="form-control form-control-height w-100 custom-phone-input"
                containerClass="phone-input-container"
                inputProps={{
                  name: "phone",
                  id: "phone",
                  required: true
                }}
                countryCodeEditable={false}
                enableSearch={true}
                disableDefaultCountry={false}
                placeholder="Enter phone number"
              />
              <span className="form-error">
                {phoneError}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-5 d-flex gap-3">
        {isLoading ? (
          <button className="theme-button theme-primary-btn mr-3">
            Please wait...
          </button>
        ) : (
          <button
            className="theme-button theme-primary-btn mr-3"
            onClick={() => handleSubmit(2, "tab2")}
          >
            Next
          </button>
        )}
        <Link href="/">
          <button className="theme-button theme-secondary-btn mr-0">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
}
// Testing
export default Tab1;
