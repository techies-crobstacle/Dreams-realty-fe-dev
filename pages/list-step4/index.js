import React, { useRef, useState } from "react";
import { getValue } from "/utils/lodash";
import Link from "next/link";
import UploadSVG from "@components/svg/upload-svg";

function ListStepTab4(props) {
  const {
    handleSubmit,
    uploadImage,
    handleSubmitTab,
    imageList,
    isLoading,
    handleRemoveImages,
  } = props;

  const isSubmittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // IMMEDIATE button disabling and visual feedback
    const button = e.currentTarget;
    if (button.disabled || isSubmittingRef.current) {
      console.log("Double click blocked!");
      return;
    }

    // IMMEDIATE visual feedback - change button text instantly
    isSubmittingRef.current = true;
    button.disabled = true;
    button.style.pointerEvents = "none";
    button.style.opacity = "0.75";
    button.innerHTML = `
      <span style="display: inline-block; width: 15px; height: 15px; border: 2px solid rgba(255, 255, 255, 0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 8px;"></span>
      Submitting...
    `;
    console.log("Button text changed to Submitting...");

    setIsSubmitting(true);

    try {
      // Parent submit now returns a boolean for actual success/failure
      const isSuccess = await handleSubmit();

      if (isSuccess) {
        console.log("Form submitted successfully!");
        button.innerHTML = "Success!";
        button.style.backgroundColor = "#28a745";
        button.style.borderColor = "#28a745";
      } else {
        isSubmittingRef.current = false;
        button.disabled = false;
        button.style.pointerEvents = "auto";
        button.style.opacity = "1";
        button.innerHTML = "Submit";
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Re-enable button on error
      isSubmittingRef.current = false;
      button.disabled = false;
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
      button.innerHTML = "Error - Retry";
      button.style.backgroundColor = "#dc3545";
      button.style.borderColor = "#dc3545";

      setTimeout(() => {
        button.innerHTML = "Submit";
        button.style.backgroundColor = "";
        button.style.borderColor = "";
        setIsSubmitting(false);
      }, 3000);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <label className="label-contact">Property Images</label>
          <div className="d-flex justify-content-start">
            <label className="file-upload-lg">
              <div className="text-center">
                <UploadSVG />
                <h4>Upload Photo</h4>
                <p>Upload Pictures - JPG or PNG (1087px X 569px) Minimum</p>
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
          {getValue(props, `imageList.length`, 0) > 0 ? (
            <div className="row">
              {getValue(props, `imageList`, []).map((item, index) => {
                return (
                  <div key={index} className="col-sm-2 col-md-3 col-lg-4 mb-3">
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
                      <button
                        className="btn-close"
                        onClick={() => handleRemoveImages(index)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center mt-2 mb-2">No Data Found</p>
          )}
          <div className="mt-4 mb-5 d-flex gap-3 flex-wrap">
            <button
              className="theme-button theme-secondary-btn mr-3"
              onClick={() => handleSubmitTab(3)}
            >
              Previous
            </button>
            <button
              className="theme-button theme-primary-btn mr-3"
              onClick={handleSubmitClick}
              disabled={
                getValue(props, `imageList.length`, 0) === 0 || isSubmitting
              }
            >
              Submit
            </button>
            <Link href="/">
              <button className="theme-button theme-secondary-btn mr-3">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListStepTab4;
