import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { getValue } from "/utils/lodash";

export default function StatusFilter(props) {
	return (
		<Dropdown isOpen={props.dropdownOpen} toggle={props.toggle}>
			<DropdownToggle caret>
				{props.selectedPropertyConstructionStatus
					? (getValue(props, "propertyTypeList", []).find(
							(item) => item.value === props.selectedPropertyConstructionStatus
					  ) || {}).label || "Select Status"
					: "Select Status"}
			</DropdownToggle>
			<DropdownMenu left>
				<div className="custom-dropdown-content-wrapper">
					<div className="d-flex dropdown-section-property justify-content-between">
						<p className="proprety-type">Select Status</p>
					</div>
					<div className="select-property">
						{getValue(props, "propertyTypeList", []).map((tempObj, index) => {
							return (
								<div
									className="d-flex align-items-center property-type "
									key={`location${index}`}
								>
									<input
										type="radio"
										id={`${tempObj.id}`}
										name={tempObj.title}
										checked={
											props.selectedPropertyConstructionStatus
												? props.selectedPropertyConstructionStatus ===
												  tempObj.value
												: false
										}
										className="dimention cursor-pointer"
										onChange={() =>
											props.handleChangePropertyStatus(tempObj.value)
										}
									></input>
									<label
										htmlFor={`${tempObj.value}`}
										className="mb-0 all-property cursor-pointer"
										onClick={() =>
											props.handleChangePropertyStatus(tempObj.value)
										}
									>
										{tempObj.label}
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
