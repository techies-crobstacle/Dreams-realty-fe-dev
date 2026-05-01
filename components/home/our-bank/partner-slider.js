import React, { useEffect } from "react";
import Partnerscard from "@components/home/our-bank/parteners-card.js";
import { getValue } from "/utils/lodash";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

export default function BankSlider(props) {
  const initializeBankSlider = () => {
    new Swiper(".bank-card-swiper-container", {
      loop: true,
      slidesPerView: 5,
      autoplay: {
        delay: 5000,
      },
      spaceBetween: 16,
      navigation: {
        nextEl: ".CustomerCard-slide-right-bank",
        prevEl: ".CustomerCard-slide-left-bank",
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
    initializeBankSlider();
  });
  return (
    <div className="customer-card-wrapper--slider">
      <div className="swiper-container bank-card-swiper-container">
        <div className="swiper-wrapper">
          {getValue(props, "banksList", []).map((bankObj, index) => {
            return (
              <div key={index} className="swiper-slide">
                <Partnerscard ourBankPropObj={bankObj} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
