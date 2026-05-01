// import React, { useState } from "react";
// import { getValue } from "/utils/lodash";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";

// export default function UniqueProperties(props) {
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
//     <div className="custom-container py-5">
//       <section className="property-wrapper">
//         <div className="property-form">
//           <h3>Let our experts do the searching</h3>
//           <h2>
//             Get personalised access to unique properties to match your needs
//           </h2>
//           <div className="form-group d-flex align-items-lg-start gap-md-3 mb-0 flex-direction-column-mobile">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 id="person-name"
//                 className="form-control"
//                 value={getValue(props, "request.name", "")}
//                 onChange={props.handleChange}
//                 name={"name"}
//               />
//               {props.simpleValidator.current.message(
//                 "name",
//                 getValue(props, "request.name", ""),
//                 "required"
//               ) && (
//                 <span className="form-error mb-0">
//                   {props.simpleValidator.current.message(
//                     "name",
//                     getValue(props, "request.name", ""),
//                     "required"
//                   )}
//                 </span>
//               )}
//             </div>
//             <div>
//               <PhoneInput
//                 country={"in"}
//                 value={props.request.phone.replace(/^\+/, "")}
//                 onChange={handlePhoneChange}
//                 inputClass="form-control form-control-height w-100 custom-home-phone-input"
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
//               {props.phoneError && (
//                 <span className="form-error mb-0">{props.phoneError}</span>
//               )}
//             </div>
//             <button
//               className="theme-button theme-secondary-btn"
//               onClick={props.handleSubmit}
//               disabled={!isChecked}
//               style={{ height: "60px" }}
//             >
//               {!props.isContactLoading ? "submit" : "Please wait..."}
//             </button>
//           </div>
//           <div className="d-flex align-items-baseline mt-3">
//             <input
//               type="checkbox"
//               id="scales"
//               name="scales"
//               checked={isChecked}
//               onChange={handleCheckboxChange}
//               style={{ paddingTop: "3px" }}
//             />
//             <label
//               for="scales"
//               style={{ fontSize: "12px", marginLeft: "10px", color: "#fff" }}
//             >
//               I authorize company representatives to Call, SMS, Email or
//               WhatsApp me about its products and offers. <br />
//               This consent overrides any registration for DNC/NDNC.
//             </label>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useState } from "react";
import { getValue } from "/utils/lodash";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import emailjs from '@emailjs/browser';

export default function UniqueProperties(props) {
  const [isChecked, setIsChecked] = useState(true);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = "service_7vl4utf"; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = "template_dtnnnxb"; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = "nwsTsagRCTaAqJqpL"; // Replace with your EmailJS public key

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePhoneChange = (value, country) => {
    const fullPhone = `+${value}`;
    props.setRequest((prev) => ({ ...prev, phone: fullPhone }));
    props.validatePhone(fullPhone);
  };

  const sendEmail = async () => {
    const templateParams = {
      from_name: getValue(props, "request.name", ""),
      phone: props.request.phone,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
    };

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email sent successfully!', response.status, response.text);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const handleSubmitWithEmail = async (e) => {
    // Send email first
    const emailSent = await sendEmail();
    
    if (emailSent) {
      // Call the original submit handler
      props.handleSubmit(e);
    } else {
      alert('Failed to send email notification. Please try again.');
      // Optionally still submit the form
      // props.handleSubmit(e);
    }
  };

  return (
    <div className="custom-container ">
      <section className="property-wrapper">
        <div className="property-form">
          <h3>Let our experts do the searching</h3>
          <h2>
            Get personalised access to unique properties to match your needs
          </h2>
          <div className="form-group d-flex align-items-lg-start gap-md-3 mb-0 flex-direction-column-mobile">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                id="person-name"
                className="form-control"
                value={getValue(props, "request.name", "")}
                onChange={props.handleChange}
                name={"name"}
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
            <div>
              <PhoneInput
                country={"in"}
                value={props.request?.phone ? props.request.phone.replace(/^\+/, "") : "91"}
                onChange={handlePhoneChange}
                inputClass="form-control form-control-height w-100 custom-home-phone-input"
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
            <button
              className="theme-button theme-secondary-btn"
              onClick={handleSubmitWithEmail}
              disabled={!isChecked}
              style={{ height: "60px" }}
            >
              {!props.isContactLoading ? "submit" : "Please wait..."}
            </button>
          </div>
          <div className="d-flex align-items-baseline mt-3">
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{ paddingTop: "3px" }}
            />
            <label
              htmlFor="scales"
              style={{ fontSize: "12px", marginLeft: "10px", color: "#fff" }}
            >
              I authorize company representatives to Call, SMS, Email or
              WhatsApp me about its products and offers. <br />
              This consent overrides any registration for DNC/NDNC.
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}