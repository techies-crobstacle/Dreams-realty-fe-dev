import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { getValue } from "/utils/lodash";

export default function Bangalore(props) {

  const [checked, setChecked] = useState(false);
  const handleChange = (checked) => {
    setChecked(checked);
  };
  // locations info Bangalore
  const [locationArray] = useState([
    { name: "Bangalore-North" },
    { name: "Bangalore-South" },
    { name: "Bangalore-West" },
    { name: "Bangalore-East" },
  ]);
  return (
    <Dropdown isOpen={props.dropdownOpen} toggle={props.toggle}>
      <DropdownToggle caret>{getValue(props, `selectedLocation.title`, '') ? getValue(props, `selectedLocation.title`, '') : 'Select Location'}</DropdownToggle>
      <DropdownMenu left={true.toString()}>
        <div className="custom-dropdown-content-wrapper-location">
          <div className="search-input position-relative">
            <input
              type="text"
              placeholder="Enter the location"
              className="custom-input form-control"
              value={getValue(props, 'citySearchInput', '')}
              onChange={(e) => props.getCityLocationAfterSearch(e, getValue(props, `citiesList[0].id`, ''))}
            ></input>
            <div className="position-absolute location-image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#444F60"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
              </svg>
            </div>
          </div>
          <div className="d-flex dropdown-section-location align-items-start">
            <img
              src="/images/dropdown/important-label.svg"
              className="img-fluid mr-4"
              alt="mark-important-icon"
            />
            <p className="banglore-location">
              Now you can enter locality or region (like Bangalore North) 
              {/* or
              Project or Builder */}
            </p>
          </div>
          <div className="select-location">
            {
              props.locationLoading ? 'Please wait...' :
                getValue(props, 'cityLocationList', []).map((tempObj, index) => {
                  return (
                    <div
                      className={`d-flex align-items-center location-name ${tempObj.title === props.selectedLocation.title ? 'active' : ''}`}
                      key={`location${index}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#5F6368"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
                      </svg>
                      <p className="location cursor-pointer " onClick={() => props.onclickOfLocation(tempObj)}> {tempObj.title} </p>
                    </div>
                  );
                })}
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
