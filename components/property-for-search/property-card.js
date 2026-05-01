"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";

// Dynamically import components
const PropertyCard = dynamic(() =>
  import("@components/home/featured-property-buy/property-card-featured.js")
);
const NotFound = dynamic(() => import("@components/not-found"));
const Loading = dynamic(() =>
  import("@components/home/featured-property-buy/featured-loading-card.js")
);

export default function PropertyCardSection(props) {
  const [propertyRentArray] = useState([
    {
      imageIcon: "/images/home/featured-property-rent/rent1.webp",
      title: "4BHK Villa / 1350 Sqft",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 24000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon: "/images/home/featured-property-rent/rent2.webp",
      title: "3BHK Villa / 1850 Sqft",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 54000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon: "/images/home/featured-property-rent/rent3.webp",
      title: "1BHK Flat",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 14000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon:
        "/images/home/featured-property-buy/featured-property1-buy.webp",
      title: "4BHK Villa / 1350 Sqft",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 24000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon: "/images/home/featured-property-rent/rent2.webp",
      title: "3BHK Villa / 1850 Sqft",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 54000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon: "/images/home/featured-property-rent/rent3.webp",
      title: "1BHK Flat",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 24000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon:
        "/images/home/featured-property-buy/featured-property1-buy.webp",
      title: "4BHK Villa / 1350 Sqft",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 24000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon: "/images/home/featured-property-rent/rent2.webp",
      title: "3BHK Villa / 1850 Sqft",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 54000",
      flatType: "Yeswanthpur, Bangalore",
    },
    {
      imageIcon: "/images/home/featured-property-rent/rent3.webp",
      title: "1BHK Flat",
      subTitle: "By Pratham Constructions",
      address: "Yeswanthpur, Bangalore",
      linkPrice: "INR 24000",
      flatType: "Yeswanthpur, Bangalore",
    },
  ]);

  return (
    <div className="custom-container">
      {props.rentLoading ? (
        <div className="wrapper-new">
          {[1, 2, 3, 4, 5, 6].map((index) => {
            return <Loading key={`property-card-${index}`} />;
          })}
        </div>
      ) : getValue(props, "rentPropertiesList.length", 0) !== 0 ? (
        <div className="wrapper-new" id="changeViewType_js">
          {getValue(props, "rentPropertiesList", []).map((tempObj, index) => {
            return (
              <PropertyCard
                type={props.activeTab === "1" ? "sale" : "rent"}
                propertyObj={tempObj}
                key={index}
              />
            );
          })}
        </div>
      ) : (
        <NotFound title="No Properties Found" />
      )}
    </div>
  );
}
