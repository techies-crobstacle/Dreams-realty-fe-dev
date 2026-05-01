import React, { useState } from "react";
import BangaloreLocation from "@components/dropdowns/bangalore.js";
import AllProperties from "@components/dropdowns/all-property.js";
import Budget from "@components/dropdowns/budget.js";
import Area from "@components/dropdowns/area.js";
import Filter from "@components/dropdowns/filter.js";
import StatusFilter from "@components/dropdowns/status-filter";
import { textFormat } from "@common/formatText";

export default function PropertyMenu(props) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      <div className="custom-container">
        <div className="mobile-filter-toggle-wrapper">
          <div className="mobile-active-filters">
            {props.selectedPropertyType?.title && (
              <span className="mobile-filter-tag">
                {props.selectedPropertyType.title}
                <span
                  className="mobile-filter-tag__close"
                  onClick={() => props.handleRemoveFilters("selectedPropertyType")}
                >×</span>
              </span>
            )}
            {props.selectedLocation?.title && (
              <span className="mobile-filter-tag">
                {props.selectedLocation.title}
                <span
                  className="mobile-filter-tag__close"
                  onClick={() => props.handleRemoveFilters("selectedLocation")}
                >×</span>
              </span>
            )}
            {props.selectedMinBudget && (
              <span className="mobile-filter-tag">
                {props.selectedMinBudget + "-" + props.selectedMaxBudget}
                <span
                  className="mobile-filter-tag__close"
                  onClick={() => props.handleRemoveFilters("selectedMinBudget")}
                >×</span>
              </span>
            )}
            {props.selectedMinArea && (
              <span className="mobile-filter-tag">
                {props.selectedMinArea + "-" + props.selectedMaxArea}
                <span
                  className="mobile-filter-tag__close"
                  onClick={() => props.handleRemoveFilters("selectedMinArea")}
                >×</span>
              </span>
            )}
            {props.selectedPropertyConstructionStatus && (
              <span className="mobile-filter-tag">
                {textFormat(props.selectedPropertyConstructionStatus)}
                <span
                  className="mobile-filter-tag__close"
                  onClick={() => props.handleRemoveFilters("property_construction_status")}
                >×</span>
              </span>
            )}
          </div>
          <button
            className="mobile-filter-toggle-btn"
            onClick={() => setShowMobileFilters((prev) => !prev)}
          >
            <span className="mobile-filter-icon-lines">
              <span></span><span></span><span></span>
            </span>
            {showMobileFilters ? "Hide Filters" : "Select Filters"}
            <span className="mobile-filter-chevron">
              {showMobileFilters ? "▲" : "▼"}
            </span>
          </button>
        </div>
        <div className={`menu-list add-position-absolute${showMobileFilters ? " mobile-filters-visible" : " mobile-filters-hidden"}`}>
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
            {!props.hideConstructionStatus && (
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
      {(props.selectedLocation.title ||
        props.selectedPropertyType.title ||
        props.selectedMinBudget ||
        props.selectedMinArea ||
        props.selectedPropertyConstructionStatus) && (
        <div className="display-flex mb-2 filters-wrapper mt-2 custom-container">
          {props.selectedLocation.title && (
            <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
              {props.selectedLocation.title ? props.selectedLocation.title : ""}
              <img
                className="img-fluid cursor-pointer ml-2"
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
                className="img-fluid cursor-pointer ml-2"
                src="/images/closeSVG.svg"
                alt="close-icon"
                onClick={() =>
                  props.handleRemoveFilters("selectedPropertyType")
                }
              />
            </div>
          )}
          {props.selectedMinBudget && (
            <div className="theme-button theme-primary-btn d-inline-block mr-3 mb-3 mb-sm-0">
              {props.selectedMinBudget
                ? props.selectedMinBudget + "-" + props.selectedMaxBudget
                : ""}
              <img
                className="img-fluid cursor-pointer ml-2"
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
                className="img-fluid cursor-pointer ml-2"
                src="/images/closeSVG.svg"
                alt="close-icon"
                onClick={() => props.handleRemoveFilters("selectedMinArea")}
              />
            </div>
          )}
          {props.selectedPropertyConstructionStatus && (
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
      )}
    </>
  );
}
