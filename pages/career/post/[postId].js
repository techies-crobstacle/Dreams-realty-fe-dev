// "use client";

// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { Modal, ModalHeader } from "reactstrap";
// import { fetchCareer } from "@services/APIs/common.service";
// import { useParams } from "next/navigation";

// const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
// const JobApply = dynamic(() => import("@components/careers/jobApply"));
// const Layout = dynamic(() => import("@components/layout"));
// const PreviousPage = dynamic(() => import("@components/previous-page"));
// const CareerLoading = dynamic(() =>
//   import("@components/careers/loading/careerLoading")
// );

// import { getValue } from "/utils/lodash";

// function JobPost() {
//   const params = useParams();

//   const [isLoading, setIsLoading] = useState(false);
//   const [careerInfo, setCareerInfo] = useState([]);

//   useEffect(() => {
//     if (params) {
//       getSpecificCareer();
//     }
//   }, [params]);

//   const getSpecificCareer = async () => {
//     try {
//       let where = {
//         "filters[id][$eq]": String(params.postId),
//       };
//       setIsLoading(true);
//       let resp = await fetchCareer(where);
//       if (resp) {
//         setIsLoading(false);
//         setCareerInfo(getValue(resp, "data[0]", {}));
//       } else {
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setIsLoading(false);
//     }
//   };

//   const breadcrumbItems = [
//     { label: "Home", link: "/" },
//     { label: "Career", link: "/career" },
//     { label: getValue(careerInfo, `job_title`, "") },
//   ];

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <Layout>
//       <div className="d-flex align-items-center mb-4">
//         <PreviousPage isCompact={false} />
//         <div style={{ marginTop: "28px", marginLeft: "30px" }}>
//           <DynamicBreadcrumb items={breadcrumbItems} />
//         </div>
//       </div>
//       {isLoading ? (
//         <CareerLoading />
//       ) : (
//         <>
//           <div className="custom-container">
//             <div className="d-flex gap-3 justify-content-between mb-3 flex-wrap flex-md-nowrap">
//               <div className="w-100">
//                 <div className="career-posts w-100 m-0">
//                   <h3>{getValue(careerInfo, `job_title`, "")}</h3>
//                   <div className="d-flex align-items-center gap-2 mt-2 pb-2 add-border-bottom">
//                     <img src="/images/career/pin_drop_black.svg" />
//                     <span className=" smaller-font">
//                       {getValue(careerInfo, `location`, "")}
//                     </span>
//                   </div>
//                   <div className="d-flex align-items-center gap-2 my-2 pb-2 add-border-bottom">
//                     <img src="/images/career/schedule_black.svg" />
//                     <span className=" smaller-font">
//                       {getValue(careerInfo, `employment_type`, "")}
//                     </span>
//                   </div>
//                   <div>
//                     <button
//                       className="theme-button theme-primary-btn phone-button align-items-center px-5 py-3 mt-2"
//                       onClick={toggle}
//                     >
//                       Apply now
//                     </button>
//                     <Modal isOpen={modal} toggle={toggle}>
//                       <ModalHeader toggle={toggle}>Apply Now </ModalHeader>
//                       <div
//                         className="property-details-wrapper--body--contact-us"
//                         style={{ maxWidth: "100%" }}
//                       >
//                         <JobApply openInModal={true} />
//                       </div>
//                     </Modal>
//                   </div>
//                 </div>
//                 <div className="career-posts">
//                   <h3>Minimum qualifications</h3>
//                   <div
//                     className="mt-3 smaller-font custom-list"
//                     dangerouslySetInnerHTML={{
//                       __html: getValue(
//                         careerInfo,
//                         "minimum_qualifications",
//                         ""
//                       ),
//                     }}
//                   ></div>
//                 </div>
//                 <div className="career-posts">
//                   <h3> About the job</h3>
//                   <p
//                     className="mt-3 smaller-font about-the-job"
//                     dangerouslySetInnerHTML={{
//                       __html: getValue(careerInfo, "job_description", ""),
//                     }}
//                   ></p>
//                 </div>
//                 <div className="career-posts mb-5">
//                   <h3>Responsibilities </h3>
//                   <div
//                     className="mt-3 smaller-font custom-list"
//                     dangerouslySetInnerHTML={{
//                       __html: getValue(careerInfo, "responsibilities", ""),
//                     }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="property-details-wrapper--body--contact-us">
//                 <JobApply postId={getValue(careerInfo, "postId", "")} />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </Layout>
//   );
// }

// export default JobPost;
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { fetchCareer } from "@services/APIs/common.service";
import { useParams } from "next/navigation";

const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const JobApply = dynamic(() => import("@components/careers/jobApply"));
const Layout = dynamic(() => import("@components/layout"));
const PreviousPage = dynamic(() => import("@components/previous-page"));
const CareerLoading = dynamic(() =>
  import("@components/careers/loading/careerLoading")
);

import { getValue } from "/utils/lodash";

function JobPost() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [careerInfo, setCareerInfo] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (params?.postId) {
      getSpecificCareer();
    }
  }, [params?.postId]);

  const getSpecificCareer = async () => {
    try {
      let where = {
        "filters[id][$eq]": String(params.postId),
      };
      setIsLoading(true);
      let resp = await fetchCareer(where);
      if (resp) {
        setIsLoading(false);
        setCareerInfo(getValue(resp, "data[0]", {}));
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Career", link: "/career" },
    { label: getValue(careerInfo, `job_title`, "") },
  ];

  const toggle = () => setModal(!modal);

  // Get postId safely
  const postId = params?.postId || "";
  const jobTitle = getValue(careerInfo, "job_title", "");

  return (
    <Layout>
      {/* <div className="d-flex align-items-center mb-4">
        <PreviousPage isCompact={false} />
        <div style={{ marginLeft: "30px" }}>
        </div>
      </div> */}
          <DynamicBreadcrumb items={breadcrumbItems} />
      {isLoading ? (
        <CareerLoading />
      ) : (
        <>
          <div className="custom-container">
            <div className="d-flex gap-3 justify-content-between mb-3 flex-wrap flex-md-nowrap">
              <div className="w-100">
                <div className="career-posts w-100 m-0">
                  <h3>{jobTitle}</h3>
                  <div className="d-flex align-items-center gap-2 mt-2 pb-2 add-border-bottom">
                    <img src="/images/career/pin_drop_black.svg" alt="Location" />
                    <span className="smaller-font">
                      {getValue(careerInfo, `location`, "")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2 my-2 pb-2 add-border-bottom">
                    <img src="/images/career/schedule_black.svg" alt="Employment Type" />
                    <span className="smaller-font">
                      {getValue(careerInfo, `employment_type`, "")}
                    </span>
                  </div>
                  <div>
                    <button
                      className="theme-button theme-primary-btn phone-button align-items-center px-5 py-3 mt-2"
                      onClick={toggle}
                    >
                      Apply now
                    </button>
                  </div>
                </div>
                <div className="career-posts">
                  <h3>Minimum qualifications</h3>
                  <div
                    className="mt-3 smaller-font custom-list"
                    dangerouslySetInnerHTML={{
                      __html: getValue(
                        careerInfo,
                        "minimum_qualifications",
                        ""
                      ),
                    }}
                  ></div>
                </div>
                <div className="career-posts">
                  <h3>About the job</h3>
                  <p
                    className="mt-3 smaller-font about-the-job"
                    dangerouslySetInnerHTML={{
                      __html: getValue(careerInfo, "job_description", ""),
                    }}
                  ></p>
                </div>
                <div className="career-posts mb-5">
                  <h3>Responsibilities</h3>
                  <div
                    className="mt-3 smaller-font custom-list"
                    dangerouslySetInnerHTML={{
                      __html: getValue(careerInfo, "responsibilities", ""),
                    }}
                  ></div>
                </div>
              </div>
              <div className="property-details-wrapper--body--contact-us">
                {postId && (
                  <JobApply 
                    key="sidebar-form"
                    postId={postId} 
                    currentCareer={jobTitle}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal 
            isOpen={modal} 
            toggle={toggle}
            size="lg"
            centered
            scrollable
            unmountOnClose={true}
          >
            <ModalHeader toggle={toggle}>
              Apply for {jobTitle}
            </ModalHeader>
            <ModalBody>
              {postId && (
                <JobApply 
                  key={`modal-form-${modal}`}
                  openInModal={true}
                  postId={postId}
                  currentCareer={jobTitle}
                />
              )}
            </ModalBody>
          </Modal>
        </>
      )}
    </Layout>
  );
}

export default JobPost;