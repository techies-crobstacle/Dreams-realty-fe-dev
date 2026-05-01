import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import { getValue } from "/utils/lodash";

export default class SearchPropertiesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetType: "Min",
      dropdownOpen: false,
      selectedLocation: [],
      selectedProperty: [],
      selectedCity: [],
      minMaxBudget: [
        // {
        //   title: "100",
        //   value: 100,
        // },
        // {
        //   title: "200",
        //   value: 200,
        // },
        // {
        //   title: "300",
        //   value: 300,
        // },
        {
          title: "0",
          value: 0,
        },
        {
          title: "500",
          value: 500,
        },
        {
          title: "1000",
          value: 1000,
        },
        {
          title: "1500",
          value: 1500,
        },
        {
          title: "2000",
          value: 2000,
        },
        {
          title: "3000",
          value: 3000,
        },
        {
          title: "4000",
          value: 4000,
        },
        {
          title: "5000",
          value: 5000,
        },
        {
          title: "6000",
          value: 6000,
        },
        {
          title: "7000",
          value: 7000,
        },
        {
          title: "8000",
          value: 8000,
        },
        {
          title: "9000",
          value: 9000,
        },
        {
          title: "10000",
          value: 10000,
        },
        {
          title: "15000",
          value: 15000,
        },
        {
          title: "20000",
          value: 20000,
        },
      ],
      minArea: null,
      maxArea: null,
      locationPropertyTypeMaping: { text: "name", value: "id" },
    };
  }
  getBudgetType = (e) => {
    e.target.setAttribute("autocomplete", "off");
    this.setState({
      budgetType: e.target.getAttribute("data-budget-type"),
    });
  };
  setMinBudget = (e) => {
    const amount = e.target.value;
    document.querySelector(".min-area-text-box_js").value = amount;
    this.setState({
      minArea: amount,
    });
  };
  setMaxBudget = (e) => {
    const amount = e.target.value;
    document.querySelector(".max-area-text-box_js").value = amount;
    this.setState({
      maxArea: amount,
    });
  };
  updateMinBudgetState = (e) => {
    const amount = e.target.value;
    this.setState({
      minArea: amount,
    });
  };
  updateMaxBudgetState = (e) => {
    const amount = e.target.value;
    this.setState({
      maxArea: amount,
    });
  };
  handleChangeSelect = (value, path) => {
    this.setState({
      [path]: value,
    });
  };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  handleSubmitArea = async () => {
    this.props.handleSubmitArea(this.state);
  };
  render() {
    return (
      <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggle}>
        {getValue(this.props, "selectedMinArea", "") ||
        getValue(this.props, "selectedMaxArea", "") ? (
          <DropdownToggle caret>
            {getValue(this.props, "selectedMinArea", "-") +
              "-" +
              getValue(this.props, "selectedMaxArea", "-")}
          </DropdownToggle>
        ) : (
          <DropdownToggle caret>Select Area</DropdownToggle>
        )}
        <DropdownMenu left>
          <div className="property-dropdown position-relative mb-0">
            <div className="property-dropdown--options ">
              <h6 className="light-font">Select Your sqft</h6>
              <div className="property-dropdown--options--min-max-range d-flex">
                <input
                  type="text"
                  placeholder="Min"
                  name="minArea"
                  onChange={this.props.handleChangeBudget}
                  onBlur={this.updateMinBudgetState}
                  className="form-control flex-1 mr-2 min-area-text-box_js"
                  data-budget-type="Min"
                  onFocus={this.getBudgetType}
                />
                <input
                  type="text"
                  placeholder="Max"
                  name="maxArea"
                  onChange={this.props.handleChangeBudget}
                  onBlur={this.updateMaxBudgetState}
                  className="form-control flex-1 max-area-text-box_js"
                  data-budget-type="Max"
                  onFocus={this.getBudgetType}
                />
              </div>
              <div className="min-max-budget-values d-flex pb-3">
                <div className="flex-1">
                  {this.state.budgetType === "Min" ? (
                    <ul className="pr-0 disable-overflow">
                      <li>
                        <input
                          type="radio"
                          className="hidden-radio-button min-budget_js"
                          name="min-budget"
                          value=""
                          id="minBudgetInitialValue1"
                          onChange={this.setMinBudget}
                        />
                        <label
                          htmlFor="minBudgetInitialValue1"
                          className="mb-0 ml-0 w-100"
                        >
                          Min
                        </label>
                      </li>
                      {this.state.minMaxBudget.map((budgetObj, index) => {
                        return (
                          <>
                            <li key={index}>
                              <input
                                type="radio"
                                className="hidden-radio-button min-budget_js"
                                name="min-budget"
                                value={budgetObj.value}
                                id={"minArea" + index}
                                onChange={this.setMinBudget}
                              />
                              <label
                                htmlFor={"minArea" + index}
                                className="mb-0 ml-0 w-100"
                              >
                                <span className="light-font"></span>{" "}
                                {budgetObj.title}
                              </label>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex-1">
                  {this.state.budgetType === "Max" ? (
                    <ul className="pl-0">
                      <li>
                        <input
                          type="radio"
                          className="hidden-radio-button max-budget_js"
                          name="max-budget"
                          value=""
                          id="maxBudgetInitialValueArea"
                          onChange={this.setMaxBudget}
                        />
                        <label
                          htmlFor="maxBudgetInitialValueArea"
                          className="mb-0 ml-0 w-100"
                        >
                          Max
                        </label>
                      </li>
                      {this.state.minMaxBudget.map((budgetObj, index) => {
                        return (
                          <>
                            {budgetObj.value > this.state.minArea ? (
                              <li key={index}>
                                <input
                                  type="radio"
                                  className="hidden-radio-button max-budget_js"
                                  name="max-budget"
                                  value={budgetObj.value}
                                  id={"maxArea" + index}
                                  onChange={this.setMaxBudget}
                                />
                                <label
                                  htmlFor={"maxArea" + index}
                                  className="mb-0 ml-0 w-100"
                                >
                                  <span className="light-font"></span>{" "}
                                  {budgetObj.title}
                                </label>
                              </li>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="cta-dropdown-buttons text-right mr-4 d-flex justify-content-end gap-3 me-4">
                <button
                  className="cta-dropdown-buttons--btn mr-4"
                  onClick={this.props.toggle}
                >
                  Cancel
                </button>
                <button
                  className="cta-dropdown-buttons--btn"
                  onClick={this.handleSubmitArea}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
