// import React, { useEffect, useState } from "react";
// import Layout from "@components/layout.js";
// import { getValue } from "/utils/lodash";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { Button } from "reactstrap";
// import ProfileSVG from "@components/svg/profile-svg";
// import AlbumSVG from "@components/svg/album-svg";
// import PropertySVG from "@components/svg/property-svg";
// import MapSVG from "@components/svg/map-svg";
// import UploadSVG from "@components/svg/upload-svg";
// import {
//   fetchRentProperties,
//   fetchSaleProperties,
//   fetchUpdateRentProperty,
//   fetchUpdateSaleProperty,
// } from "@services/APIs/common.service";
// function ListStep4(props) {
//   const router = useRouter();
  
//   /* -------------------------------------------------------------------------- */
//   /*                               Use State Section                            */
//   /* -------------------------------------------------------------------------- */
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageList, setImageList] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState(false);

//   /* -------------------------------------------------------------------------- */
//   /*                               Use effect Section                           */
//   /* -------------------------------------------------------------------------- */

//   useEffect(() => {
//     getData();
//   }, []);

//   /* -------------------------------------------------------------------------- */
//   /*                               API Section                                  */
//   /* -------------------------------------------------------------------------- */

//   const uploadImage = async (e) => {
//     if (e.target.files[0]) {
//       const formData = new FormData();
//       Array.from(e.target.files).forEach((image) => {
//         formData.append("files", image);
//       });
//       axios
//         .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // Authorization: "Bearer " + authToken,
//           },
//         })
//         .then(async (res) => {
//           if (props.type === "sale") {
//             let data = {
//               data: {
//                 images: getValue(res, `data`, []).map((item) => item.id),
//               },
//               where: { id: props.id },
//             };
//             let resp = await fetchUpdateSaleProperty(data);
//             if (resp) {
//               e.target.getValue = null;
//               getData();
//             }
//           } else {
//             let data = {
//               data: {
//                 images: getValue(res, `data`, []).map((item) => item.id),
//               },
//               where: { id: props.id },
//             };
//             let resp = await fetchUpdateRentProperty(data);
//             if (resp) {
//               getData();
//             }
//           }
//         })
//         .catch((err) => {});
//     }
//   };
//   const getData = async () => {
//     if (props.type === "sale") {
//       try {
//         setIsLoading(true);
//         let resp = await fetchSaleProperties(props.id);
//         if (resp) {
//           setIsLoading(false);
//           setImageList(getValue(resp, `saleProperty.images`, []));
//         } else {
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setIsLoading(false);
//       }
//     } else {
//       try {
//         let resp = await fetchRentProperties(props.id);
//         setIsLoading(true);
//         if (resp) {
//           setImageList(getValue(resp, `rentProperty.images`, []));
//           setIsLoading(false);
//         } else {
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     // Prevent default and stop any other event handling
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Immediately set loading state
//     setIsSubmitting(true);
//     setSubmitError(false);
//     setSubmitSuccess(false);
    
//     // Process submission in next tick to ensure UI updates
//     requestAnimationFrame(() => {
//       setTimeout(async () => {
//         try {
//           console.log('Processing submission...');
          
//           // Minimum 2 seconds to show loading
//           const startTime = Date.now();
          
//           // Your actual API call would go here
//           // await submitFormData();
          
//           // Ensure minimum loading time for UX
//           const elapsedTime = Date.now() - startTime;
//           const remainingTime = Math.max(0, 2000 - elapsedTime);
          
//           if (remainingTime > 0) {
//             await new Promise(resolve => setTimeout(resolve, remainingTime));
//           }
          
//           // Show success state
//           setIsSubmitting(false);
//           setSubmitSuccess(true);
          
//           // Navigate after showing success
//           setTimeout(() => {
//             router.push('/create-thankyou');
//           }, 800);
          
//         } catch (error) {
//           console.error('Submission error:', error);
//           setIsSubmitting(false);
//           setSubmitError(true);
          
//           // Reset error state after 3 seconds
//           setTimeout(() => {
//             setSubmitError(false);
//           }, 3000);
//         }
//       }, 10);
//     });
//   };

//   return (
//     <Layout>
//       <style jsx>{`
//         .spinner-border {
//           display: inline-block;
//           border: 2px solid transparent;
//           border-top: 2px solid currentColor;
//           border-radius: 50%;
//           animation: spinner-border 0.75s linear infinite;
//         }
//         .spinner-border-sm {
//           width: 1rem;
//           height: 1rem;
//           border-width: 2px;
//         }
//         @keyframes spinner-border {
//           0% { 
//             transform: rotate(0deg); 
//           }
//           100% { 
//             transform: rotate(360deg); 
//           }
//         }
//       `}</style>
      
//       {/* Debug info - remove this after testing */}
//       <div style={{ position: 'fixed', top: '10px', right: '10px', background: 'black', color: 'white', padding: '10px', zIndex: 9999 }}>
//         isSubmitting: {isSubmitting.toString()}<br/>
//         submitSuccess: {submitSuccess.toString()}<br/>
//         submitError: {submitError.toString()}
//       </div>
      
//       <div className="position-relative">
//         <ul className="flight-tabs-ul">
//           <li>
//             <Button color="nothing">
//               <span className="flight-tabs-icon">
//                 <ProfileSVG />
//               </span>
//               <span className="flight-tabs-text">Your Details</span>
//             </Button>
//           </li>
//           <li>
//             <Link href={`/list-step2/${props.id}/${props.type}`}>
//               <Button color="nothing">
//                 <span className="flight-tabs-icon">
//                   <PropertySVG />
//                 </span>
//                 <span className="flight-tabs-text">Property Listing/Type</span>
//               </Button>
//             </Link>
//           </li>
//           <li>
//             <Link href={`/list-step3/${props.id}/${props.type}`}>
//               <Button color="nothing">
//                 <span className="flight-tabs-icon">
//                   <MapSVG />
//                 </span>
//                 <span className="flight-tabs-text">Property Details</span>
//               </Button>
//             </Link>
//           </li>
//           <li className="active">
//             <Link href={`/list-step4/${props.id}/${props.type}`}>
//               <Button color="nothing">
//                 <span className="flight-tabs-icon">
//                   <AlbumSVG />
//                 </span>
//                 <span className="flight-tabs-text">Property Photos</span>
//               </Button>
//             </Link>
//           </li>
//         </ul>
//         <section className="list-step1">
//           <div className="custom-container">
//             <div className="row">
//               <div className="col-md-10 mx-auto">
//                 {/* <h2>Photos</h2>
// 								<p className="mb-4">
// 									90% Property Seekers contact on properties with Photos
// 								</p> */}
//                 <label className="label-contact">Property Images</label>
//                 <div className="d-flex justify-content-start">
//                   <label className="file-upload-lg">
//                     <div className="text-center">
//                       <UploadSVG />
//                       <h4>Upload Photo</h4>
//                       <p>
//                         Upload Pictures - JPG or PNG (1087px X 569px) Minimum
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       name="upload"
//                       id="upload"
//                       onChange={(e) => uploadImage(e)}
//                       multiple
//                     />
//                   </label>
//                 </div>
//                 <hr className="my-4" />
//                 {isLoading ? (
//                   <p className="text-center mt-3">Please wait...</p>
//                 ) : imageList.length > 0 ? (
//                   <div className="row">
//                     {imageList.map((item, index) => {
//                       return (
//                         <div
//                           key={index}
//                           className="col-sm-2 col-md-3 col-lg-4 mb-3"
//                         >
//                           <div className="img-photo">
//                             <img
//                               alt="photo-icon"
//                               src={
//                                 getValue(item, `url`, "")
//                                   ? process.env.NEXT_PUBLIC_API_URL +
//                                     getValue(item, `url`, "")
//                                   : "/images/insert_photo-24px.svg"
//                               }
//                             />
//                             {/* <button class="btn-close">&times;</button> */}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-center mt-2 mb-2">No Data Found</p>
//                 )}
//                 <div className="mt-4 mb-5">
//                   <button 
//                     className="theme-button theme-primary-btn mr-3" 
//                     disabled={isSubmitting || submitSuccess}
//                     onClick={handleSubmit}
//                     style={{ 
//                       minWidth: '160px',
//                       opacity: isSubmitting || submitSuccess ? 0.8 : 1,
//                       cursor: isSubmitting || submitSuccess ? 'not-allowed' : 'pointer',
//                       pointerEvents: isSubmitting || submitSuccess ? 'none' : 'auto'
//                     }}
//                   >
//                     {isSubmitting ? (
//                       <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         <span 
//                           style={{
//                             display: 'inline-block',
//                             width: '16px',
//                             height: '16px',
//                             border: '2px solid transparent',
//                             borderTop: '2px solid currentColor',
//                             borderRadius: '50%',
//                             animation: 'spin 1s linear infinite',
//                             marginRight: '8px'
//                           }}
//                         ></span>
//                         Processing...
//                       </span>
//                     ) : submitSuccess ? (
//                       <span style={{ color: '#28a745' }}>✓ Success! Redirecting...</span>
//                     ) : submitError ? (
//                       <span style={{ color: '#dc3545' }}>❌ Error! Click to retry</span>
//                     ) : (
//                       'Submit'
//                     )}
//                   </button>
                  
//                   <Link href={`/list-step3/${props.id}/${props.type}`}>
//                     <button 
//                       className="theme-button theme-secondary-btn mr-3" 
//                       disabled={isSubmitting || submitSuccess}
//                       style={{ opacity: isSubmitting || submitSuccess ? 0.6 : 1 }}
//                     >
//                       Previous
//                     </button>
//                   </Link>

//                   <Link href="/">
//                     <button 
//                       className="theme-button theme-secondary-btn mr-3" 
//                       disabled={isSubmitting || submitSuccess}
//                       style={{ opacity: isSubmitting || submitSuccess ? 0.6 : 1 }}
//                     >
//                       Cancel
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <style jsx>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     </Layout>
//   );
// }

// export default ListStep4;

// export async function getServerSideProps({ query }) {
//   const id = query.id[0];
//   const type = query.id[1];
//   return {
//     props: {
//       id,
//       type,
//     },
//   };
// }


import React, { useEffect, useState, useRef } from "react";
import Layout from "@components/layout.js";
import { getValue } from "/utils/lodash";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import ProfileSVG from "@components/svg/profile-svg";
import AlbumSVG from "@components/svg/album-svg";
import PropertySVG from "@components/svg/property-svg";
import MapSVG from "@components/svg/map-svg";
import UploadSVG from "@components/svg/upload-svg";
import {
  fetchRentProperties,
  fetchSaleProperties,
  fetchUpdateRentProperty,
  fetchUpdateSaleProperty,
} from "@services/APIs/common.service";

function ListStep4(props) {
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                               Use State Section                            */
  /* -------------------------------------------------------------------------- */
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Ref-based lock — fires INSTANTLY on click, before any re-render,
  // so rapid double-clicks are blocked at the very first event.
  const isSubmittingRef = useRef(false);

  /* -------------------------------------------------------------------------- */
  /*                               Use effect Section                           */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getData();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               API Section                                  */
  /* -------------------------------------------------------------------------- */
  const uploadImage = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((image) => {
        formData.append("files", image);
      });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          if (props.type === "sale") {
            let data = {
              data: {
                images: getValue(res, `data`, []).map((item) => item.id),
              },
              where: { id: props.id },
            };
            let resp = await fetchUpdateSaleProperty(data);
            if (resp) {
              e.target.getValue = null;
              getData();
            }
          } else {
            let data = {
              data: {
                images: getValue(res, `data`, []).map((item) => item.id),
              },
              where: { id: props.id },
            };
            let resp = await fetchUpdateRentProperty(data);
            if (resp) {
              getData();
            }
          }
        })
        .catch((err) => {});
    }
  };

  const getData = async () => {
    if (props.type === "sale") {
      try {
        setIsLoading(true);
        let resp = await fetchSaleProperties(props.id);
        if (resp) {
          setIsLoading(false);
          setImageList(getValue(resp, `saleProperty.images`, []));
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      try {
        let resp = await fetchRentProperties(props.id);
        setIsLoading(true);
        if (resp) {
          setImageList(getValue(resp, `rentProperty.images`, []));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // IMMEDIATE button disabling - DOM level protection
    const button = e.currentTarget;
    if (button.disabled || isSubmittingRef.current) {
      console.log("Double click blocked!");
      return;
    }
    
    // IMMEDIATE visual feedback - change button text instantly
    isSubmittingRef.current = true;
    button.disabled = true;
    button.style.pointerEvents = 'none';
    button.style.opacity = '0.75';
    button.innerHTML = `
      <span style="display: inline-block; width: 15px; height: 15px; border: 2px solid rgba(255, 255, 255, 0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 8px;"></span>
      Submitting...
    `;
    console.log("Button text changed immediately!");

    // Background state update
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);

    try {
      // Your actual API call goes here
      // await submitFormData();

      // Simulate async work — replace with real call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted successfully!");
      button.innerHTML = "✓ Redirecting...";
      button.style.backgroundColor = "#28a745";
      button.style.borderColor = "#28a745";
      
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Navigate after briefly showing success
      setTimeout(() => {
        console.log("Redirecting to thank you page...");
        router.push("/create-thankyou");
      }, 800);
      
    } catch (error) {
      console.error("Submission error:", error);
      // Re-enable button on error
      isSubmittingRef.current = false;
      button.disabled = false;
      button.style.pointerEvents = 'auto';
      button.style.opacity = '1';
      button.innerHTML = "❌ Error — Retry";
      button.style.backgroundColor = "#dc3545";
      button.style.borderColor = "#dc3545";
      
      setIsSubmitting(false);
      setSubmitError(true);

      setTimeout(() => {
        button.innerHTML = "Submit";
        button.style.backgroundColor = "";
        button.style.borderColor = "";
        setSubmitError(false);
      }, 3000);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render                                       */
  /* -------------------------------------------------------------------------- */
  return (
    <Layout>
      <style jsx>{`
        /* ── Spinner animation ── */
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .btn-spinner {
          display: inline-block;
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          flex-shrink: 0;
        }

        /* ── Submit button states ── */
        .submit-btn {
          min-width: 160px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.15s ease;
        }
        .submit-btn:disabled {
          opacity: 0.75 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }
        .submit-btn.is-success {
          background-color: #28a745 !important;
          border-color: #28a745 !important;
          color: #fff !important;
        }
        .submit-btn.is-error {
          background-color: #dc3545 !important;
          border-color: #dc3545 !important;
          color: #fff !important;
        }
      `}</style>

      <div className="position-relative">
        <ul className="flight-tabs-ul">
          <li>
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <ProfileSVG />
              </span>
              <span className="flight-tabs-text">Your Details</span>
            </Button>
          </li>
          <li>
            <Link href={`/list-step2/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <PropertySVG />
                </span>
                <span className="flight-tabs-text">Property Listing/Type</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={`/list-step3/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <MapSVG />
                </span>
                <span className="flight-tabs-text">Property Details</span>
              </Button>
            </Link>
          </li>
          <li className="active">
            <Link href={`/list-step4/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <AlbumSVG />
                </span>
                <span className="flight-tabs-text">Property Photos</span>
              </Button>
            </Link>
          </li>
        </ul>

        <section className="list-step1">
          <div className="custom-container">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <label className="label-contact">Property Images</label>
                <div className="d-flex justify-content-start">
                  <label className="file-upload-lg">
                    <div className="text-center">
                      <UploadSVG />
                      <h4>Upload Photo</h4>
                      <p>
                        Upload Pictures - JPG or PNG (1087px X 569px) Minimum
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      onChange={(e) => uploadImage(e)}
                      multiple
                    />
                  </label>
                </div>

                <hr className="my-4" />

                {isLoading ? (
                  <p className="text-center mt-3">Please wait...</p>
                ) : imageList.length > 0 ? (
                  <div className="row">
                    {imageList.map((item, index) => (
                      <div
                        key={index}
                        className="col-sm-2 col-md-3 col-lg-4 mb-3"
                      >
                        <div className="img-photo">
                          <img
                            alt="photo-icon"
                            src={
                              getValue(item, `url`, "")
                                ? process.env.NEXT_PUBLIC_API_URL +
                                  getValue(item, `url`, "")
                                : "/images/insert_photo-24px.svg"
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center mt-2 mb-2">No Data Found</p>
                )}

                <div className="mt-4 mb-5">
                  {/* ── Submit button ── */}
                  <button
                    className={`theme-button theme-primary-btn mr-3 submit-btn${
                      submitSuccess ? " is-success" : ""
                    }${submitError ? " is-error" : ""}`}
                    disabled={isSubmitting || submitSuccess}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="btn-spinner" />
                        Submitting...
                      </>
                    ) : submitSuccess ? (
                      "✓ Redirecting..."
                    ) : submitError ? (
                      "❌ Error — Retry"
                    ) : (
                      "Submit"
                    )}
                  </button>

                  <Link href={`/list-step3/${props.id}/${props.type}`}>
                    <button
                      className="theme-button theme-secondary-btn mr-3"
                      disabled={isSubmitting || submitSuccess}
                      style={{
                        opacity: isSubmitting || submitSuccess ? 0.6 : 1,
                      }}
                    >
                      Previous
                    </button>
                  </Link>

                  <Link href="/">
                    <button
                      className="theme-button theme-secondary-btn mr-3"
                      disabled={isSubmitting || submitSuccess}
                      style={{
                        opacity: isSubmitting || submitSuccess ? 0.6 : 1,
                      }}
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ListStep4;

export async function getServerSideProps({ query }) {
  const id = query.id[0];
  const type = query.id[1];
  return {
    props: {
      id,
      type,
    },
  };
}