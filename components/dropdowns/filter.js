import React, { useState } from "react";
import FilterPopup from "@components/popups/filter-popup.js";

export default function Filter(props) {
  return (
    <div className="filter-btn position-relative">
      <button className="filter-button" onClick={() => { props.filterPopup() }}>
        <img
          src="/images/dropdown/filter_list_black_24dp.svg"
          className="mr-2"
          alt="filter-icon"
        />
        Filter
      </button>
      <FilterPopup
        // tooglePropertyFilterPopupSubmit={() => {setShowHideFiltersPopup(false)}} 
        handleSubmitFilter={props.handleSubmitFilter}
        filterPopup={props.filterPopup}
        showHideFiltersPopup={props.showHideFiltersPopup}
        onChangeFilterPopup={props.onChangeFilterPopup}

        furnishing={props.furnishing}
        facing={props.facing}
        bhk_lte={props.bhk_lte}
        bhk_gte={props.bhk_gte}

        filtersObj={props.filtersObj}
        clearFilters={props.clearFilters}
      />
    </div>
  );
}
