import React from "react";

function CareerLoading() {
  return (
    <div className="custom-container">
      <div className="d-flex gap-3 justify-content-between my-3 flex-wrap flex-md-nowrap">
        <div className="w-100">
          <div className="career-posts w-100 m-0">
            <h3 className="animate-loader p-3 mt-1 w-50"></h3>
            <div className="d-flex align-items-center gap-2 mt-2 pb-2 add-border-bottom">
              <img src="/images/career/pin_drop_black.svg" />
              <span className=" smaller-font animate-loader p-2 w-25"></span>
            </div>
            <div className="d-flex align-items-center gap-2 my-2 pb-2 add-border-bottom">
              <img src="/images/career/schedule_black.svg" />
              <span className=" smaller-font animate-loader p-2 w-25"></span>
            </div>
            <div>
              <button className="theme-button theme-primary-btn phone-button align-items-center px-5 py-3 mt-2">
                Apply now
              </button>
            </div>
          </div>
          <div className="career-posts">
            <h3>Minimum qualifications</h3>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src="/images/property-details/circle-chk.svg"
                className="img-fluid img-margin"
                alt="check-with-circle-icon"
              />
              <p className="career-requirements animate-loader p-2 w-50"></p>
            </div>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src="/images/property-details/circle-chk.svg"
                className="img-fluid img-margin"
                alt="check-with-circle-icon"
              />
              <p className="career-requirements animate-loader p-2 w-50"></p>
            </div>
          </div>
          <div className="career-posts">
            <h3> About the job</h3>
            <p className="mt-3 smaller-font animate-loader p-2"></p>
            <p className="mt-3 smaller-font animate-loader p-2"></p>
            <p className="mt-3 smaller-font animate-loader p-2 w-75"></p>
          </div>
          <div className="career-posts mb-5">
            <h3>Responsibilities </h3>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src="/images/property-details/circle-chk.svg"
                className="img-fluid img-margin"
                alt="check-with-circle-icon"
              />
              <p className="career-requirements animate-loader p-2 w-50"></p>
            </div>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src="/images/property-details/circle-chk.svg"
                className="img-fluid img-margin"
                alt="check-with-circle-icon"
              />
              <p className="career-requirements animate-loader p-2 w-50"></p>
            </div>
          </div>
        </div>
        <div className="property-details-wrapper--body--contact-us">
          <h3>Apply Now</h3>
          <p className="contact-sub-text">
            By clicking “Apply Now,” I understand and agree to terms and
            condition
          </p>
          <div className="contact-form">
            <div className="form-group contact-elements">
              <label className="contact-label" htmlFor="name">
                Email Address *
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                id="name"
                className="form-control contact-form-control"
              />
            </div>
            <div className="form-group contact-elements">
              <label className="contact-label" htmlFor="mobile">
                Mobile Number *
              </label>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                id="mobile"
                className="form-control contact-form-control"
              />
            </div>
            <div className="form-group contact-elements mb-3">
              <label className="contact-label">Attachment</label>

              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
              />
              <div className="resume-drop-area">
                <p>Drag & Drop Files Here</p>
                <p>Or</p>
                <button className="select-file-btn">Select a file</button>
              </div>
            </div>
            <button className="theme-button theme-primary-btn w-100 mt-4">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerLoading;
