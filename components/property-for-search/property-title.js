"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";

// Dynamically import the MapView component
const MapView = dynamic(() =>
  import("@components/property-for-sale/map-view.js")
);

export default function PropertyTitle(props) {
  const [viewType, setViewType] = useState("list");
  function changeGrid(viewType) {
    setViewType(viewType);
    if (viewType === "map") {
      document.querySelector("#changeViewType_js").classList.add("map-view");
    } else {
      document.querySelector("#changeViewType_js").classList.remove("map-view");
    }
  }

  return (
    <>
      <div className="custom-container filter-container">
        <div className="property-for-sale-wrapper--title d-flex justify-content-between align-items-end flex-direction-column-mobile">
          <h3>Each property is verified and listed To deliver excellence</h3>
          <div className="sale-btn">
            {getValue(props, `mapData.length`, 0) !== 0 && (
              <button
                className="theme-button"
                onClick={() => changeGrid("map")}
              >
                Map View
              </button>
            )}
            {getValue(props, "totalLength", 0) > 0 ? (
              <button
                className="theme-button theme-primary-btn"
                onClick={() => changeGrid("list")}
              >
                List View
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {viewType === "map" && !props.rentLoading ? (
        <MapView
          changetoListView={() => changeGrid("list")}
          mapData={props.mapData}
        />
      ) : (
        ""
      )}
    </>
  );
}
