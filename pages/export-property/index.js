// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const Layout = dynamic(() => import("@components/layout"));

// const ExportProperty = () => {
//   const [jwt, setJwt] = useState(null);
//   const router = useRouter();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [modal, setModal] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDataLoading, setIsDataLoading] = useState(false);
//   const [activeTabHome, setActiveTabHome] = useState("1");
//   const [downloadFile, setDownloadFile] = useState("");

//   useEffect(() => {
//     const value = localStorage.getItem("token");
//     setJwt(value);
//   }, [activeTabHome]);

//   useEffect(() => {
//     setIsAdmin(!!jwt);
//   }, [jwt]);

//   const handleLogout = () => {
//     setJwt(null);
//     setIsAdmin(false);
//     localStorage.removeItem("token");
//     router.push("/");
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files && event.target.files[0];

//     if (file) {
//       const fileExtension = file.name.split(".").pop();

//       if (fileExtension !== "xlsx") {
//         toast.error("Please select a valid .xlsx file.");
//         setSelectedFile(null);
//         if (event.target) event.target.value = "";
//       } else {
//         setSelectedFile(file);
//       }
//     } else {
//       toast.error("Please select a file.");
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       toast.error("Please select a file to upload.");
//       return;
//     }

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/sale-property-import`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success("Uploaded successfully");
//       setSelectedFile(null);
//     } catch (error) {
//       toast.error("Failed to upload, please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDownloadData = async () => {
//     setIsDataLoading(true);
//     try {
//       let exportApiPath = "";
//       if (activeTabHome === "1") {
//         exportApiPath = "sale-property-export";
//       } else if (activeTabHome === "2") {
//         exportApiPath = "rent-property-export";
//       } else if (activeTabHome === "3") {
//         exportApiPath = "sale-property-enquiry-export";
//       } else if (activeTabHome === "4") {
//         exportApiPath = "rent-property-inquiry-export";
//       } else if (activeTabHome === "5") {
//         exportApiPath = "enquiry-export";
//       }

//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/${exportApiPath}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       const downloadUrl = response.data.downloadUrl;
//       setDownloadFile(response);

//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.setAttribute(
//         "download",
//         `property-${activeTabHome}-export.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Failed to download data, please try again.");
//     } finally {
//       setIsDataLoading(false);
//     }
//   };

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   const handleActiveTabHome = (value) => {
//     setActiveTabHome(value);
//   };

//   return (
//     <Layout isAdmin={isAdmin} toggleModal={toggleModal}>
//       {jwt ? (
//         <div className="custom-container py-4">
//           <div className="property-list-wrapper--banner-links custom-container mt-4 ps-0">
//             <ul>
//               <li>
//                 <a
//                   className={
//                     activeTabHome === "1"
//                       ? "active cursor-pointer"
//                       : "cursor-pointer"
//                   }
//                   onClick={() => handleActiveTabHome("1")}
//                 >
//                   Properties to Buy
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className={
//                     activeTabHome === "2"
//                       ? "active cursor-pointer"
//                       : "cursor-pointer"
//                   }
//                   onClick={() => handleActiveTabHome("2")}
//                 >
//                   Properties to Rent
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className={
//                     activeTabHome === "3"
//                       ? "active cursor-pointer"
//                       : "cursor-pointer"
//                   }
//                   onClick={() => handleActiveTabHome("3")}
//                 >
//                   Sale Property Inquiries
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className={
//                     activeTabHome === "4"
//                       ? "active cursor-pointer"
//                       : "cursor-pointer"
//                   }
//                   onClick={() => handleActiveTabHome("4")}
//                 >
//                   Rent Property Inquiries
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className={
//                     activeTabHome === "5"
//                       ? "active cursor-pointer"
//                       : "cursor-pointer"
//                   }
//                   onClick={() => handleActiveTabHome("5")}
//                 >
//                   Enquiries
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {activeTabHome === "1" && <h3>Import Property</h3>}

//           {jwt && (
//             <div className="mb-5">
//               {activeTabHome === "1" && (
//                 <div className="mt-4 d-flex align-items-center gap-3 flex-wrap">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".xlsx"
//                     style={{ display: "none" }}
//                     id="file-upload"
//                   />
//                   <label htmlFor="file-upload" className="file-upload-btn">
//                     {selectedFile ? selectedFile.name : "Choose File"}
//                   </label>
//                   <button
//                     onClick={handleFileUpload}
//                     className="theme-button header-btn theme-primary-btn"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Uploading..." : "Upload File"}
//                   </button>
//                 </div>
//               )}

//               <div className="mt-5 property-location-wrapper d-flex align-items-center flex-column justify-content-center gap-3 flex-wrap px-3">
//                 <button
//                   onClick={handleDownloadData}
//                   className="theme-button header-btn theme-primary-btn"
//                   disabled={isDataLoading}
//                 >
//                   {isDataLoading ? "Downloading..." : "Download Data"}
//                 </button>
//                 {downloadFile && (
//                   <a
//                     href={downloadFile.data.downloadUrl}
//                     target="__blank"
//                     rel="noreferrer"
//                   >
//                     {downloadFile.data.downloadUrl}
//                   </a>
//                 )}
//               </div>

//               <Modal isOpen={modal} toggle={toggleModal} className="reactstrap-modal">
//                 <ModalBody>Do you want to logout?</ModalBody>
//                 <ModalFooter>
//                   <Button color="secondary" onClick={toggleModal}>
//                     Cancel
//                   </Button>
//                   <Button color="primary" onClick={handleLogout}>
//                     Logout
//                   </Button>
//                 </ModalFooter>
//               </Modal>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className=" d-flex justify-content-center my-5 py-5">
//           You have no access to this page.
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default ExportProperty;


import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Layout = dynamic(() => import("@components/layout"));

const ExportProperty = () => {
  const [jwt, setJwt] = useState(null);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [activeTabHome, setActiveTabHome] = useState("1");
  const [downloadFile, setDownloadFile] = useState("");

  useEffect(() => {
    const value = localStorage.getItem("token");
    setJwt(value);
  }, [activeTabHome]);

  useEffect(() => {
    setIsAdmin(!!jwt);
  }, [jwt]);

  const handleLogout = () => {
    setJwt(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const fileExtension = file.name.split(".").pop();

      if (fileExtension !== "xlsx") {
        toast.error("Please select a valid .xlsx file.");
        setSelectedFile(null);
        if (event.target) event.target.value = "";
      } else {
        setSelectedFile(file);
      }
    } else {
      toast.error("Please select a file.");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sale-property-import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadData = async () => {
    setIsDataLoading(true);
    try {
      let exportApiPath = "";
      if (activeTabHome === "1") {
        exportApiPath = "sale-property-export";
      } else if (activeTabHome === "2") {
        exportApiPath = "rent-property-export";
      } else if (activeTabHome === "3") {
        exportApiPath = "sale-property-enquiry-export";
      } else if (activeTabHome === "4") {
        exportApiPath = "rent-property-inquiry-export";
      } else if (activeTabHome === "5") {
        exportApiPath = "enquiry-export";
      } else if (activeTabHome === "6") {
        exportApiPath = "popup-inquiry-export";
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${exportApiPath}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const downloadUrl = response.data.downloadUrl;
      setDownloadFile(response);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `property-${activeTabHome}-export.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to download data, please try again.");
    } finally {
      setIsDataLoading(false);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleActiveTabHome = (value) => {
    setActiveTabHome(value);
  };

  return (
    <Layout isAdmin={isAdmin} toggleModal={toggleModal}>
      {jwt ? (
        <div className="custom-container py-4">
          <div className="property-list-wrapper--banner-links custom-container mt-4 ps-0">
            <ul>
              <li>
                <a
                  className={
                    activeTabHome === "1"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("1")}
                >
                  Properties to Buy
                </a>
              </li>
              <li>
                <a
                  className={
                    activeTabHome === "2"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("2")}
                >
                  Properties to Rent
                </a>
              </li>
              <li>
                <a
                  className={
                    activeTabHome === "3"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("3")}
                >
                  Sale Property Inquiries
                </a>
              </li>
              <li>
                <a
                  className={
                    activeTabHome === "4"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("4")}
                >
                  Rent Property Inquiries
                </a>
              </li>
              <li>
                <a
                  className={
                    activeTabHome === "5"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("5")}
                >
                  Enquiries
                </a>
              </li>
              <li>
                <a
                  className={
                    activeTabHome === "6"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("6")}
                >
                  Popup Inquiries
                </a>
              </li>
            </ul>
          </div>

          {activeTabHome === "1" && <h3>Import Property</h3>}

          {jwt && (
            <div className="mb-5">
              {activeTabHome === "1" && (
                <div className="mt-4 d-flex align-items-center gap-3 flex-wrap">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx"
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="file-upload-btn">
                    {selectedFile ? selectedFile.name : "Choose File"}
                  </label>
                  <button
                    onClick={handleFileUpload}
                    className="theme-button header-btn theme-primary-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Upload File"}
                  </button>
                </div>
              )}

              <div className="mt-5 property-location-wrapper d-flex align-items-center flex-column justify-content-center gap-3 flex-wrap px-3">
                <button
                  onClick={handleDownloadData}
                  className="theme-button header-btn theme-primary-btn"
                  disabled={isDataLoading}
                >
                  {isDataLoading ? "Downloading..." : "Download Data"}
                </button>
                {downloadFile && (
                  <a
                    href={downloadFile.data.downloadUrl}
                    target="__blank"
                    rel="noreferrer"
                  >
                    {downloadFile.data.downloadUrl}
                  </a>
                )}
              </div>

              <Modal isOpen={modal} toggle={toggleModal} className="reactstrap-modal">
                <ModalBody>Do you want to logout?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          )}
        </div>
      ) : (
        <div className=" d-flex justify-content-center my-5 py-5">
          You have no access to this page.
        </div>
      )}
    </Layout>
  );
};

export default ExportProperty;
