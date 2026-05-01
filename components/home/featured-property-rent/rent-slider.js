import React, { useEffect, useState } from "react";
import Card from "@components/home/featured-property-buy/property-card-featured.js";
import { getValue } from "/utils/lodash";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

export default function RentSlider(props) {
  const initializeRentPropertySlider = () => {
    new Swiper(".rent-property-swiper-container", {
      // loop: true,
      slidesPerView: 3,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
      },
      spaceBetween: 16,
      navigation: {
        nextEl: ".rent-property-card-slide-right",
        prevEl: ".rent-property-card-slide-left",
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
    initializeRentPropertySlider();
  });

  return (
    <section className="rent-swiper-wrapper">
      <div className="swiper-container rent-property-swiper-container">
        <div className="swiper-wrapper">
          {props.rentLoading
            ? "Please wait..."
            : getValue(props, "rentPropertiesList.length", 0) !== 0
            ? getValue(props, "rentPropertiesList", []).map(
                (element, index) => {
                  return (
                    <div key={`property-rent${index}`} className="swiper-slide">
                      <Card
                        type={"rent"}
                        propertyObj={element}
                        shareModal={props.shareModal}
                        toggleCta={props.toggleCta}
                      />
                    </div>
                  );
                }
              )
            : "No Rent Properties Found"}
        </div>
      </div>
    </section>
  );
}
