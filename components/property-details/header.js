// import { changeNumberFormat } from "@common/ChangeNumberFormat";
// import { getValue } from "/utils/lodash";
// import Popup from "@components/common-popup/index.js";
// import Popup1 from "@components/common-popup1/index.js";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { postCreatePropertyEnquiry } from "@services/APIs/common.service";
// import Image from "next/image";
// import { Share2, Compass, ScanEye } from "lucide-react";

// export default function PropertyDetailsHeader(props) {
//   const [isLoading1, setIsLoading1] = useState(false);
//   const [request1, setRequest1] = useState({
//     name: "",
//     phone: "",
//     type: "brochure_download",
//   });
//   const [isLoading2, setIsLoading2] = useState(false);
//   const [request2, setRequest2] = useState({
//     name: "",
//     phone: "",
//     type: "virtual_tour",
//   });

//   const [popupTitle, setPopuptitle] = useState("Download Brochure");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const toggle = () => {
//     setDropdownOpen(!dropdownOpen);
//   };
//   const [showDownloadPopup, toogleDownloadPopup] = useState(false);
//   const [showDownloadPopup1, toogleDownloadPopup1] = useState(false);

//   const [showSharePopup, toogleSharePopup] = useState(false);
//   const openMap = () => {
//     url =
//       "https://www.google.com.sa/maps/search/" + coordinates + ",12.21z?hl=en";
//   };
//   const handleChange1 = (e) => {
//     const { name, value } = e.target;
//     setRequest1({
//       ...request1,
//       [name]: value,
//     });
//   };
//   const handleChange2 = (e) => {
//     const { name, value } = e.target;
//     setRequest2({
//       ...request2,
//       [name]: value,
//     });
//   };
//   const handleSubmit1 = () => {
//     if (request1.name && request1.phone) {
//       try {
//         setIsLoading1(true);
//         let request = {
//           name: request1.name,
//           phone: "+91" + request1.phone,
//           type: "brochure_download",
//         };
//         let resp = postCreatePropertyEnquiry({ data: request });
//         if (resp) {
//           setIsLoading1(false);
//           toast.success("Submitted successfully");
//           setRequest1({
//             ...request1,
//             name: "",
//             phone: "",
//           });
//           toogleDownloadPopup(false);
//           var link = document.createElement("a");
//           link.target = "_blank";
//           link.download = "brochure";
//           link.href =
//             process.env.NEXT_PUBLIC_API_URL +
//             getValue(props, "propertyInfo.brochure.url");
//           link.click();
//         } else {
//           setIsLoading1(false);
//         }
//       } catch (error) {
//         setIsLoading1(false);
//       }
//     } else {
//       toast.error("Name and Mobile Number Required");
//     }
//   };
//   const handleSubmit2 = () => {
//     if (request2.name && request2.phone) {
//       try {
//         setIsLoading2(true);
//         let request = {
//           name: request2.name,
//           phone: "+91" + request2.phone,
//           type: "virtual_tour",
//         };
//         let resp = fetchPropertyCreateEnquire({ data: request });
//         if (resp) {
//           toast.success("Submitted successfully");
//           setIsLoading2(false);
//           setRequest2({
//             ...request2,
//             name: "",
//             phone: "",
//           });
//           toogleDownloadPopup1(false);
//         } else {
//           setIsLoading2(false);
//         }
//       } catch (error) {
//         setIsLoading2(false);
//       }
//     } else {
//       toast.error("Name and Mobile Number Required");
//     }
//   };
//   return (
//     <div className="property-details-wrapper__header">
//       <div className="  selected-property-header">
//         <Popup
//           showPopup={showDownloadPopup}
//           hidePopup={() => {
//             toogleDownloadPopup(false);
//           }}
//           popupTitle={popupTitle}
//           request={request1}
//           handleChange={handleChange1}
//           handleSubmit={handleSubmit1}
//           isLoading={isLoading1}
//         />
//         <Popup1
//           showPopup={showDownloadPopup1}
//           hidePopup={() => {
//             toogleDownloadPopup1(false);
//           }}
//           popupTitle={popupTitle}
//           request={request2}
//           handleChange={handleChange2}
//           handleSubmit={handleSubmit2}
//           isLoading={isLoading2}
//         />
//         {/* <SharePopup
//         showPopup={showSharePopup}
//         hideSharePopup={() => {
//           toogleSharePopup(false);
//         }}
//         slug={getValue(props,'slug')}
//       /> */}

//         <div className="property-details-wrapper__header-img">
//           <img
//             src={
//               getValue(props, "propertyInfo.logo.url")
//                 ? process.env.NEXT_PUBLIC_API_URL +
//                   getValue(props, "propertyInfo.logo.url")
//                 : "/images/default_logo.png"
//             }
//             className="img-fluid property-logo-dimentions"
//             alt={`${getValue(props, "propertyInfo.title", "").replace(
//               /\s+/g,
//               "-"
//             )}-logo`}
//           />
//         </div>
//         <div className="property-details-wrapper__details-container w-100">
//           <div className="property-details-wrapper__details-wrapper d-flex flex-direction-column-mobile align-items-center justify-content-between">
//             <div className="property-details-wrapper__details">
//               <h3>{getValue(props, "propertyInfo.title", "")}</h3>
//               <p>{getValue(props, "propertyInfo.address", "")}</p>
//             </div>
//           </div>
//           {/* {getValue(props, "propertyInfo.deposit_term", "") ? (
//             <button
//               className="float-right"
//               style={{
//                 marginLeft: "17px",
//                 backgroundColor: "white",
//                 // padding: "7px",
//                 border: "1px dotted #3C67A4",
//                 border: "none",
//                 color: "#3C67A4",
//                 borderRadius: "5px",
//               }}
//             >
//               {getValue(props, "propertyInfo.deposit_term", "")}
//             </button>
//           ) : (
//             ""
//           )} */}

//           {/* {getValue(props, `propertyInfo.unit_availabilities.length`, 0) > 0 ? (
//             <p style={{ marginLeft: "17px" }}>
//               {getValue(props, "propertyInfo.property_type.title", "") +
//                 " - " +
//                 getValue(
//                   props,
//                   `propertyInfo.unit_availabilities.length`,
//                   0
//                 )}{" "}
//               Units Available
//             </p>
//           ) : (
//             <p style={{ marginLeft: "17px" }}>
//               {getValue(props, "propertyInfo.property_type.title", "")}
//             </p>
//           )} */}

//           {getValue(props, "propertyInfo.property_text", "") && (
//             <button
//               className=""
//               style={{
//                 // marginLeft: "17px",
//                 backgroundColor: "white",
//                 padding: "7px",
//                 border: "1px dotted #3C67A4",
//                 color: "#3C67A4",
//                 borderRadius: "5px",
//               }}
//             >
//               {getValue(props, "propertyInfo.property_text", "")}
//             </button>
//           )}

//           <div className="property-details-wrapper__details-wrapper r justify-content-between  mt-2">
//             <div className="property-details-wrapper__details-button d-flex align-items-cente flex-direction-column-mobile flex-wrap gap-3">
//               <div className="header-btns d-flex flex-direction-column-mobile flex-wrap gap-3">
//                 {getValue(props, "propertyInfo.brochure.url") ? (
//                   <button
//                     className="theme-button theme-secondary-btn mt-0"
//                     onClick={() => {
//                       setPopuptitle("Download Brochure");
//                       toogleDownloadPopup(true);
//                     }}
//                   >
//                     <img
//                       src="/images/property-details/cta-icons/Download-Brochure.svg"
//                       className="img-fluid mr-2"
//                       alt="download-icon"
//                     />
//                     Download Brochure
//                   </button>
//                 ) : (
//                   ""
//                 )}
//                 <button
//                   className="theme-button theme-secondary-btn"
//                   onClick={() => props.toogleSharePopup(true)}
//                 >
//                   {/* <img
//                     src="/images/property-details/cta-icons/share.svg"
//                     className="img-fluid mr-2"
//                     alt="share-icon"
//                   /> */}
//                   <Share2 size={16} />
//                   Share
//                 </button>
//                 {getValue(props, "propertyInfo.latitude") &&
//                   getValue(props, "propertyInfo.longitude") && (
//                     <button className="mt-0 theme-button theme-secondary-btn">
//                       <a
//                         href={`https://maps.google.com/?q=${getValue(
//                           props,
//                           "propertyInfo.latitude"
//                         )},${getValue(props, "propertyInfo.longitude")}&z=8`}
//                         target="_blank"
//                         className="  "
//                       >
//                         {/* <img
//                           src="/images/property-details/cta-icons/Directions.svg"
//                           className="img-fluid mr-2"
//                           alt="direction-icon"
//                         /> */}
//                         <Compass size={16} />
//                         Directions
//                       </a>
//                     </button>
//                   )}
//                 <button
//                   onClick={() => {
//                     setPopuptitle("Request Virtual Tour");
//                     toogleDownloadPopup1(true);
//                   }}
//                   className="theme-button theme-secondary-btn mr-0 mt-0"
//                 >
//                   {/* <img
//                     src="/images/property-details/cta-icons/Virtual-Tour.svg"
//                     className="img-fluid mr-2"
//                     alt="virtual-tour-icon"
//                   />{" "} */}
//                   <ScanEye size={16} />
//                   Virtual Tour
//                 </button>
//                 <a href="tel:+91 966 398 2707">
//                   <button className="theme-button theme-primary-btn phone-button align-items-center mt-0">
//                     <img
//                       src="/images/footer-icons/phone.svg"
//                       className="img-fluid mr-1"
//                       alt="phone-icon"
//                     />
//                     +91 966 398 2707
//                   </button>
//                 </a>
//                 {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//                 <DropdownToggle>
//                   {/* <button className="theme-button theme-secondary-btn"> */}
//                 {/* <img
//                     src="/images/property-details/cta-icons/share.svg"
//                     className="img-fluid mr-2"
//                   />{" "}
//                   Share */}
//                 {/* </button> */}
//                 {/* </DropdownToggle>
//                 <DropdownMenu>
//                   <DropdownItem>
//                     <a
//                       href={`https://api.whatsapp.com/send?text=Hi, Please click below link to check%0A*${getValue(
//                         props,
//                         "propertyInfo.title",
//                         ""
//                       )}${" "}-${" "}Dreams reality*%0A${
//                         typeof window !== "undefined" && window.location.href
//                       }`}
//                       target="_blank"
//                     >
//                       Whatsapp
//                     </a>
//                   </DropdownItem>
//                   <DropdownItem>
//                     <a
//                       href={`https://facebook.com/sharer/sharer.php?u=${
//                         typeof window !== "undefined" && window.location.href
//                       }`}
//                       target="_blank"
//                     >
//                       Facebook
//                     </a>
//                   </DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>  */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="property-details-wrapper__contact-details d-flex justify-content-between gap-3 mt-4 pt-3 flex-column flex-md-row">
//         {getValue(props, "propertyInfo.price") && (
//           <div className="property-price-section flex-grow-1">
//             <div>
//               <Image
//                 src="/images/payment.svg"
//                 className="img-fluid plot-list-img"
//                 alt="bathroom-icon"
//                 width={24}
//                 height={24}
//                 unoptimized={true}
//               />
//             </div>
//             <div className="d-flex align-items-baseline flex-column">
//               <p>
//                 Sale Amount{" "}
//                 {getValue(props, "propertyInfo.price_negotiable") &&
//                   "(Negotiable)"}
//               </p>
//               <h4>
//                 {getValue(props, "propertyInfo.price", "") ? "INR" + " " : ""}
//                 {changeNumberFormat(getValue(props, "propertyInfo.price", ""))
//                   ? changeNumberFormat(
//                       getValue(props, "propertyInfo.price", "")
//                     )
//                   : ""}{" "}
//                 {props.type === "rent"
//                   ? ""
//                   : getValue(props, "propertyInfo.price_extra_text", "")
//                   ? getValue(props, "propertyInfo.price_extra_text", "")
//                   : " onwards"}
//               </h4>
//             </div>
//           </div>
//         )}
//         {getValue(props, "propertyInfo.property_bhks.length") > 0 && (
//           <div className="property-price-section flex-grow-1">
//             <div>
//               <Image
//                 src="/images/space_dashboard.svg"
//                 className="img-fluid plot-list-img"
//                 alt="bathroom-icon"
//                 width={24}
//                 height={24}
//                 unoptimized={true}
//               />
//             </div>
//             <div className="d-flex align-items-baseline flex-column">
//               <p>
//                 Property Type -
//                 {getValue(props, "propertyInfo.property_type.title", "")}
//               </p>
//               <h4>
//                 {getValue(props, "propertyInfo.property_bhks", []).map(
//                   (item, key, arr) =>
//                     key === arr.length - 1 ? item.title : item.title + ", "
//                 )}
//               </h4>
//             </div>
//           </div>
//         )}
//         {(getValue(props, "propertyInfo.super_build_up_area_min") ||
//           getValue(props, "propertyInfo.super_build_up_area_max")) && (
//           <div className="property-price-section flex-grow-1 ">
//             <div>
//               <Image
//                 src="/images/crop_square_black_24dp.svg"
//                 className="img-fluid plot-list-img"
//                 alt="bathroom-icon"
//                 width={24}
//                 height={24}
//                 unoptimized={true}
//               />
//             </div>
//             <div className="d-flex align-items-baseline flex-column">
//               <p>Built-up</p>
//               <h4>
//                 {getValue(props, "propertyInfo.super_build_up_area_min", 0)}-
//                 {getValue(props, "propertyInfo.super_build_up_area_max", 0)}{" "}
//                 Sqft
//               </h4>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { changeNumberFormat } from "@common/ChangeNumberFormat";
import { getValue } from "/utils/lodash";
import Popup from "@components/common-popup/index.js";
import Popup1 from "@components/common-popup1/index.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreatePropertyEnquiry } from "@services/APIs/common.service";
import Image from "next/image";
import { Share2, Compass, ScanEye } from "lucide-react";

export default function PropertyDetailsHeader(props) {
  const [isLoading1, setIsLoading1] = useState(false);
  const [request1, setRequest1] = useState({
    name: "",
    phone: "",
    type: "brochure_download",
  });
  const [isLoading2, setIsLoading2] = useState(false);
  const [request2, setRequest2] = useState({
    name: "",
    phone: "",
    type: "virtual_tour",
  });

  const [popupTitle, setPopuptitle] = useState("Download Brochure");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [showDownloadPopup, toogleDownloadPopup] = useState(false);
  const [showDownloadPopup1, toogleDownloadPopup1] = useState(false);

  const [showSharePopup, toogleSharePopup] = useState(false);
  const openMap = () => {
    url =
      "https://www.google.com.sa/maps/search/" + coordinates + ",12.21z?hl=en";
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setRequest1({
      ...request1,
      [name]: value,
    });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setRequest2({
      ...request2,
      [name]: value,
    });
  };
  const handleSubmit1 = () => {
    if (request1.name && request1.phone) {
      try {
        setIsLoading1(true);
        let request = {
          name: request1.name,
          phone: "+91" + request1.phone,
          type: "brochure_download",
          category: props.type || "sale",
        };
        let resp = postCreatePropertyEnquiry({ data: request });
        if (resp) {
          setIsLoading1(false);
          toast.success("Submitted successfully");
          setRequest1({
            ...request1,
            name: "",
            phone: "",
          });
          toogleDownloadPopup(false);
          var link = document.createElement("a");
          link.target = "_blank";
          link.download = "brochure";
          link.href =
            process.env.NEXT_PUBLIC_API_URL +
            getValue(props, "propertyInfo.brochure.url");
          link.click();
        } else {
          setIsLoading1(false);
        }
      } catch (error) {
        setIsLoading1(false);
      }
    } else {
      toast.error("Name and Mobile Number Required");
    }
  };
  const handleSubmit2 = () => {
    if (request2.name && request2.phone) {
      try {
        setIsLoading2(true);
        let request = {
          name: request2.name,
          phone: "+91" + request2.phone,
          type: "virtual_tour",
          category: props.type || "sale",
        };
        let resp = fetchPropertyCreateEnquire({ data: request });
        if (resp) {
          toast.success("Submitted successfully");
          setIsLoading2(false);
          setRequest2({
            ...request2,
            name: "",
            phone: "",
          });
          toogleDownloadPopup1(false);
        } else {
          setIsLoading2(false);
        }
      } catch (error) {
        setIsLoading2(false);
      }
    } else {
      toast.error("Name and Mobile Number Required");
    }
  };
  return (
    <div className="property-details-wrapper__header">
      <div className="  selected-property-header">
        <Popup
          showPopup={showDownloadPopup}
          hidePopup={() => {
            toogleDownloadPopup(false);
          }}
          popupTitle={popupTitle}
          request={request1}
          handleChange={handleChange1}
          handleSubmit={handleSubmit1}
          isLoading={isLoading1}
        />
        <Popup1
          showPopup={showDownloadPopup1}
          hidePopup={() => {
            toogleDownloadPopup1(false);
          }}
          popupTitle={popupTitle}
          request={request2}
          handleChange={handleChange2}
          handleSubmit={handleSubmit2}
          isLoading={isLoading2}
        />
        {/* <SharePopup
        showPopup={showSharePopup}
        hideSharePopup={() => {
          toogleSharePopup(false);
        }}
        slug={getValue(props,'slug')}
      /> */}

        <div className="property-details-wrapper__header-img">
          <img
            src={
              getValue(props, "propertyInfo.logo.url")
                ? process.env.NEXT_PUBLIC_API_URL +
                  getValue(props, "propertyInfo.logo.url")
                : "/images/default_logo.png"
            }
            className="img-fluid property-logo-dimentions"
            alt={`${getValue(props, "propertyInfo.title", "").replace(
              /\s+/g,
              "-"
            )}-logo`}
          />
        </div>
        <div className="property-details-wrapper__details-container w-100">
          <div className="property-details-wrapper__details-wrapper d-flex flex-direction-column-mobile align-items-center justify-content-between">
            <div className="property-details-wrapper__details">
              <h3>{getValue(props, "propertyInfo.title", "")}</h3>
              <p>{getValue(props, "propertyInfo.address", "")}</p>
            </div>
          </div>
          {/* {getValue(props, "propertyInfo.deposit_term", "") ? (
            <button
              className="float-right"
              style={{
                marginLeft: "17px",
                backgroundColor: "white",
                // padding: "7px",
                border: "1px dotted #3C67A4",
                border: "none",
                color: "#3C67A4",
                borderRadius: "5px",
              }}
            >
              {getValue(props, "propertyInfo.deposit_term", "")}
            </button>
          ) : (
            ""
          )} */}

          {/* {getValue(props, `propertyInfo.unit_availabilities.length`, 0) > 0 ? (
            <p style={{ marginLeft: "17px" }}>
              {getValue(props, "propertyInfo.property_type.title", "") +
                " - " +
                getValue(
                  props,
                  `propertyInfo.unit_availabilities.length`,
                  0
                )}{" "}
              Units Available
            </p>
          ) : (
            <p style={{ marginLeft: "17px" }}>
              {getValue(props, "propertyInfo.property_type.title", "")}
            </p>
          )} */}

          {getValue(props, "propertyInfo.property_text", "") && (
            <button
              className=""
              style={{
                // marginLeft: "17px",
                backgroundColor: "white",
                padding: "7px",
                border: "1px dotted #3C67A4",
                color: "#3C67A4",
                borderRadius: "5px",
              }}
            >
              {getValue(props, "propertyInfo.property_text", "")}
            </button>
          )}

          <div className="property-details-wrapper__details-wrapper r justify-content-between  mt-2">
            <div className="property-details-wrapper__details-button d-flex align-items-cente flex-direction-column-mobile flex-wrap gap-3">
              <div className="header-btns d-flex flex-direction-column-mobile flex-wrap gap-3">
                {getValue(props, "propertyInfo.brochure.url") ? (
                  <button
                    className="theme-button theme-secondary-btn mt-0"
                    onClick={() => {
                      setPopuptitle("Download Brochure");
                      toogleDownloadPopup(true);
                    }}
                  >
                    <img
                      src="/images/property-details/cta-icons/Download-Brochure.svg"
                      className="img-fluid mr-2"
                      alt="download-icon"
                    />
                    Download Brochure
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="theme-button theme-secondary-btn"
                  onClick={() => props.toogleSharePopup(true)}
                >
                  {/* <img
                    src="/images/property-details/cta-icons/share.svg"
                    className="img-fluid mr-2"
                    alt="share-icon"
                  /> */}
                  <Share2 size={16} />
                  Share
                </button>
                {getValue(props, "propertyInfo.latitude") &&
                  getValue(props, "propertyInfo.longitude") && (
                    <button className="mt-0 theme-button theme-secondary-btn">
                      <a
                        href={`https://maps.google.com/?q=${getValue(
                          props,
                          "propertyInfo.latitude"
                        )},${getValue(props, "propertyInfo.longitude")}&z=8`}
                        target="_blank"
                        className="  "
                      >
                        {/* <img
                          src="/images/property-details/cta-icons/Directions.svg"
                          className="img-fluid mr-2"
                          alt="direction-icon"
                        /> */}
                        <Compass size={16} />
                        Directions
                      </a>
                    </button>
                  )}
                <button
                  onClick={() => {
                    setPopuptitle("Request Virtual Tour");
                    toogleDownloadPopup1(true);
                  }}
                  className="theme-button theme-secondary-btn mr-0 mt-0"
                >
                  {/* <img
                    src="/images/property-details/cta-icons/Virtual-Tour.svg"
                    className="img-fluid mr-2"
                    alt="virtual-tour-icon"
                  />{" "} */}
                  <ScanEye size={16} />
                  Virtual Tour
                </button>
                <a href="tel:+91 966 398 2707">
                  <button className="theme-button theme-primary-btn phone-button align-items-center mt-0">
                    <img
                      src="/images/footer-icons/phone.svg"
                      className="img-fluid mr-1"
                      alt="phone-icon"
                    />
                    +91 966 398 2707
                  </button>
                </a>
                {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle>
                  {/* <button className="theme-button theme-secondary-btn"> */}
                {/* <img
                    src="/images/property-details/cta-icons/share.svg"
                    className="img-fluid mr-2"
                  />{" "}
                  Share */}
                {/* </button> */}
                {/* </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <a
                      href={`https://api.whatsapp.com/send?text=Hi, Please click below link to check%0A*${getValue(
                        props,
                        "propertyInfo.title",
                        ""
                      )}${" "}-${" "}Dreams reality*%0A${
                        typeof window !== "undefined" && window.location.href
                      }`}
                      target="_blank"
                    >
                      Whatsapp
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <a
                      href={`https://facebook.com/sharer/sharer.php?u=${
                        typeof window !== "undefined" && window.location.href
                      }`}
                      target="_blank"
                    >
                      Facebook
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="property-details-wrapper__contact-details d-flex justify-content-between gap-3 mt-4 pt-3 flex-column flex-md-row">
        {getValue(props, "propertyInfo.price") && (
          <div className="property-price-section flex-grow-1">
            <div>
              <Image
                src="/images/payment.svg"
                className="img-fluid plot-list-img"
                alt="bathroom-icon"
                width={24}
                height={24}
                unoptimized={true}
              />
            </div>
            <div className="d-flex align-items-baseline flex-column">
              <p>
                Sale Amount{" "}
                {getValue(props, "propertyInfo.price_negotiable") &&
                  "(Negotiable)"}
              </p>
              <h4>
                {getValue(props, "propertyInfo.price", "") ? "INR" + " " : ""}
                {changeNumberFormat(getValue(props, "propertyInfo.price", ""))
                  ? changeNumberFormat(
                      getValue(props, "propertyInfo.price", "")
                    )
                  : ""}{" "}
                {props.type === "rent"
                  ? ""
                  : getValue(props, "propertyInfo.price_extra_text", "")
                  ? getValue(props, "propertyInfo.price_extra_text", "")
                  : " onwards"}
              </h4>
            </div>
          </div>
        )}
        {getValue(props, "propertyInfo.property_bhks.length") > 0 && (
          <div className="property-price-section flex-grow-1">
            <div>
              <Image
                src="/images/space_dashboard.svg"
                className="img-fluid plot-list-img"
                alt="bathroom-icon"
                width={24}
                height={24}
                unoptimized={true}
              />
            </div>
            <div className="d-flex align-items-baseline flex-column">
              <p>
                Property Type -
                {getValue(props, "propertyInfo.property_type.title", "")}
              </p>
              <h4>
                {getValue(props, "propertyInfo.property_bhks", []).map(
                  (item, key, arr) =>
                    key === arr.length - 1 ? item.title : item.title + ", "
                )}
              </h4>
            </div>
          </div>
        )}
        {(getValue(props, "propertyInfo.super_build_up_area_min") ||
          getValue(props, "propertyInfo.super_build_up_area_max")) && (
          <div className="property-price-section flex-grow-1 ">
            <div>
              <Image
                src="/images/crop_square_black_24dp.svg"
                className="img-fluid plot-list-img"
                alt="bathroom-icon"
                width={24}
                height={24}
                unoptimized={true}
              />
            </div>
            <div className="d-flex align-items-baseline flex-column">
              <p>Built-up</p>
              <h4>
                {getValue(props, "propertyInfo.super_build_up_area_min", 0)}-
                {getValue(props, "propertyInfo.super_build_up_area_max", 0)}{" "}
                Sqft
              </h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
