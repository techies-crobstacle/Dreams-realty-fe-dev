"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

const Card = dynamic(() => import("./property-card-featured"));

export default function BuySlider(props) {
  const initializePropertySlider = () => {
    new Swiper(".property-swiper-container", {
      // loop: true,
      slidesPerView: 3,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
      },
      spaceBetween: 16,
      navigation: {
        nextEl: ".property-card-slide-right",
        prevEl: ".property-card-slide-left",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 16,
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
          spaceBetween: 24,
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
    initializePropertySlider();
  });
  return (
    <section className="buy-swiper-wrapper">
      <div className="swiper-container property-swiper-container">
        <div className="swiper-wrapper">
          {props.saleLoading
            ? "Please wait..."
            : getValue(props, "salePropertiesList.length", 0) !== 0
            ? getValue(props, "salePropertiesList", []).map(
                (element, index) => {
                  return (
                    <div key={`property-buy${index}`} className="swiper-slide">
                      <Card
                        type={"sale"}
                        propertyObj={element}
                        shareModal={props.shareModal}
                        toggleCta={props.toggleCta}
                      />
                    </div>
                  );
                }
              )
            : "No Sale Property Found"}
        </div>
      </div>
    </section>
  );
}
