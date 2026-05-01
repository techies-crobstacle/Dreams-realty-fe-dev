import Link from "next/link";
import React, { useState } from "react";
import { getValue } from "@utils/lodash";

const PropertiesByLocation = (props) => {
  const propertyTypeList = props.propertyTypeList;

  //Villa id
  const villasObject = Array.isArray(propertyTypeList)
    ? propertyTypeList.find((item) => item.title === "Villas")
    : undefined;

  const villasId = villasObject ? villasObject.id : null;

  //Apartment id
  const apartmentObject = Array.isArray(propertyTypeList)
    ? propertyTypeList.find((item) => item.title === "Apartments")
    : undefined;

  const apartmentId = apartmentObject ? apartmentObject.id : null;

  return (
    <section className="property-location-wrapper">
      <div className="property-list-wrapper--banner-links custom-container mt-3">
        <ul>
          <li>
            <a
              className={
                props.activeTabHome === "1"
                  ? "active cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => props.handleActiveTabHome("1")}
            >
              Properties to Buy
            </a>
          </li>
          <li>
            <a
              className={
                props.activeTabHome === "2"
                  ? "active cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => props.handleActiveTabHome("2")}
            >
              Properties to Rent
            </a>
          </li>
        </ul>
      </div>
      <div className="custom-container d-md-flex py-4">
        <div className="flex-grow-1">
          <h2 className="property-location-wrapper--title">
            Popular flats in Bangalore
          </h2>
          {getValue(props, "isLocationAreaLoading") === true ? (
            "Loading..."
          ) : (
            <div className="locations-wrapper mt-5">
              {getValue(props, "locationArea", []).map((location) => {
                const slug = getValue(location, "slug", "");
                const title = getValue(location, "title", "").trim();
                const firstWord = title.match(/^\w+/)
                  ? title.match(/^\w+/)[0]
                  : "Untitled";

                return (
                  <Link
                    href={`/search-properties?location_area=${slug}&page=0&type=${props.activeTabHome}&property_type=${apartmentId}`}
                    key={slug}
                  >
                    Flats for {props.activeTabHome === "1" ? "Sale" : "Rent"} in{" "}
                    {firstWord}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex-grow-1 mt-5 mt-md-0">
          <h2 className="property-location-wrapper--title">
            Popular villas in Bangalore
          </h2>
          {getValue(props, "isLocationAreaLoading") === true ? (
            "Loading..."
          ) : (
            <div className="locations-wrapper mt-5">
              {getValue(props, "locationArea", []).map((location) => {
                const slug = getValue(location, "slug", "");
                const title = getValue(location, "title", "").trim();
                const firstWord = title.match(/^\w+/)
                  ? title.match(/^\w+/)[0]
                  : "Untitled";

                return (
                  <Link
                    href={`/search-properties?location_area=${slug}&page=0&type=${props.activeTabHome}&property_type=${villasId}`}
                    key={slug}
                  >
                    Villas for {props.activeTabHome === "1" ? "Sale" : "Rent"}{" "}
                    in {firstWord}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesByLocation;
