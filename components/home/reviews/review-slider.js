"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { getValue } from "/utils/lodash";

const ReviewCard = dynamic(() =>
  import("@components/home/reviews/review-card")
);

export default function BankSlider(props) {
  const initializeReviewSlider = () => {
    new Swiper(".review-swiper-container", {
      loop: false,
      slidesPerView: 3,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
      },
      spaceBetween: 16,
      navigation: {
        nextEl: ".slide-right-review",
        prevEl: ".slide-left-review",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  };

  useEffect(() => {
    initializeReviewSlider();
  }, []);

  return (
    <>
      <section className="review-header d-flex align-items-center justify-content-between flex-direction-column-mobile">
        <div className="review-header--title">
          <h3>Our Customer Reviews (Google)</h3>
        </div>
        <div className="review-header--slider-controls-review d-flex align-items-center gap-3">
          <div className="slide-left-review">
            <img
              src="/images/home/slider-controls/arrow-back.svg"
              className="img-fluid mr-4"
              alt="chevron-left-icon"
            />
          </div>
          <div className="slide-right-review">
            <img
              src="/images/home/slider-controls/arrow-right.svg"
              className="img-fluid"
              alt="chevron-right-icon"
            />
          </div>
        </div>
      </section>
      <div className="customer-card-wrapper--slider">
        <div className="swiper-container review-swiper-container">
          <div className="swiper-wrapper">
            {getValue(props, "reviews", []).map((tempObj, index) => (
              <div key={index} className="swiper-slide">
                <ReviewCard reviewArray={tempObj} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
