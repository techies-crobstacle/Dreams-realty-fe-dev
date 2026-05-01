import React from "react";
import PropertyCard from "@components/home/property-listed/property-card.js";
import Link from "next/link";
import { getValue } from "/utils/lodash";

export default function PropertyList(props) {
  return (
    <section className="property-list-wrapper ">
      <div className="custom-container py-5">
        <h1 className="home-banner-h1-tag">
          Dream Properties: Find Your Perfect Home with us!
        </h1>
        <div className="property-list-wrapper--banner-links mt-3">
          <ul>
            {/* <li>
              <Link href="/" className="active">Home</Link>
            </li> */}
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
        <div className="property-list-wrapper--title">
          <h2>Each property is verified and listed To deliver excellence</h2>
        </div>
        {props.typeLoading ? (
          "Please wait ..."
        ) : getValue(props, "propertyTypeList.length", 0) !== 0 ? (
          <PropertyCard
            propertyTypeList={getValue(props, "propertyTypeList", [])}
            handleNavigate={props.handleNavigate}
            activeTabHome={props.activeTabHome}
          />
        ) : (
          "No Property Types Found "
        )}
      </div>
    </section>
  );
}
