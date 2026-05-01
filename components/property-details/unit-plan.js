import { useState } from "react";
import { getValue } from "/utils/lodash";
// import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import LightGallery from "lightgallery/react";

export default function UnitPlan(props) {
  return (
    <div className="property-details-wrapper--body--information--master-plan property-details-section-separation">
      <h3 className="property-details-title">Master/Unit Plans</h3>
      <div className="unit-plan-button">
        <button
          className={`unit-plan-btn ${
            props.selectedPlan === "all" ? "active" : ""
          }`}
          onClick={() => props.handleFilterAllBHKS("all")}
        >
          All Plans
        </button>
        <button
          className={`unit-plan-btn ${
            props.selectedPlan === "master" ? "active" : ""
          }`}
          onClick={() => props.handleFilterMasterPlanBHKS("master")}
        >
          Master Plan
        </button>
        {getValue(props, "propertyInfo.property_bhks", []).map(
          (item, index) => {
            return (
              <button
                key={index}
                className={`unit-plan-btn ${
                  props.selectedPlan === item.id ? "active" : ""
                }`}
                onClick={() => props.handleFilterBHKS(item.id)}
              >
                {getValue(item, "title", "")}
              </button>
            );
          }
        )}
        {/* <button className="unit-plan-btn">3BHK</button>
          <button className="unit-plan-btn">4BHK</button> */}
      </div>

      <div className="plan-image-section">
        {getValue(props, "unitPlansBkhs.length", 0) !== 0
          ? getValue(props, "unitPlansBkhs", []).map((item, index) => {
              return (
                <LightGallery>
                  <a
                    key={index}
                    href={
                      process.env.NEXT_PUBLIC_API_URL +
                      getValue(item, "image.url")
                    }
                  >
                    <div className="plan-image cursor-pointer">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          getValue(item, "image.url")
                        }
                        className="img-fluid plan-image__image"
                        alt={getValue(item, "title", "")}
                      />
                      <h4>{getValue(item, "title", "")}</h4>
                    </div>
                  </a>
                </LightGallery>
              );
            })
          : "No Data Found"}
      </div>
      {/* </LightGallery> */}
      {/* <div className="swiper-container property-banners-wraper--slider">
        <div className="swiper-wrapper" id="lighthouse">
          {getValue(props, "images", []).map((image, index) => {
            return (
              <div
                className="swiper-slide property-banners-wraper--slide-max-width cursor-pointer"
                key={`slider${index}`}
              >
                <LightGallery onInit={onInit} speed={500} >
                  <a href={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                      height="189"
                      className="img-fluid w-100"
                      alt="property-image"
                    />
                  </a>
                </LightGallery>
              </div>
            );
          })}
        </div> */}
    </div>
  );
}
