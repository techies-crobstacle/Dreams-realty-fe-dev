import React from "react";
import { getValue } from "/utils/lodash";

export default function PropertyCard(props) {
  return (
    <section className="property-card-wrapper">
      <div className="property-card-wrapper--card-wrapper">
        {getValue(props, "propertyTypeList", []).map((item) => {
          return (
            <a
              className="card position-relative cursor-pointer"
              onClick={() => props.handleNavigate(item.id)}
              key={`property-card-${item.id}`}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${getValue(
                  item,
                  "cover_image.url",
                  "/images/home/property-list/path1copy.webp"
                )}`}
                className="img-fluid dimentions property-card__image"
                alt={`${getValue(item, "title", "").replace(/\s+/g, '-')}-property-image`}
              />
              <div className="card-header">
                <p>For {props.activeTabHome === "1" ? "Sale" : "Rent"}</p>
                <h3>{getValue(item, "title", "")}</h3>
              </div>
              <div className="card-footer d-flex align-items-center">
                <p className="mr-3">Click here</p>
                <img
                  src="/images/home/property-list/arrow_right-24px.svg"
                  alt="arrow-right-icon"
                />
              </div>
            </a>
          );
        })}
        {/* <a className="card position-relative" href="#0">
                    <img src="/images/home/property-list/path2copy.webp" className="img-fluid dimentions"/>
                    <div className="card-header">
                        <p>For Rent</p>
                        <h3>Standalone Homess</h3>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                        <p className="mr-3">300 Listings</p>
                        <img src="/images/home/property-list/arrow_right-24px.svg"/>
                    </div>
                </a>
                <a className="card position-relative" href="#0">
                    <img src="/images/home/property-list/path3copy.webp" className="img-fluid dimentions"/>
                    <div className="card-header">
                        <p>For Rent</p>
                        <h3>Flats/ Apartments</h3>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                        <p className="mr-3">300 Listings</p>
                        <img src="/images/home/property-list/arrow_right-24px.svg"/>
                    </div>
                </a>
                <a className="card position-relative" href="#0">
                    <img src="/images/home/property-list/path1copy.webp" className="img-fluid dimentions"/>
                    <div className="card-header">
                        <p>For Rent</p>
                        <h3>Plots</h3>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                        <p className="mr-3">300 Listings</p>
                        <img src="/images/home/property-list/arrow_right-24px.svg"/>
                    </div>
                </a>  
                <a className="card position-relative" href="#0">
                    <img src="/images/home/property-list/path3copy.webp" className="img-fluid dimentions"/>
                    <div className="card-header">
                        <p>For Rent</p>
                        <h3>Office Space</h3>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                        <p className="mr-3">300 Listings</p>
                        <img src="/images/home/property-list/arrow_right-24px.svg"/>
                    </div>
                </a>
            */}
      </div>
    </section>
  );
}
