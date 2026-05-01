import React from "react";
import PropertyHeader from "@components/home/featured-property-rent/property-type-header.js";
import RentSlider from "@components/home/featured-property-rent/rent-slider.js";

export default function FeaturedBuy(props) {
  return (
    <section className="featured-property-rent-wrapper py-5">
      <div className="custom-container">
        <PropertyHeader />
        <RentSlider
          rentLoading={props.rentLoading}
          rentPropertiesList={props.rentPropertiesList}
          shareModal={props.toggle}
          toggleCta={props.toggleCta}
        />
      </div>
    </section>
  );
}
