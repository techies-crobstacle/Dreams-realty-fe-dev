
// import { getValue } from "/utils/lodash";
// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";

// export default function Contact(props) {
//   const [isChecked, setIsChecked] = useState(true);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handlePhoneChange = (value) => {
//     props.setRequest((prev) => ({ ...prev, phone: `+${value}` }));

//     // Validate phone number
//     props.validatePhone(`+${value}`);
//   };

//   return (
//     <div className="property-details-wrapper--body--contact-us">
//       <h3 className="property-details-title p-0 m-0">Contact us</h3>
//       <p className="contact-sub-text">
//         We are here to help you on any queries. Also, you can request virtual
//         tour today.
//       </p>
//       <div className="contact-form">
//         <div className="form-group contact-elements">
//           <label className="contact-label" htmlFor="name">
//             Name *
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Name"
//             id="name"
//             value={getValue(props, "request.name", "")}
//             onChange={props.handleChange}
//             name="name"
//             className="form-control contact-form-control"
//           />
//           {props.simpleValidator.current.message(
//             "name",
//             getValue(props, "request.name", ""),
//             "required"
//           ) && (
//             <span className="form-error mb-0">
//               {props.simpleValidator.current.message(
//                 "name",
//                 getValue(props, "request.name", ""),
//                 "required"
//               )}
//             </span>
//           )}
//         </div>

//         <div className="form-group contact-elements">
//           <label className="contact-label" htmlFor="email">
//             Email *
//           </label>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             id="email"
//             value={getValue(props, "request.email", "")}
//             onChange={props.handleChange}
//             name="email"
//             className="form-control contact-form-control"
//           />
//           {props.simpleValidator.current.message(
//             "email",
//             getValue(props, "request.email", ""),
//             "required|email"
//           ) && (
//             <span className="form-error mb-0">
//               {props.simpleValidator.current.message(
//                 "email",
//                 getValue(props, "request.email", ""),
//                 "required|email"
//               )}
//             </span>
//           )}
//         </div>

//         <div className="form-group contact-elements">
//           <label className="contact-label" htmlFor="mobile">
//             Mobile Number *
//           </label>
//           <PhoneInput
//             country={"in"}
//             value={props.request.phone.replace(/^\+/, "")}
//             onChange={handlePhoneChange}
//             inputClass="form-control form-control-height w-100 custom-phone-input"
//             containerClass="phone-input-container"
//             inputProps={{
//               name: "phone",
//               id: "phone",
//               required: true,
//             }}
//             countryCodeEditable={false}
//             enableSearch={true}
//             disableCountryCode={false}
//             preserveOrder={["onlyCountries", "preferredCountries"]}
//             placeholder="Enter Mobile Number"
//           />
//           {props.phoneError && (
//             <span className="form-error mb-0">{props.phoneError}</span>
//           )}
//         </div>

//         {/* Property Name Field - Non-editable */}
//         <div className="form-group contact-elements">
//           <label className="contact-label" htmlFor="propertyName">
//             Property Name *
//           </label>
//           <input
//             type="text"
//             id="propertyName"
//             value={props.propertyName || ""}
//             readOnly
//             disabled
//             className="form-control contact-form-control"
//             style={{
//               backgroundColor: "#f5f5f5",
//               cursor: "not-allowed",
//               color: "#666"
//             }}
//           />
//         </div>
        
//         <div className="form-group contact-elements mb-0">
//           <label className="contact-label" htmlFor="comments">
//             Comments
//           </label>
//           <textarea
//             rows="5"
//             placeholder="Enter Comments"
//             className="form-control contact-form-control"
//             id="comment"
//             value={getValue(props, "request.comment", "")}
//             onChange={props.handleChange}
//             name="comment"
//           />
//           {props.simpleValidator.current.message(
//             "comment",
//             getValue(props, "request.comment", ""),
//             "required"
//           ) && (
//             <span className="form-error mb-0">
//               {props.simpleValidator.current.message(
//                 "comment",
//                 getValue(props, "request.comment", ""),
//                 "required"
//               )}
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="d-flex align-items-baseline mb-3">
//         <input
//           type="checkbox"
//           id="scales"
//           name="scales"
//           checked={isChecked}
//           onChange={handleCheckboxChange}
//         />
//         <label
//           htmlFor="scales"
//           style={{ fontSize: "12px", marginLeft: "10px" }}
//         >
//           I authorize company representatives to Call, SMS, Email or WhatsApp me
//           about its products and offers. This consent overrides any registration
//           for DNC/NDNC.
//         </label>
//       </div>
//       <button
//         className="theme-button theme-primary-btn w-100"
//         onClick={props.handleSubmit}
//         disabled={!isChecked}
//       >
//         {props.isContactLoading ? "Please wait...." : "Submit"}
//       </button>

//       <p className="contact-call-details text-center">
//         Or Call{" "}
//         <a href="tel:00919663982707" className="contact-call-details">
//           +91 966 398 2707
//         </a>{" "}
//         /{" "}
//         <a href="tel:+919513882269" className="contact-call-details">
//           +91 95138 82269
//         </a>{" "}
//         /
//         <a href="tel:+919069979997" className="contact-call-details">
//           +91 90699 79997
//         </a>
//       </p>
//       <div className="text-center">
//         <a
//           href="mailto:info@dreamsrealty.co.in"
//           style={{ color: "#3c67a4" }}
//           className="contact-call-details text-center w-100"
//         >
//           info@dreamsrealty.co.in
//         </a>
//       </div>
//     </div>
//   );
// }
import { getValue } from "/utils/lodash";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function Contact(props) {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePhoneChange = (value) => {
    props.setRequest((prev) => ({ ...prev, phone: `+${value}` }));
    props.validatePhone(`+${value}`);
  };

  // Ensure category is always set in the request
  React.useEffect(() => {
    props.setRequest(prev => ({
      ...prev,
      category: props.propertyType || 'sale'
    }));
  }, [props.propertyType]);

  return (
    <div className="property-details-wrapper--body--contact-us">
      <h3 className="property-details-title p-0 m-0">Contact us</h3>
      <p className="contact-sub-text">
        We are here to help you on any queries. Also, you can request virtual
        tour today.
      </p>
      <div className="contact-form">
        <div className="form-group contact-elements">
          <label className="contact-label" htmlFor="name">
            Name *
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            value={getValue(props, "request.name", "")}
            onChange={props.handleChange}
            name="name"
            className="form-control contact-form-control"
          />
          {props.simpleValidator.current.message(
            "name",
            getValue(props, "request.name", ""),
            "required"
          ) && (
            <span className="form-error mb-0">
              {props.simpleValidator.current.message(
                "name",
                getValue(props, "request.name", ""),
                "required"
              )}
            </span>
          )}
        </div>

        <div className="form-group contact-elements">
          <label className="contact-label" htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            value={getValue(props, "request.email", "")}
            onChange={props.handleChange}
            name="email"
            className="form-control contact-form-control"
          />
          {props.simpleValidator.current.message(
            "email",
            getValue(props, "request.email", ""),
            "required|email"
          ) && (
            <span className="form-error mb-0">
              {props.simpleValidator.current.message(
                "email",
                getValue(props, "request.email", ""),
                "required|email"
              )}
            </span>
          )}
        </div>

        <div className="form-group contact-elements">
          <label className="contact-label" htmlFor="mobile">
            Mobile Number *
          </label>
          <PhoneInput
            country={"in"}
            value={props.request.phone.replace(/^\+/, "")}
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
          {props.phoneError && (
            <span className="form-error mb-0">{props.phoneError}</span>
          )}
        </div>

        {/* Property Name Field - Non-editable */}
        <div className="form-group contact-elements">
          <label className="contact-label" htmlFor="propertyName">
            Property Name *
          </label>
          <input
            type="text"
            id="propertyName"
            value={props.propertyName || ""}
            readOnly
            disabled
            className="form-control contact-form-control"
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "not-allowed",
              color: "#666"
            }}
          />
        </div>

        {/* Category Field - Hidden (stores sale/rent) */}
        <input
          type="hidden"
          name="category"
          value={props.propertyType || "sale"}
        />

        {/* Optional: Show listing type as a badge/tag */}
        {/* {props.propertyType && (
          <div className="form-group contact-elements">
            <label className="contact-label">Property Listing Type</label>
            <div className="d-flex">
              <span
                className="badge"
                style={{
                  backgroundColor: props.propertyType === "rent" ? "#28a745" : "#007bff",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              >
                For {props.propertyType === "rent" ? "Rent" : "Sale"}
              </span>
            </div>
          </div>
        )}
         */}
         
        <div className="form-group contact-elements mb-0">
          <label className="contact-label" htmlFor="comments">
            Comments
          </label>
          <textarea
            rows="5"
            placeholder="Enter Comments"
            className="form-control contact-form-control"
            id="comment"
            value={getValue(props, "request.comment", "")}
            onChange={props.handleChange}
            name="comment"
          />
          {props.simpleValidator.current.message(
            "comment",
            getValue(props, "request.comment", ""),
            "required"
          ) && (
            <span className="form-error mb-0">
              {props.simpleValidator.current.message(
                "comment",
                getValue(props, "request.comment", ""),
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
          I authorize company representatives to Call, SMS, Email or WhatsApp me
          about its products and offers. This consent overrides any registration
          for DNC/NDNC.
        </label>
      </div>
      <button
        className="theme-button theme-primary-btn w-100"
        onClick={props.handleSubmit}
        disabled={!isChecked}
      >
        {props.isContactLoading ? "Please wait...." : "Submit"}
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
  );
}