import React, { useState } from "react";

export default function FilterProperties(props) {
  const [filtersObj] = useState({
    BHK: [
      { name: "01", value: "1", checked: false },
      { name: "02", value: "2", checked: false },
      { name: "03", value: "3", checked: false },
      { name: "04", value: "4", checked: false },
      { name: "More than 5", value: "5", checked: false },
    ],
    Furnishing: [
      { name: "Furnished", value: "furnished", checked: false },
      { name: "Semi-furnished", value: "semi_furnished", checked: false },
      { name: "Unfurnished", value: "unfurnished", checked: false },
    ],
    Facing: [
      { name: "East", value: "east", checked: false },
      { name: "North", value: "north", checked: false },
      { name: "West", value: "west", checked: false },
      { name: "North - East", value: "north_east", checked: false },
      { name: "North - West", value: "north_west", checked: false },
      { name: "South - East", value: "south_east", checked: false },
      { name: "South - West", value: "south_west", checked: false },
    ],
  });
  const filtersHeading = Object.keys(props.filtersObj);
  return (
    <div
      className={
        props.showHideFiltersPopup
          ? "filter-properties-popup-wrapper active"
          : "filter-properties-popup-wrapper"
      }
    >
      <div className="form-wrapper">
        <div className="form-wrapper--header d-flex align-items-center justify-content-between flex-direction-column-mobile">
          <h6 className="normal-font mb-3 mb-sm-0">More Filters</h6>
          <div className="form-wrapper--header--cta">
            <ul>
              <li>
                <a className="cursor-pointer" onClick={props.clearFilters}>
                  Clear all filters
                </a>
              </li>
              <li>
                <button
                  className="theme-button theme-primary-btn"
                  onClick={props.handleSubmitFilter}
                >
                  Done
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="form-wrapper--body-wrapper">
          {filtersHeading.map((individualObj, index) => {
            return (
              <div key={index} className="filter-wrapper">
                <h5 className="normal-font mb-1">{individualObj}</h5>
                <ul>
                  {props.filtersObj[individualObj].map((filterItems, index) => {
                    return (
                      <li key={index}>
                        <input
                          type="radio"
                          id={individualObj + index}
                          name={individualObj}
                          value={filterItems}
                          className="filter-radio-button"
                          checked={filterItems.checked}
                        />
                        <label
                          className="mb-0"
                          htmlFor={individualObj + index}
                          onClick={() =>
                            props.onChangeFilterPopup(
                              filterItems,
                              individualObj,
                              index,
                              !filterItems.checked
                            )
                          }
                        >
                          {filterItems.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
