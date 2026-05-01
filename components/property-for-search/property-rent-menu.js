"use client";

import React from "react";
import dynamic from "next/dynamic";
import { textFormat } from "@common/formatText";

// Dynamically import components
const BangaloreLocation = dynamic(() =>
  import("@components/dropdowns/bangalore.js")
);
const AllProperties = dynamic(() =>
  import("@components/dropdowns/all-property.js")
);
const Budget = dynamic(() => import("@components/dropdowns/budget.js"));
const Area = dynamic(() => import("@components/dropdowns/area.js"));
const Filter = dynamic(() => import("@components/dropdowns/filter.js"));
const StatusFilter = dynamic(() =>
  import("@components/dropdowns/status-filter")
);

export default function PropertyMenu(props) {
  return (
    <>
      <div className="custom-container">
        <div className="menu-list add-position-absolute">
          <ul>
            <li>
              <BangaloreLocation
                // location filter
                citiesList={props.citiesList}
                cityLocationList={props.cityLocationList}
                getCityLocationAfterSearch={props.getCityLocationAfterSearch}
                citySearchInput={props.citySearchInput}
                locationLoading={props.locationLoading}
                onclickOfLocation={props.onclickOfLocation}
                dropdownOpen={props.dropdownOpen}
                toggle={props.toggle}
                selectedLocation={props.selectedLocation}
              />
            </li>
            <li>
              <AllProperties
                // propertyTypeFilter
                dropdownOpen={props.dropdownOpen1}
                toggle={props.toggle1}
                propertyTypeList={props.propertyTypeList}
                selectedPropertyType={props.selectedPropertyType}
                handleChangePropertyType={props.handleChangePropertyType}
              />
            </li>
            <li>
              <Budget
                handleSubmitBudget={props.handleSubmitBudget}
                dropdownOpen={props.dropdownOpen2}
                toggle={props.toggle2}
                selectedMinBudget={props.selectedMinBudget}
                selectedMaxBudget={props.selectedMaxBudget}
                type={props.type}
              />
            </li>
            <li>
              <Area
                handleSubmitArea={props.handleSubmitArea}
                dropdownOpen={props.dropdownOpen3}
                toggle={props.toggle3}
                selectedMinArea={props.selectedMinArea}
                selectedMaxArea={props.selectedMaxArea}
              />
            </li>
            {props.activeTab === "1" && (
              <li>
                <StatusFilter
                  // propertyTypeFilter
                  dropdownOpen={props.dropdownOpenStatus}
                  toggle={props.toggleStatus}
                  propertyTypeList={props.statusFilter}
                  selectedPropertyType={props.selectedPropertyType}
                  handleChangePropertyType={props.handleChangePropertyType}
                  handleChangePropertyStatus={props.handleChangePropertyStatus}
                  selectedPropertyConstructionStatus={
                    props.selectedPropertyConstructionStatus
                  }
                />
              </li>
            )}
            <li>
              <Filter
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
            </li>
          </ul>
        </div>
      </div>
      <div className="display-flex mb-3 filters-wrapper mt-5 pt-4 custom-container">
        {props.selectedLocation.title && (
          <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
            {props.selectedLocation.title ? props.selectedLocation.title : ""}
            <img
              className="img-fluid cursor-pointer"
              src="/images/closeSVG.svg"
              alt="close-icon"
              onClick={() => props.handleRemoveFilters("selectedLocation")}
            />
          </div>
        )}
        {props.selectedPropertyType.title && (
          <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
            {props.selectedPropertyType.title
              ? props.selectedPropertyType.title
              : ""}
            <img
              className="img-fluid cursor-pointer"
              src="/images/closeSVG.svg"
              alt="close-icon"
              onClick={() => props.handleRemoveFilters("selectedPropertyType")}
            />
          </div>
        )}
        {props.selectedMinBudget && (
          <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
            {props.selectedMinBudget
              ? props.selectedMinBudget + "-" + props.selectedMaxBudget
              : ""}
            <img
              className="img-fluid cursor-pointer"
              src="/images/closeSVG.svg"
              alt="close-icon"
              onClick={() => props.handleRemoveFilters("selectedMinBudget")}
            />
          </div>
        )}
        {props.selectedMinArea && (
          <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
            {props.selectedMinArea
              ? props.selectedMinArea + "-" + props.selectedMaxArea
              : ""}
            <img
              className="img-fluid cursor-pointer"
              src="/images/closeSVG.svg"
              alt="close-icon"
              onClick={() => props.handleRemoveFilters("selectedMinArea")}
            />
          </div>
        )}
        {props.activeTab === "1" &&
          props.selectedPropertyConstructionStatus && (
            <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
              {props.selectedPropertyConstructionStatus
                ? textFormat(props.selectedPropertyConstructionStatus)
                : ""}
              <img
                className="img-fluid cursor-pointer ml-2"
                src="/images/closeSVG.svg"
                alt="close-icon"
                onClick={() =>
                  props.handleRemoveFilters("property_construction_status")
                }
              />
            </div>
          )}
      </div>
    </>
  );
}
