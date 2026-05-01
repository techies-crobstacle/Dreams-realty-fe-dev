// import React, { useRef, useState, useEffect } from "react";
// import { Modal, ModalBody, ModalHeader } from "reactstrap";
// import SimpleReactValidator from "simple-react-validator";
// import { getValue } from "../../../utils/lodash";
// import {
//   postCreateSalePropertyEnquiry,
//   postCreateRentPropertyEnquiry,
// } from "../../../services/APIs/common.service";
// import { toast } from "react-toastify";
// import { isValidPhoneNumber } from "libphonenumber-js";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import emailjs from "@emailjs/browser";

// const HomeCTA = ({
//   modal,
//   toggle,
//   type,
//   id,
//   propertyName,
//   propertyCategory,
// }) => {
//   const simpleValidator = useRef(new SimpleReactValidator());
//   const [isContactLoading, setContactLoading] = useState(false);
//   const [, forceUpdate] = useState(0);

//   const [request, setRequest] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     propertyName: "",
//     comment: "",
//     category: type || "sale", // Default to type prop or "sale"
//   });

//   // Sync propertyName prop to request state when modal opens or propertyName changes
//   useEffect(() => {
//     if (modal && propertyName) {
//       setRequest((prev) => ({
//         ...prev,
//         propertyName: propertyName,
//       }));
//     }
//   }, [modal, propertyName]);

//   const validator = useRef(
//     new SimpleReactValidator({
//       validators: {
//         phone: {
//           message: "Please enter a valid phone number",
//           rule: (val, params, validator) => {
//             try {
//               if (!val) return false;
//               const cleanedValue = val.replace(/[^\d+]/g, "");
//               return isValidPhoneNumber(cleanedValue);
//             } catch (error) {
//               return false;
//             }
//           },
//         },
//       },
//     })
//   );

//   const validatePhone = (phoneValue) => {
//     if (!phoneValue) {
//       setPhoneError("Phone number is required");
//       return false;
//     } else if (!isValidPhoneNumber(phoneValue)) {
//       setPhoneError("Please enter a valid phone number");
//       return false;
//     } else {
//       setPhoneError("");
//       return true;
//     }
//   };

//   const [phoneError, setPhoneError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRequest(prev => ({
//       ...prev,
//       [name]: value,
//       category: type || "sale", // Preserve category based on type prop
//     }));
    
//     // Debug log for form updates
//     console.debug("Form field updated:", {
//       field: name,
//       value,
//       category: type || "sale",
//     });
//   };

//   const handleSubmit = async () => {
//     const formValid = simpleValidator.current.allValid();
//     const isPhoneValid = validatePhone(request.phone);

//     if (!formValid || !isPhoneValid) {
//       simpleValidator.current.showMessages();
//       forceUpdate(1);
//       return;
//     } else {
//       try {
//         setContactLoading(true);

//         let data = {
//           data: {
//             name: request.name,
//             phone: "+91" + request.phone,
//             email: request.email,
//             propertyName: request.propertyName,
//             comment: request.comment,
//             ...(type === "rent"
//               ? { rent_property: id }
//               : { sale_property: id }),
//           },
//         };

//         // Call API
//         let resp =
//           type === "rent"
//             ? await postCreateRentPropertyEnquiry(data)
//             : await postCreateSalePropertyEnquiry(data);

//         // Helper to sanitize values for EmailJS
//         const sanitizeValue = (val) => {
//           if (val === undefined || val === null) return "";
//           return String(val);
//         };

//         // Prepare EmailJS parameters to match template variables exactly
//         const emailParams = {
//           name: sanitizeValue(request.name),
//           email: sanitizeValue(request.email),
//           phone: sanitizeValue(request.phone),
//           propertyName: sanitizeValue(request.propertyName),
//           propertyType: sanitizeValue(propertyCategory || type || "sale"),
//           category: sanitizeValue(type || "sale"),
//           comment: sanitizeValue(request.comment),
//           timestamp: new Date().toLocaleString('en-IN', { 
//             timeZone: 'Asia/Kolkata',
//             dateStyle: 'full',
//             timeStyle: 'short'
//           })
//         };

//         // Debug log before sending
//         console.debug("Sending EmailJS parameters:", emailParams);

//         // Send email via EmailJS
//         await emailjs.send(
//           "service_pihvgs9", // Replace with your Service ID
//           "template_shgt2qq", // Replace with your Template ID
//           emailParams,
//           "6AwAZH6Fn2vPLojuQ" // Replace with your Public Key
//         );

//         if (resp) {
//           toast.success(getValue(resp, "message", "Sent successfully"));
//         } else {
//           toast.success("Form submitted successfully!");
//         }

//         // Reset form while preserving category
//         setRequest({ 
//           name: "", 
//           phone: "", 
//           email: "", 
//           propertyName: "", 
//           comment: "", 
//           category: type || "sale" 
//         });
//         setPhoneError("");
//         simpleValidator.current.hideMessages();
//         forceUpdate(0);
//         toggle();
//         setContactLoading(false);
//       } catch (error) {
//         console.error("Error:", error);
//         setContactLoading(false);
//         toast.error("Something went wrong. Please try again!");
//       }
//     }
//   };

//   const [isChecked, setIsChecked] = useState(true);

//   const handleCheckboxChange = () => setIsChecked(!isChecked);

//   const handlePhoneChange = (value) => {
//     setRequest((prev) => ({ ...prev, phone: `+${value}` }));
//     validatePhone(`+${value}`);
//   };

//   const handleToggle = () => {
//     setRequest({ 
//       name: "", 
//       phone: "", 
//       email: "", 
//       propertyName: "", 
//       comment: "", 
//       category: type || "sale" 
//     });
//     setPhoneError("");
//     simpleValidator.current.hideMessages();
//     forceUpdate(0);
//     toggle();
//   };

//   return (
//     <Modal isOpen={modal} toggle={handleToggle}>
//       <ModalHeader toggle={handleToggle}>Contact us</ModalHeader>
//       <ModalBody>
//         <div
//           className="property-details-wrapper--body--contact-us"
//           style={{ maxWidth: "100%", boxShadow: "none" }}
//         >
//           <p className="contact-sub-text">
//             We are here to help you on any queries. Also, you can request
//             virtual tour today.
//           </p>
//           <div className="contact-form">
//             <div className="form-group contact-elements m-0">
//               <label className="contact-label" htmlFor="name">
//                 Name *
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 id="name"
//                 value={getValue(request, "name", "")}
//                 onChange={handleChange}
//                 name="name"
//                 className="form-control contact-form-control"
//               />
//               {simpleValidator.current.message(
//                 "name",
//                 getValue(request, "name", ""),
//                 "required"
//               ) && (
//                 <span className="form-error mb-0">
//                   {simpleValidator.current.message(
//                     "name",
//                     getValue(request, "name", ""),
//                     "required"
//                   )}
//                 </span>
//               )}
//             </div>
            
//             <div className="form-group contact-elements my-3">
//               <label className="contact-label" htmlFor="email">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 id="email"
//                 value={getValue(request, "email", "")}
//                 onChange={handleChange}
//                 name="email"
//                 className="form-control contact-form-control"
//               />
//               {simpleValidator.current.message(
//                 "email",
//                 getValue(request, "email", ""),
//                 "required|email"
//               ) && (
//                 <span className="form-error mb-0">
//                   {simpleValidator.current.message(
//                     "email",
//                     getValue(request, "email", ""),
//                     "required|email"
//                   )}
//                 </span>
//               )}
//             </div>

//             <div className="form-group contact-elements my-3">
//               <label className="contact-label" htmlFor="mobile">
//                 Mobile Number *
//               </label>
//               <PhoneInput
//                 country={"in"}
//                 value={request.phone.replace(/^\+/, "")}
//                 onChange={handlePhoneChange}
//                 inputClass="form-control form-control-height w-100 custom-phone-input"
//                 containerClass="phone-input-container"
//                 inputProps={{
//                   name: "phone",
//                   id: "phone",
//                   required: true,
//                 }}
//                 countryCodeEditable={false}
//                 enableSearch={true}
//                 disableCountryCode={false}
//                 preserveOrder={["onlyCountries", "preferredCountries"]}
//                 placeholder="Enter Mobile Number"
//               />
//               {phoneError && (
//                 <span className="form-error mb-0">{phoneError}</span>
//               )}
//             </div>
            
//             <div className="form-group contact-elements my-3">
//               <label className="contact-label" htmlFor="propertyName">
//                 Property Name *
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Property Name"
//                 id="propertyName"
//                 value={getValue(request, "propertyName", "")}
//                 name="propertyName"
//                 className="form-control contact-form-control"
//                 readOnly
//               />
//               {simpleValidator.current.message(
//                 "propertyName",
//                 getValue(request, "propertyName", ""),
//                 "required"
//               ) && (
//                 <span className="form-error mb-0">
//                   {simpleValidator.current.message(
//                     "propertyName",
//                     getValue(request, "propertyName", ""),
//                     "required"
//                   )}
//                 </span>
//               )}
//             </div>
            
//             <div className="form-group contact-elements m-0">
//               <label className="contact-label" htmlFor="comments">
//                 Comments
//               </label>
//               <textarea
//                 rows="5"
//                 placeholder="Enter Comments"
//                 className="form-control contact-form-control"
//                 id="comment"
//                 value={getValue(request, "comment", "")}
//                 onChange={handleChange}
//                 name="comment"
//               />
//               {simpleValidator.current.message(
//                 "comment",
//                 getValue(request, "comment", ""),
//                 "required"
//               ) && (
//                 <span className="form-error">
//                   {simpleValidator.current.message(
//                     "comment",
//                     getValue(request, "comment", ""),
//                     "required"
//                   )}
//                 </span>
//               )}
//             </div>
//           </div>
          
//           <div className="d-flex align-items-baseline mb-3">
//             <input
//               type="checkbox"
//               id="scales"
//               name="scales"
//               checked={isChecked}
//               onChange={handleCheckboxChange}
//             />
//             <label
//               htmlFor="scales"
//               style={{ fontSize: "12px", marginLeft: "10px" }}
//             >
//               I authorize company representatives to Call, SMS, Email or
//               WhatsApp me about its products and offers. This consent overrides
//               any registration for DNC/NDNC.
//             </label>
//           </div>
          
//           <button
//             className="theme-button theme-primary-btn w-100"
//             onClick={handleSubmit}
//             disabled={!isChecked || isContactLoading}
//           >
//             {isContactLoading ? "Submitting" : "Submit"}
//           </button>

//           <p className="contact-call-details text-center">
//             Or Call{" "}
//             <a href="tel:00919663982707" className="contact-call-details">
//               +91 966 398 2707
//             </a>{" "}
//             /{" "}
//             <a href="tel:+919513882269" className="contact-call-details">
//               +91 95138 82269
//             </a>{" "}
//             /
//             <a href="tel:+919069979997" className="contact-call-details">
//               +91 90699 79997
//             </a>
//           </p>
//           <div className="text-center">
//             <a
//               href="mailto:info@dreamsrealty.co.in"
//               style={{ color: "#3c67a4" }}
//               className="contact-call-details text-center w-100"
//             >
//               info@dreamsrealty.co.in
//             </a>
//           </div>
//         </div>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default HomeCTA;


import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import { getValue } from "../../../utils/lodash";
import {
  postCreateSalePropertyEnquiry,
  postCreateRentPropertyEnquiry,
} from "../../../services/APIs/common.service";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import emailjs from "@emailjs/browser";

const HomeCTA = ({
  modal,
  toggle,
  type,
  id,
  propertyName,
  propertyCategory,
}) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [isContactLoading, setContactLoading] = useState(false);
  const [, forceUpdate] = useState(0);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    email: "",
    propertyName: "",
    comment: "",
  });

  // Sync propertyName prop to request state when modal opens or propertyName changes
  useEffect(() => {
    if (modal && propertyName) {
      setRequest((prev) => ({
        ...prev,
        propertyName: propertyName,
      }));
    }
  }, [modal, propertyName]);

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

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formValid = simpleValidator.current.allValid();
    const isPhoneValid = validatePhone(request.phone);

    if (!formValid || !isPhoneValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      return;
    } else {
      try {
        setContactLoading(true);

        // ✅ FIXED: Corrected data structure for Strapi
        let data = {
          data: {
            name: request.name,
            phone: request.phone, // ✅ Phone already has country code from PhoneInput
            email: request.email,
            comment: request.comment,
            // ✅ Only send the relation field, not propertyName
            ...(type === "rent"
              ? { rent_property: id }
              : { sale_property: id }),
          },
        };

        // Debug log to verify data structure
        console.debug("Submitting to Strapi:", data);

        // Call API
        let resp =
          type === "rent"
            ? await postCreateRentPropertyEnquiry(data)
            : await postCreateSalePropertyEnquiry(data);

        // Helper to sanitize values for EmailJS
        const sanitizeValue = (val) => {
          if (val === undefined || val === null) return "";
          return String(val);
        };

        // Prepare EmailJS parameters to match template variables exactly
        const emailParams = {
          name: sanitizeValue(request.name),
          email: sanitizeValue(request.email),
          phone: sanitizeValue(request.phone),
          propertyName: sanitizeValue(request.propertyName), // ✅ Keep for email display
          propertyType: sanitizeValue(propertyCategory || type || "sale"),
          category: sanitizeValue(type || "sale"),
          comment: sanitizeValue(request.comment),
          timestamp: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short",
          }),
        };

        // Debug log before sending
        console.debug("Sending EmailJS parameters:", emailParams);

        // Send email via EmailJS
        await emailjs.send(
          "service_pihvgs9", // Replace with your Service ID
          "template_shgt2qq", // Replace with your Template ID
          emailParams,
          "6AwAZH6Fn2vPLojuQ" // Replace with your Public Key
        );

        if (resp) {
          toast.success(getValue(resp, "message", "Sent successfully"));
        } else {
          toast.success("Form submitted successfully!");
        }

        // Reset form
        setRequest({
          name: "",
          phone: "",
          email: "",
          propertyName: "",
          comment: "",
        });
        setPhoneError("");
        simpleValidator.current.hideMessages();
        forceUpdate(0);
        toggle();
        setContactLoading(false);
      } catch (error) {
        console.error("Error:", error);
        // ✅ Enhanced error logging
        if (error.response) {
          console.error("API Error Response:", error.response.data);
        }
        setContactLoading(false);
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const handlePhoneChange = (value) => {
    setRequest((prev) => ({ ...prev, phone: `+${value}` }));
    validatePhone(`+${value}`);
  };

  const handleToggle = () => {
    setRequest({
      name: "",
      phone: "",
      email: "",
      propertyName: "",
      comment: "",
    });
    setPhoneError("");
    simpleValidator.current.hideMessages();
    forceUpdate(0);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Contact us</ModalHeader>
      <ModalBody>
        <div
          className="property-details-wrapper--body--contact-us"
          style={{ maxWidth: "100%", boxShadow: "none" }}
        >
          <p className="contact-sub-text">
            We are here to help you on any queries. Also, you can request
            virtual tour today.
          </p>
          <div className="contact-form">
            <div className="form-group contact-elements m-0">
              <label className="contact-label" htmlFor="name">
                Name *
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                id="name"
                value={getValue(request, "name", "")}
                onChange={handleChange}
                name="name"
                className="form-control contact-form-control"
              />
              {simpleValidator.current.message(
                "name",
                getValue(request, "name", ""),
                "required"
              ) && (
                <span className="form-error mb-0">
                  {simpleValidator.current.message(
                    "name",
                    getValue(request, "name", ""),
                    "required"
                  )}
                </span>
              )}
            </div>

            <div className="form-group contact-elements my-3">
              <label className="contact-label" htmlFor="email">
                Email *
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                value={getValue(request, "email", "")}
                onChange={handleChange}
                name="email"
                className="form-control contact-form-control"
              />
              {simpleValidator.current.message(
                "email",
                getValue(request, "email", ""),
                "required|email"
              ) && (
                <span className="form-error mb-0">
                  {simpleValidator.current.message(
                    "email",
                    getValue(request, "email", ""),
                    "required|email"
                  )}
                </span>
              )}
            </div>

            <div className="form-group contact-elements my-3">
              <label className="contact-label" htmlFor="mobile">
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
                  id: "phone",
                  required: true,
                }}
                countryCodeEditable={false}
                enableSearch={true}
                disableCountryCode={false}
                preserveOrder={["onlyCountries", "preferredCountries"]}
                placeholder="Enter Mobile Number"
              />
              {phoneError && (
                <span className="form-error mb-0">{phoneError}</span>
              )}
            </div>

            <div className="form-group contact-elements my-3">
              <label className="contact-label" htmlFor="propertyName">
                Property Name *
              </label>
              <input
                type="text"
                placeholder="Enter Property Name"
                id="propertyName"
                value={getValue(request, "propertyName", "")}
                name="propertyName"
                className="form-control contact-form-control"
                readOnly
              />
              {simpleValidator.current.message(
                "propertyName",
                getValue(request, "propertyName", ""),
                "required"
              ) && (
                <span className="form-error mb-0">
                  {simpleValidator.current.message(
                    "propertyName",
                    getValue(request, "propertyName", ""),
                    "required"
                  )}
                </span>
              )}
            </div>

            <div className="form-group contact-elements m-0">
              <label className="contact-label" htmlFor="comments">
                Comments
              </label>
              <textarea
                rows="5"
                placeholder="Enter Comments"
                className="form-control contact-form-control"
                id="comment"
                value={getValue(request, "comment", "")}
                onChange={handleChange}
                name="comment"
              />
              {simpleValidator.current.message(
                "comment",
                getValue(request, "comment", ""),
                "required"
              ) && (
                <span className="form-error">
                  {simpleValidator.current.message(
                    "comment",
                    getValue(request, "comment", ""),
                    "required"
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="d-flex align-items-baseline mb-3">
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="scales"
              style={{ fontSize: "12px", marginLeft: "10px" }}
            >
              I authorize company representatives to Call, SMS, Email or
              WhatsApp me about its products and offers. This consent overrides
              any registration for DNC/NDNC.
            </label>
          </div>

          <button
            className="theme-button theme-primary-btn w-100"
            onClick={handleSubmit}
            disabled={!isChecked || isContactLoading}
          >
            {isContactLoading ? "Submitting" : "Submit"}
          </button>

          <p className="contact-call-details text-center">
            Or Call{" "}
            <a href="tel:00919663982707" className="contact-call-details">
              +91 966 398 2707
            </a>{" "}
            /{" "}
            <a href="tel:+919513882269" className="contact-call-details">
              +91 95138 82269
            </a>{" "}
            /
            <a href="tel:+919069979997" className="contact-call-details">
              +91 90699 79997
            </a>
          </p>
          <div className="text-center">
            <a
              href="mailto:info@dreamsrealty.co.in"
              style={{ color: "#3c67a4" }}
              className="contact-call-details text-center w-100"
            >
              info@dreamsrealty.co.in
            </a>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default HomeCTA;
