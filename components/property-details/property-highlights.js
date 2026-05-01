// import { textFormat } from "@common/formatText";
// import { getValue } from "/utils/lodash";
// import { Tooltip } from "react-tooltip";
// import { toast } from "react-toastify";

// export default function PropertyDetailsHighlights(props) {
//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + "...";
//     }
//     return text;
//   };
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     toast("Copied to clipboard!");
//   };

//   const text = getValue(props, "propertyInfo.property_rera") || "-";
//   const isLong = text.length > 40;
//   const isMobileLong = text.length > 20;

//   return (
//     <div className="property-details-wrapper--body--information--property-highlight mt-0 property-details-section-separation">
//       <h3 className="property-details-title">Property Highlights</h3>
//       <div className="plot-details">
//         <ul>
//           {getValue(props, "type", "") === "sale" ? (
//             <>
//               {getValue(props, "propertyInfo.property_rera") ? (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/maps_home_work.svg"
//                       className="img-fluid plot-list-img"
//                       alt="sqaure-icon"
//                     />
//                     <h6>RERA</h6>
//                   </div>
//                   <p
//                     className="property-rera-text-desktop"
//                     onClick={() => copyToClipboard(text)}
//                   >
//                     {isLong ? (
//                       <>
//                         <span
//                           data-tooltip-id="property-tooltip"
//                           data-tooltip-content={text}
//                         >
//                           {truncateText(text, 40)}
//                         </span>
//                         <Tooltip id="property-tooltip" place="top" />
//                       </>
//                     ) : (
//                       text
//                     )}
//                   </p>
//                   <p
//                     className="property-rera-text-mobile"
//                     onClick={() => copyToClipboard(text)}
//                   >
//                     {isMobileLong ? (
//                       <>
//                         <span
//                           data-tooltip-id="property-tooltip"
//                           data-tooltip-content={text}
//                         >
//                           {truncateText(text, 20)}
//                         </span>
//                         <Tooltip id="property-tooltip" place="top" />
//                       </>
//                     ) : (
//                       text
//                     )}
//                   </p>
//                 </li>
//               ) : (
//                 ""
//               )}
//               {getValue(props, "propertyInfo.approved_by") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/verified.svg"
//                       className="img-fluid plot-list-img"
//                       alt="sqaure-icon"
//                     />
//                     <h6>Approved by</h6>
//                   </div>
//                   <p>{getValue(props, "propertyInfo.approved_by", "")}</p>
//                 </li>
//               )}

//               {getValue(props, "propertyInfo.plot_length", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_length", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/highlight_alt.svg"
//                         className="img-fluid plot-list-img"
//                         alt="sqaure-icon"
//                       />
//                       <h6>Plot length</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.plot_length", "")}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.plot_breath", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_breath", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/highlight_alt.svg"
//                         className="img-fluid plot-list-img"
//                         alt="sqaure-icon"
//                       />
//                       <h6>Plot breadth</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.plot_breath", "")}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.development_size", 0) !== 0 &&
//                 getValue(props, "propertyInfo.development_size", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/fullscreen_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Development Size (Acres)</h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.development_size", "")}
//                     </p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.monthly_maintenance", 0) !== 0 &&
//                 getValue(props, "propertyInfo.monthly_maintenance", 0) !==
//                   "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/people_24.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Monthly maintenance</h6>
//                     </div>
//                     <p>
//                       INR{" "}
//                       {getValue(props, "propertyInfo.monthly_maintenance", "")}
//                     </p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.brokerage_charges", 0) !== 0 &&
//                 getValue(props, "propertyInfo.brokerage_charges", 0) !==
//                   "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/payments.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Brokerage Charges</h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.brokerage_charges") &&
//                         `INR ${getValue(
//                           props,
//                           "propertyInfo.brokerage_charges"
//                         )}`}
//                     </p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.brokerage_details", false) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/payments.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Brokerage</h6>
//                   </div>
//                   <p>Standard Brokerage Charges Applicable*</p>
//                 </li>
//               )}

//               {getValue(props, "propertyInfo.bathrooms", 0) !== 0 &&
//                 getValue(props, "propertyInfo.bathrooms", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/bathroom_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="bathroom-icon"
//                       />
//                       <h6>Bathrooms</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.bathrooms", 0)}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.balcony", 0) !== 0 &&
//                 getValue(props, "propertyInfo.balcony", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/balcony_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="balcony-icon"
//                       />
//                       <h6>Balcony</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.balcony", 0)}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.facing") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/explore_black_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="chair-icon"
//                     />
//                     <h6>Facing</h6>
//                   </div>
//                   <p>{textFormat(getValue(props, "propertyInfo.facing", 0))}</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.furnishing") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/chair_black_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="compass-icon"
//                     />
//                     <h6>Furnishing</h6>
//                   </div>
//                   <p>
//                     {textFormat(getValue(props, "propertyInfo.furnishing", 0))}
//                   </p>
//                 </li>
//               )}

//               {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 ||
//                 (getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
//                   getValue(props, "propertyInfo.plot_area", 0) !== 0 && (
//                     <li className="d-flex align-items-center ">
//                       <div className="plot-list d-flex align-items-center">
//                         <img
//                           src="/images/crop_square_black_24dp.svg"
//                           className="img-fluid plot-list-img"
//                           alt="sqaure-icon"
//                         />
//                         <h6>Plot Area</h6>
//                       </div>
//                       <p>{getValue(props, "propertyInfo.plot_area", 0)} sqft</p>
//                     </li>
//                   ))}
//               {getValue(props, "propertyInfo.carpet_area", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>Carpet Area</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.carpet_area", 0)} sqft</p>
//                   </li>
//                 )}

//               {/* {(getValue(props, "propertyInfo.super_build_up_area_min") ||
//                 getValue(props, "propertyInfo.super_build_up_area_max") ||
//                 getValue(props, "propertyInfo.super_build_up_area")) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/crop_square_black_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="square-icon"
//                     />
//                     <h6>
//                       {getValue(
//                         props,
//                         "propertyInfo.property_type.title",
//                         ""
//                       ) !== "Villas"
//                         ? "Super"
//                         : ""}{" "}
//                       Built up area
//                     </h6>
//                   </div>
//                   <p>
//                     {getValue(props, "propertyInfo.super_build_up_area", 0)}{" "}
//                     sqft
//                   </p>
//                 </li>
//               )} */}

//               {/* {(getValue(props, "propertyInfo.super_build_up_area_min") ||
//                 getValue(props, "propertyInfo.super_build_up_area_max")) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/property-details/grid.svg"
//                       className="img-fluid plot-list-img"
//                       alt="grid-icon"
//                     />
//                     <h6>
//                       {getValue(
//                         props,
//                         "propertyInfo.property_type.title",
//                         ""
//                       ) !== "Villas" && "Super"}
//                       Built up area
//                     </h6>
//                   </div>
//                   <p>
//                     {`${
//                       getValue(
//                         props,
//                         "propertyInfo.super_build_up_area_min",
//                         0
//                       ) || 0
//                     } - ${
//                       getValue(
//                         props,
//                         "propertyInfo.super_build_up_area_max",
//                         0
//                       ) || 0
//                     } Sqft`}
//                   </p>
//                 </li>
//               )} */}
//               {getValue(props, "propertyInfo.carpet_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.carpet_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area_max", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/property-details/grid.svg"
//                         className="img-fluid plot-list-img"
//                         alt="grid-icon"
//                       />
//                       <h6>Carpet area</h6>
//                     </div>
//                     <p>
//                       {`${getValue(
//                         props,
//                         "propertyInfo.carpet_area_min",
//                         0
//                       )} - ${getValue(
//                         props,
//                         "propertyInfo.carpet_area_max",
//                         0
//                       )} Sqft`}
//                     </p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_area_max", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>Plot Area</h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.plot_area_min", 0) +
//                         " - " +
//                         getValue(props, "propertyInfo.plot_area_max", 0)}{" "}
//                       sqft
//                     </p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.total_units", 0) !== 0 &&
//                 getValue(props, "propertyInfo.total_units", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/space_dashboard.svg"
//                         className="img-fluid plot-list-img"
//                         alt="lines-with-weight-icon"
//                       />
//                       <h6>Total Units</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.total_units", 0)}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.reserved_parking") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/drive.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Parking facility </h6>
//                   </div>
//                   <p>
//                     Available (
//                     {getValue(props, "propertyInfo.reserved_parking")})
//                   </p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.total_floor", 0) !== 0 &&
//                 getValue(props, "propertyInfo.total_floor", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/maps_home_work.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Total floors </h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.total_floor")}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.property_floor", 0) !== 0 &&
//                 getValue(props, "propertyInfo.property_floor", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/maps_home_work.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Property floor # </h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.property_floor")}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.floor_type") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/auto_awesome.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Floor type </h6>
//                   </div>
//                   <p>{getValue(props, "propertyInfo.floor_type")}</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.water_supply") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/water_drop.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Water supply </h6>
//                   </div>
//                   <p>{getValue(props, "propertyInfo.water_supply")}</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.servant_accommodation") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/house_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Servant Accommodation </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.pooja_room") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/water_damage_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Pooja Room </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.study_room") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/menu_book_24.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Study Room </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.store_room") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/meeting_room_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Store Room </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(
//                 props,
//                 "propertyInfo.separate_entery_for_servent_room"
//               ) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/login_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Servant Entry </h6>
//                   </div>
//                   <p>Available (Seperate entry)</p>
//                 </li>
//               )}
//             </>
//           ) : (
//             <>
//               {getValue(props, "propertyInfo.security_amount", 0) !== 0 &&
//                 getValue(props, "propertyInfo.security_amount", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/verified.svg"
//                         className="img-fluid plot-list-img"
//                         alt="sqaure-icon"
//                       />
//                       <h6>Security amount</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.security_amount", "")}</p>
//                   </li>
//                 )}
//               {(getValue(props, "propertyInfo.brokerage_details") ||
//                 getValue(props, "propertyInfo.brokerage_charges")) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/payments.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Brokerage</h6>
//                   </div>
//                   <p>
//                     {getValue(props, "propertyInfo.brokerage_charges")
//                       ? `INR ${getValue(
//                           props,
//                           "propertyInfo.brokerage_charges"
//                         )}`
//                       : "Applicable"}
//                   </p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.monthly_maintenance") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/payments.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Monthly maintenance</h6>
//                   </div>
//                   <p>
//                     {getValue(props, "propertyInfo.monthly_maintenance")
//                       ? `INR ${getValue(
//                           props,
//                           "propertyInfo.monthly_maintenance"
//                         )}`
//                       : "Applicable"}
//                   </p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.carpet_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.carpet_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area_max", 0) !== "0" && (
//                   <li className="d-flex align-items-center">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>Carpet area</h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.carpet_area_min", 0) +
//                         " - " +
//                         getValue(props, "propertyInfo.carpet_area_max", 0)}{" "}
//                       Sqft
//                     </p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_area_max", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>Plot Area</h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.plot_area_min", 0) +
//                         " - " +
//                         getValue(props, "propertyInfo.plot_area_max", 0)}{" "}
//                       sqft
//                     </p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.build_up_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.build_up_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.build_up_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.build_up_area_max", 0) !==
//                   "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/property-details/grid.svg"
//                         className="img-fluid plot-list-img"
//                         alt="grid-icon"
//                       />
//                       <h6>
//                         {getValue(
//                           props,
//                           "propertyInfo.property_type.title",
//                           ""
//                         ) !== "Villas"
//                           ? "Super"
//                           : ""}{" "}
//                         Built up area
//                       </h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.build_up_area_min", 0) +
//                         " - " +
//                         getValue(
//                           props,
//                           "propertyInfo.build_up_area_max",
//                           0
//                         )}{" "}
//                       Sqft
//                     </p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.build_up_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.build_up_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.build_up_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.build_up_area_max", 0) !==
//                   "0" && (
//                   <li className="d-flex align-items-center">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>
//                         {getValue(
//                           props,
//                           "propertyInfo.property_type.title",
//                           ""
//                         ) !== "Villas"
//                           ? "Super"
//                           : ""}{" "}
//                         Built up area
//                       </h6>
//                     </div>
//                     <p>
//                       {getValue(props, "propertyInfo.build_up_area", 0)} sqft
//                     </p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.plot_area_max", 0) !== "0" && (
//                   <li className="d-flex align-items-center">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>Plot Area</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.plot_area", 0)} sqft</p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.carpet_area_min", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area_min", 0) !== "0" &&
//                 getValue(props, "propertyInfo.carpet_area_max", 0) !== 0 &&
//                 getValue(props, "propertyInfo.carpet_area_max", 0) !== "0" && (
//                   <li className="d-flex align-items-center">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/crop_square_black_24dp.svg"
//                         className="img-fluid plot-list-img"
//                         alt="square-icon"
//                       />
//                       <h6>Carpet Area</h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.carpet_area", 0)} sqft</p>
//                   </li>
//                 )}

//               {getValue(props, "propertyInfo.facing", "") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/explore_black_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="chair-icon"
//                     />
//                     <h6>Facing</h6>
//                   </div>
//                   <p>{textFormat(getValue(props, "propertyInfo.facing", 0))}</p>
//                 </li>
//               )}

//               {getValue(props, "propertyInfo.furnishing", 0) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/chair_black_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="compass-icon"
//                     />
//                     <h6>Furnishing</h6>
//                   </div>
//                   <p>
//                     {textFormat(getValue(props, "propertyInfo.furnishing", 0))}
//                   </p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.bachelor_allowed") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/people_24.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Bachelors allowed</h6>
//                   </div>
//                   <p>Yes</p>
//                 </li>
//               )}

//               {getValue(props, "propertyInfo.reserved_parking") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/drive.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Parking facility </h6>
//                   </div>
//                   <p>
//                     Available (
//                     {getValue(props, "propertyInfo.reserved_parking")})
//                   </p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.total_floor", 0) !== 0 &&
//                 getValue(props, "propertyInfo.total_floor", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/maps_home_work.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Total floors </h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.total_floor")}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.property_floor", 0) !== 0 &&
//                 getValue(props, "propertyInfo.property_floor", 0) !== "0" && (
//                   <li className="d-flex align-items-center ">
//                     <div className="plot-list d-flex align-items-center">
//                       <img
//                         src="/images/maps_home_work.svg"
//                         className="img-fluid plot-list-img"
//                         alt="expand-icon"
//                       />
//                       <h6>Property floor # </h6>
//                     </div>
//                     <p>{getValue(props, "propertyInfo.property_floor")}</p>
//                   </li>
//                 )}
//               {getValue(props, "propertyInfo.floor_type") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/auto_awesome.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Floor type </h6>
//                   </div>
//                   <p>{getValue(props, "propertyInfo.floor_type")}</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.water_supply") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/water_drop.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Water supply </h6>
//                   </div>
//                   <p>{getValue(props, "propertyInfo.water_supply")}</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.servant_accommodation") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/house_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Servant Accommodation </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.pooja_room") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/water_damage_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Pooja Room </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.study_room") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/menu_book_24.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Study Room </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(props, "propertyInfo.store_room") && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/meeting_room_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Store Room </h6>
//                   </div>
//                   <p>Available</p>
//                 </li>
//               )}
//               {getValue(
//                 props,
//                 "propertyInfo.separate_entery_for_servent_room"
//               ) && (
//                 <li className="d-flex align-items-center ">
//                   <div className="plot-list d-flex align-items-center">
//                     <img
//                       src="/images/login_24dp.svg"
//                       className="img-fluid plot-list-img"
//                       alt="expand-icon"
//                     />
//                     <h6>Servant Entry </h6>
//                   </div>
//                   <p>Available (Seperate entry)</p>
//                 </li>
//               )}
//             </>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }



import { textFormat } from "@common/formatText";
import { getValue } from "/utils/lodash";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

export default function PropertyDetailsHighlights(props) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  const text = getValue(props, "propertyInfo.property_rera") || "-";
  const isLong = text.length > 40;
  const isMobileLong = text.length > 20;

  return (
    <div className="property-details-wrapper--body--information--property-highlight mt-0 property-details-section-separation">
      <h3 className="property-details-title">Property Highlights</h3>
      <div className="plot-details">
        <ul>
          {getValue(props, "type", "") === "sale" ? (
            <>
              {getValue(props, "propertyInfo.property_rera") ? (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/maps_home_work.svg"
                      className="img-fluid plot-list-img"
                      alt="sqaure-icon"
                    />
                    <h6>RERA</h6>
                  </div>
                  <p
                    className="property-rera-text-desktop"
                    onClick={() => copyToClipboard(text)}
                  >
                    {isLong ? (
                      <>
                        <span
                          data-tooltip-id="property-tooltip"
                          data-tooltip-content={text}
                        >
                          {truncateText(text, 40)}
                        </span>
                        <Tooltip id="property-tooltip" place="top" />
                      </>
                    ) : (
                      text
                    )}
                  </p>
                  <p
                    className="property-rera-text-mobile"
                    onClick={() => copyToClipboard(text)}
                  >
                    {isMobileLong ? (
                      <>
                        <span
                          data-tooltip-id="property-tooltip"
                          data-tooltip-content={text}
                        >
                          {truncateText(text, 20)}
                        </span>
                        <Tooltip id="property-tooltip" place="top" />
                      </>
                    ) : (
                      text
                    )}
                  </p>
                </li>
              ) : (
                ""
              )}
              {/* {getValue(props, "propertyInfo.approved_by") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/verified.svg"
                      className="img-fluid plot-list-img"
                      alt="sqaure-icon"
                    />
                    <h6>Approved by</h6>
                  </div>
                  <p>{getValue(props, "propertyInfo.approved_by", "")}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.approved_by") &&
                getValue(props, "propertyInfo.approved_by", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/verified.svg"
                        className="img-fluid plot-list-img"
                        alt="sqaure-icon"
                      />
                      <h6>Approved by</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.approved_by", "")}</p>
                  </li>
                )}


              {getValue(props, "propertyInfo.plot_length", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_length", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/highlight_alt.svg"
                        className="img-fluid plot-list-img"
                        alt="sqaure-icon"
                      />
                      <h6>Plot length</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.plot_length", "")}</p>
                  </li>
                )}
              {getValue(props, "propertyInfo.plot_breath", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_breath", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/highlight_alt.svg"
                        className="img-fluid plot-list-img"
                        alt="sqaure-icon"
                      />
                      <h6>Plot breadth</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.plot_breath", "")}</p>
                  </li>
                )}
              {getValue(props, "propertyInfo.development_size", 0) !== 0 &&
                getValue(props, "propertyInfo.development_size", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/fullscreen_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Development Size (Acres)</h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.development_size", "")}
                    </p>
                  </li>
                )}
              {getValue(props, "propertyInfo.monthly_maintenance", 0) !== 0 &&
                getValue(props, "propertyInfo.monthly_maintenance", 0) !==
                "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/people_24.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Monthly maintenance</h6>
                    </div>
                    <p>
                      INR{" "}
                      {getValue(props, "propertyInfo.monthly_maintenance", "")}
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.brokerage_charges", 0) !== 0 &&
                getValue(props, "propertyInfo.brokerage_charges", 0) !==
                "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/payments.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Brokerage Charges</h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.brokerage_charges") &&
                        `INR ${getValue(
                          props,
                          "propertyInfo.brokerage_charges"
                        )}`}
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.brokerage_details", false) && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/payments.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Brokerage</h6>
                  </div>
                  <p>Standard Brokerage Charges Applicable*</p>
                </li>
              )}

              {getValue(props, "propertyInfo.bathrooms", 0) !== 0 &&
                getValue(props, "propertyInfo.bathrooms", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/bathroom_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="bathroom-icon"
                      />
                      <h6>Bathrooms</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.bathrooms", 0)}</p>
                  </li>
                )}
              {getValue(props, "propertyInfo.balcony", 0) !== 0 &&
                getValue(props, "propertyInfo.balcony", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/balcony_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="balcony-icon"
                      />
                      <h6>Balcony</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.balcony", 0)}</p>
                  </li>
                )}
              {/* {getValue(props, "propertyInfo.facing") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/explore_black_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="chair-icon"
                    />
                    <h6>Facing</h6>
                  </div>
                  <p>{textFormat(getValue(props, "propertyInfo.facing", 0))}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.facing") &&
                getValue(props, "propertyInfo.facing", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/explore_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="chair-icon"
                      />
                      <h6>Facing</h6>
                    </div>
                    <p>{textFormat(getValue(props, "propertyInfo.facing", 0))}</p>
                  </li>
                )}

              {/* {getValue(props, "propertyInfo.furnishing") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/chair_black_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="compass-icon"
                    />
                    <h6>Furnishing</h6>
                  </div>
                  <p>
                    {textFormat(getValue(props, "propertyInfo.furnishing", 0))}
                  </p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.furnishing") &&
                getValue(props, "propertyInfo.furnishing", "").toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/chair_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="compass-icon"
                      />
                      <h6>Furnishing</h6>
                    </div>
                    <p>
                      {textFormat(getValue(props, "propertyInfo.furnishing", 0))}
                    </p>
                  </li>
                )}


              {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 ||
                (getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
                  getValue(props, "propertyInfo.plot_area", 0) !== 0 && (
                    <li className="d-flex align-items-center ">
                      <div className="plot-list d-flex align-items-center">
                        <img
                          src="/images/crop_square_black_24dp.svg"
                          className="img-fluid plot-list-img"
                          alt="sqaure-icon"
                        />
                        <h6>Plot Area</h6>
                      </div>
                      <p>{getValue(props, "propertyInfo.plot_area", 0)} sqft</p>
                    </li>
                  ))}
              {getValue(props, "propertyInfo.carpet_area", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>Carpet Area</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.carpet_area", 0)} sqft</p>
                  </li>
                )}
              {getValue(props, "propertyInfo.carpet_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.carpet_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area_max", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/property-details/grid.svg"
                        className="img-fluid plot-list-img"
                        alt="grid-icon"
                      />
                      <h6>Carpet area</h6>
                    </div>
                    <p>
                      {`${getValue(
                        props,
                        "propertyInfo.carpet_area_min",
                        0
                      )} - ${getValue(
                        props,
                        "propertyInfo.carpet_area_max",
                        0
                      )} Sqft`}
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_area_max", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>Plot Area</h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.plot_area_min", 0) +
                        " - " +
                        getValue(props, "propertyInfo.plot_area_max", 0)}{" "}
                      sqft
                    </p>
                  </li>
                )}
              {getValue(props, "propertyInfo.total_units", 0) !== 0 &&
                getValue(props, "propertyInfo.total_units", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/space_dashboard.svg"
                        className="img-fluid plot-list-img"
                        alt="lines-with-weight-icon"
                      />
                      <h6>Total Units</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.total_units", 0)}</p>
                  </li>
                )}
              {/* {getValue(props, "propertyInfo.reserved_parking") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/drive.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Parking facility </h6>
                  </div>
                  <p>
                    Available (
                    {getValue(props, "propertyInfo.reserved_parking")})
                  </p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.reserved_parking") &&
                getValue(props, "propertyInfo.reserved_parking", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/drive.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Parking facility </h6>
                    </div>
                    <p>
                      Available ({getValue(props, "propertyInfo.reserved_parking")})
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.total_floor", 0) !== 0 &&
                getValue(props, "propertyInfo.total_floor", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/maps_home_work.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Total floors </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.total_floor")}</p>
                  </li>
                )}
              {getValue(props, "propertyInfo.property_floor", 0) !== 0 &&
                getValue(props, "propertyInfo.property_floor", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/maps_home_work.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Property floor # </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.property_floor")}</p>
                  </li>
                )}
              {/* {getValue(props, "propertyInfo.floor_type") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/auto_awesome.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Floor type </h6>
                  </div>
                  <p>{getValue(props, "propertyInfo.floor_type")}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.floor_type") &&
                getValue(props, "propertyInfo.floor_type", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/auto_awesome.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Floor type </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.floor_type")}</p>
                  </li>
                )}

              {/* {getValue(props, "propertyInfo.water_supply") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/water_drop.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Water supply </h6>
                  </div>
                  <p>{getValue(props, "propertyInfo.water_supply")}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.water_supply") &&
                getValue(props, "propertyInfo.water_supply", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/water_drop.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Water supply </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.water_supply")}</p>
                  </li>
                )}

              {getValue(props, "propertyInfo.servant_accommodation") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/house_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Servant Accommodation </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(props, "propertyInfo.pooja_room") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/water_damage_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Pooja Room </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(props, "propertyInfo.study_room") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/menu_book_24.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Study Room </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(props, "propertyInfo.store_room") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/meeting_room_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Store Room </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(
                props,
                "propertyInfo.separate_entery_for_servent_room"
              ) && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/login_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Servant Entry </h6>
                    </div>
                    <p>Available (Seperate entry)</p>
                  </li>
                )}
            </>
          ) : (
            <>
              {getValue(props, "propertyInfo.security_amount", 0) !== 0 &&
                getValue(props, "propertyInfo.security_amount", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/verified.svg"
                        className="img-fluid plot-list-img"
                        alt="sqaure-icon"
                      />
                      <h6>Security amount</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.security_amount", "")}</p>
                  </li>
                )}
              {(getValue(props, "propertyInfo.brokerage_details") ||
                getValue(props, "propertyInfo.brokerage_charges")) && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/payments.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Brokerage</h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.brokerage_charges")
                        ? `INR ${getValue(
                          props,
                          "propertyInfo.brokerage_charges"
                        )}`
                        : "Applicable"}
                    </p>
                  </li>
                )}
              {getValue(props, "propertyInfo.monthly_maintenance") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/payments.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Monthly maintenance</h6>
                  </div>
                  <p>
                    {getValue(props, "propertyInfo.monthly_maintenance")
                      ? `INR ${getValue(
                        props,
                        "propertyInfo.monthly_maintenance"
                      )}`
                      : "Applicable"}
                  </p>
                </li>
              )}
              {getValue(props, "propertyInfo.carpet_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.carpet_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area_max", 0) !== "0" && (
                  <li className="d-flex align-items-center">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>Carpet area</h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.carpet_area_min", 0) +
                        " - " +
                        getValue(props, "propertyInfo.carpet_area_max", 0)}{" "}
                      Sqft
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_area_max", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>Plot Area</h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.plot_area_min", 0) +
                        " - " +
                        getValue(props, "propertyInfo.plot_area_max", 0)}{" "}
                      sqft
                    </p>
                  </li>
                )}
              {getValue(props, "propertyInfo.build_up_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.build_up_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.build_up_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.build_up_area_max", 0) !==
                "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/property-details/grid.svg"
                        className="img-fluid plot-list-img"
                        alt="grid-icon"
                      />
                      <h6>
                        {getValue(
                          props,
                          "propertyInfo.property_type.title",
                          ""
                        ) !== "Villas"
                          ? "Super"
                          : ""}{" "}
                        Built up area
                      </h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.build_up_area_min", 0) +
                        " - " +
                        getValue(
                          props,
                          "propertyInfo.build_up_area_max",
                          0
                        )}{" "}
                      Sqft
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.build_up_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.build_up_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.build_up_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.build_up_area_max", 0) !==
                "0" && (
                  <li className="d-flex align-items-center">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>
                        {getValue(
                          props,
                          "propertyInfo.property_type.title",
                          ""
                        ) !== "Villas"
                          ? "Super"
                          : ""}{" "}
                        Built up area
                      </h6>
                    </div>
                    <p>
                      {getValue(props, "propertyInfo.build_up_area", 0)} sqft
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.plot_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.plot_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.plot_area_max", 0) !== "0" && (
                  <li className="d-flex align-items-center">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>Plot Area</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.plot_area", 0)} sqft</p>
                  </li>
                )}

              {getValue(props, "propertyInfo.carpet_area_min", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area_min", 0) !== "0" &&
                getValue(props, "propertyInfo.carpet_area_max", 0) !== 0 &&
                getValue(props, "propertyInfo.carpet_area_max", 0) !== "0" && (
                  <li className="d-flex align-items-center">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/crop_square_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="square-icon"
                      />
                      <h6>Carpet Area</h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.carpet_area", 0)} sqft</p>
                  </li>
                )}

              {/* {getValue(props, "propertyInfo.facing", "") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/explore_black_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="chair-icon"
                    />
                    <h6>Facing</h6>
                  </div>
                  <p>{textFormat(getValue(props, "propertyInfo.facing", 0))}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.facing", 0) &&
                getValue(props, "propertyInfo.facing", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/explore_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="chair-icon"
                      />
                      <h6>Facing</h6>
                    </div>
                    <p>{textFormat(getValue(props, "propertyInfo.facing", 0))}</p>
                  </li>
                )}


              {/* {getValue(props, "propertyInfo.furnishing", 0) && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/chair_black_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="compass-icon"
                    />
                    <h6>Furnishing</h6>
                  </div>
                  <p>
                    {textFormat(getValue(props, "propertyInfo.furnishing", 0))}
                  </p>
                </li>
              )} */}

              {getValue(props, "propertyInfo.furnishing", 0) &&
                getValue(props, "propertyInfo.furnishing", "").toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/chair_black_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="compass-icon"
                      />
                      <h6>Furnishing</h6>
                    </div>
                    <p>
                      {textFormat(getValue(props, "propertyInfo.furnishing", 0))}
                    </p>
                  </li>
                )}


              {getValue(props, "propertyInfo.bachelor_allowed") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/people_24.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Bachelors allowed</h6>
                  </div>
                  <p>Yes</p>
                </li>
              )}

              {/* {getValue(props, "propertyInfo.reserved_parking") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/drive.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Parking facility </h6>
                  </div>
                  <p>
                    Available (
                    {getValue(props, "propertyInfo.reserved_parking")})
                  </p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.reserved_parking") &&
                getValue(props, "propertyInfo.reserved_parking", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/drive.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Parking facility </h6>
                    </div>
                    <p>
                      Available ({getValue(props, "propertyInfo.reserved_parking")})
                    </p>
                  </li>
                )}

              {getValue(props, "propertyInfo.total_floor", 0) !== 0 &&
                getValue(props, "propertyInfo.total_floor", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/maps_home_work.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Total floors </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.total_floor")}</p>
                  </li>
                )}
              {getValue(props, "propertyInfo.property_floor", 0) !== 0 &&
                getValue(props, "propertyInfo.property_floor", 0) !== "0" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/maps_home_work.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Property floor # </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.property_floor")}</p>
                  </li>
                )}
              {/* {getValue(props, "propertyInfo.floor_type") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/auto_awesome.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Floor type </h6>
                  </div>
                  <p>{getValue(props, "propertyInfo.floor_type")}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.floor_type") &&
                getValue(props, "propertyInfo.floor_type", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/auto_awesome.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Floor type </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.floor_type")}</p>
                  </li>
                )}

              {/* {getValue(props, "propertyInfo.water_supply") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/water_drop.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Water supply </h6>
                  </div>
                  <p>{getValue(props, "propertyInfo.water_supply")}</p>
                </li>
              )} */}
              {getValue(props, "propertyInfo.water_supply") &&
                getValue(props, "propertyInfo.water_supply", "").toString().toLowerCase() !== "null" && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/water_drop.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Water supply </h6>
                    </div>
                    <p>{getValue(props, "propertyInfo.water_supply")}</p>
                  </li>
                )}

              {getValue(props, "propertyInfo.servant_accommodation") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/house_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Servant Accommodation </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(props, "propertyInfo.pooja_room") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/water_damage_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Pooja Room </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(props, "propertyInfo.study_room") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/menu_book_24.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Study Room </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(props, "propertyInfo.store_room") && (
                <li className="d-flex align-items-center ">
                  <div className="plot-list d-flex align-items-center">
                    <img
                      src="/images/meeting_room_24dp.svg"
                      className="img-fluid plot-list-img"
                      alt="expand-icon"
                    />
                    <h6>Store Room </h6>
                  </div>
                  <p>Available</p>
                </li>
              )}
              {getValue(
                props,
                "propertyInfo.separate_entery_for_servent_room"
              ) && (
                  <li className="d-flex align-items-center ">
                    <div className="plot-list d-flex align-items-center">
                      <img
                        src="/images/login_24dp.svg"
                        className="img-fluid plot-list-img"
                        alt="expand-icon"
                      />
                      <h6>Servant Entry </h6>
                    </div>
                    <p>Available (Seperate entry)</p>
                  </li>
                )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
