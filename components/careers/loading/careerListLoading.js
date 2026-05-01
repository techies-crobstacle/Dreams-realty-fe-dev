import React from "react";

function CareerListLoading() {
  return (
    <div className="custom-container my-5">
      <h2>Our Current Openings (0)</h2>
      <div>
        <div className="career-posts">
          <h3 className="animate-loader p-3 mt-1 w-25"></h3>
          <div className="d-flex align-items-center gap-5  my-2">
            <div className="d-flex align-items-center gap-2">
              <img src="/images/career/pin_drop.svg" />
              <span className=" smaller-font animate-loader p-2 px-5"></span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src="/images/career/schedule.svg" />
              <span className=" smaller-font animate-loader p-2 px-5"></span>
            </div>
          </div>
          <p className="mt-3 smaller-font animate-loader p-2 w-100"></p>
          <p className="mt-3 smaller-font animate-loader p-2 w-100"></p>
          <p className="mt-3 smaller-font animate-loader p-2 w-75"></p>
        </div>
        <div className="career-posts">
          <h3 className="animate-loader p-3 mt-1 w-25"></h3>
          <div className="d-flex align-items-center gap-5  my-2">
            <div className="d-flex align-items-center gap-2">
              <img src="/images/career/pin_drop.svg" />
              <span className=" smaller-font animate-loader p-2 px-5 w-25"></span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src="/images/career/schedule.svg" />
              <span className=" smaller-font animate-loader p-2 px-5 w-25"></span>
            </div>
          </div>
          <p className="mt-3 smaller-font animate-loader p-2 w-100"></p>
          <p className="mt-3 smaller-font animate-loader p-2 w-100"></p>
          <p className="mt-3 smaller-font animate-loader p-2 w-75"></p>
        </div>
      </div>
    </div>
  );
}

export default CareerListLoading;
