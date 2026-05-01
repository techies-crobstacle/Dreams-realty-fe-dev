import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { getValue } from "/utils/lodash";

export default function Bangalore(props) {
  const [checked, setChecked] = useState(false);
  const handleChange = (checked) => {
    setChecked(checked);
  };
  // select property type
  const [allPropertyArray] = useState([
    { name: "Villa Homes", id: 1 },
    { name: "Standalone Homes", id: 2 },
    { name: "Flats/Apartments", id: 3 },
    { name: "Plots", id: 4 },
    { name: "Office Space", id: 5 }
  ]);
  return (
    <Dropdown isOpen={props.dropdownOpen} toggle={props.toggle}>
      <DropdownToggle caret>{getValue(props, `selectedPropertyType.title`, '') ? getValue(props, `selectedPropertyType.title`, '') : 'All Properties'}</DropdownToggle>
      <DropdownMenu left>
        <div className="custom-dropdown-content-wrapper">
          <div className="d-flex dropdown-section-property justify-content-between">
            <p className="proprety-type">Select Property Type</p>
          </div>
          <div className="select-property">
            {getValue(props, 'propertyTypeList', []).map((tempObj, index) => {
              return (
                <div className="d-flex align-items-center property-type " key={`location${index}`}>
                  <input
                    type="radio"
                    id={`${tempObj.id}`}
                    name={tempObj.title}
                    checked={props.selectedPropertyType && props.selectedPropertyType ? props.selectedPropertyType.id === tempObj.id : false}
                    className="dimention cursor-pointer"
                    onChange={() => props.handleChangePropertyType(tempObj)}
                  ></input>
                  <label htmlFor={`${tempObj.id}`} className="mb-0 all-property cursor-pointer">
                    {tempObj.title}
                  </label>
                </div>
              );
            })}
          </div>
          {/* <div className="dropdown-btn text-right pt-3 pb-3 pr-3">
            <button className="theme-button theme-white-btn mr-3">
              Cancel
            </button>
            <button className="theme-button theme-white-btn">Done</button>
          </div> */}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
