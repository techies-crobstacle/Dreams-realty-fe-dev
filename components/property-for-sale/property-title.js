import React, { useState } from "react";
import MapView from "@components/property-for-sale/map-view.js";

export default function PropertyTitle() {
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
            <button className="theme-button" onClick={() => changeGrid("map")}>
              Map View
            </button>
            <button
              className={`theme-button theme-primary-btn`}
              onClick={() => changeGrid("list")}
            >
              List View
            </button>
          </div>
        </div>
      </div>
      {viewType === "map" && (
        <MapView changetoListView={() => changeGrid("list")} />
      )}
    </>
  );
}
