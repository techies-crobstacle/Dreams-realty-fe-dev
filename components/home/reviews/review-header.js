import React from "react";

export default function HeaderReview() {
  return (
    <section className="review-header d-flex align-items-center justify-content-between flex-direction-column-mobile">
      <div className="review-header--title">
        <h3>Our Customer Reviews (Google)</h3>
      </div>
      <div className="review-header--slider-controls-review d-flex align-items-center">
        {/* <a href="#0">View All</a> */}
        <div className="slide-left-review">
          <img
            src="/images/home/slider-controls/arrow-back.svg"
            className="img-fluid mr-4 slide-left-review"
            alt="chevron-left-icon"
          />
        </div>
        <div className="arrow">
          <img
            src="/images/home/slider-controls/arrow-right.svg"
            className="img-fluid slide-right-review"
            alt="chevron-right-icon"
          />
        </div>
      </div>
    </section>
  );
}
