import React, { useState } from "react";
import MapView from "@components/property-for-sale/map-view.js";
import { getValue } from "/utils/lodash";

export default function PropertyTitle(props) {
  return (
    <>
      <div
        className="custom-container filter-container"
        style={{ marginTop: "1rem" }}
      >
        <div className="property-for-sale-wrapper--title d-flex justify-content-between align-items-end flex-direction-column-mobile">
          <h3>Each property is verified and listed To deliver excellence</h3>
          <div className="sale-btn">
            {getValue(props, "totalLength", 0) > 0 && (
              <>
                {props.mapData.length !== 0 && (
                  <button
                    className={`theme-button ${
                      props.viewType === "map" ? "theme-primary-btn" : ""
                    }`}
                    onClick={() => props.changeGrid("map")}
                  >
                    Map View
                  </button>
                )}
                <button
                  className={`theme-button ${
                    props.viewType === "list" ? "theme-primary-btn" : ""
                  }`}
                  onClick={() => props.changeGrid("list")}
                >
                  List View
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
