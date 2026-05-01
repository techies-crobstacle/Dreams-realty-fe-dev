import React, { useEffect } from "react";
import Partnerscard from "@components/home/our-partners/parteners-card.js";
import Swiper from "swiper/bundle";
import { getValue } from "/utils/lodash";

export default function PartnerSlider(props) {
  const initializePartnerSlider = () => {
    new Swiper(".partner-card-swiper-container", {
      loop: true,
      slidesPerView: 5,
      autoplay: {
        delay: 5000,
      },
      spaceBetween: 16,
      navigation: {
        nextEl: ".CustomerCard-slide-right",
        prevEl: ".CustomerCard-slide-left",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        350: {
          slidesPerView: 2,
          spaceBetween: 8,
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
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
      },
    });
  };
  useEffect(() => {
    initializePartnerSlider();
  });
  return (
    <div className="customer-card-wrapper--slider">
      <div className="swiper-container partner-card-swiper-container">
        <div className="swiper-wrapper">
          {getValue(props, "partnersList", []).map((storyObj, index) => {
            return (
              <div key={index} className="swiper-slide">
                <Partnerscard OurPartnersPropObj={storyObj} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
