import React, { useState } from "react";
import PropertyCard from "@components/home/featured-property-buy/property-card-featured.js";
import { getValue } from "/utils/lodash";
import NotFound from "@components/not-found";
import Loading from "@components/home/featured-property-buy/featured-loading-card.js";

export default function PropertyCardSection(props) {
  return (
    <div className="custom-container">
      {props.saleLoading ? (
        <div className="wrapper-new">
          {[1, 2, 3, 4, 5, 6].map((index) => {
            return <Loading key={`property-card-${index}`} />;
          })}
        </div>
      ) : getValue(props, "salePropertiesList.length", 0) !== 0 ? (
        <div className="wrapper-new" id="changeViewType_js">
          {getValue(props, "salePropertiesList", []).map((tempObj, index) => {
            return (
              <PropertyCard
                type={"sale"}
                propertyObj={tempObj}
                key={index}
                toggleCta={props.toggleCta}
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
