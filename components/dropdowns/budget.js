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
        //   title: "5 Lac",
        //   value: 500000,
        // },
        // {
        //   title: "10 Lac",
        //   value: 1000000,
        // },
        {
          title: "0",
          value: 0,
        },
        {
          title: "20 Lac",
          value: 2000000,
        },
        {
          title: "50 Lac",
          value: 5000000,
        },
        {
          title: "75 Lac",
          value: 7500000,
        },
        {
          title: "1 Cr",
          value: 10000000,
        },
        {
          title: "1.5 Cr",
          value: 15000000,
        },
        {
          title: "2 Cr",
          value: 20000000,
        },
        {
          title: "3 Cr",
          value: 30000000,
        },
        {
          title: "4 Cr",
          value: 40000000,
        },
        {
          title: "5 Cr",
          value: 50000000,
        },
        {
          title: "6 Cr",
          value: 60000000,
        },
        {
          title: "7 Cr",
          value: 70000000,
        },
        {
          title: "8 Cr",
          value: 80000000,
        },
        {
          title: "9 Cr",
          value: 90000000,
        },
        {
          title: "10 Cr",
          value: 100000000,
        },
        {
          title: "12.5 Cr",
          value: 125000000,
        },
        {
          title: "20 Cr",
          value: 200000000,
        },
        {
          title: "25 Cr",
          value: 250000000,
        },
        {
          title: "30 Cr",
          value: 300000000,
        },
        {
          title: "40 Cr",
          value: 400000000,
        },
        {
          title: "50 Cr",
          value: 500000000,
        },
        {
          title: "60 Cr",
          value: 600000000,
        },
        // {
        //   title: '70 Cr',
        //   value: 700000000
        // },
        // {
        //   title: '80 Cr',
        //   value: 800000000
        // },
        // {
        //   title: '90 Cr',
        //   value: 900000000
        // },
        {
          title: "100 Cr",
          value: 1000000000,
        },
      ],
      minMaxBudgetForRent: [
        // {
        //   title: "5000",
        //   value: 5000,
        // },
        // {
        //   title: "10000",
        //   value: 10000,
        // },
        // {
        //   title: "15000",
        //   value: 15000,
        // },
        // {
        //   title: "20000",
        //   value: 20000,
        // },
        {
          title: "0",
          value: 0,
        },
        {
          title: "25000",
          value: 25000,
        },
        {
          title: "30000",
          value: 30000,
        },
        {
          title: "35000",
          value: 35000,
        },
        {
          title: "40000",
          value: 40000,
        },
        {
          title: "50000",
          value: 50000,
        },
        {
          title: "60000",
          value: 60000,
        },
        {
          title: "85000",
          value: 85000,
        },
        {
          title: "1 Lac",
          value: 100000,
        },
        {
          title: "1.5 Lac",
          value: 150000,
        },
        {
          title: "2 Lac",
          value: 200000,
        },
        {
          title: "4 Lac",
          value: 400000,
        },
        {
          title: "7 Lac",
          value: 700000,
        },
        {
          title: "10 Lac",
          value: 1000000,
        },
        {
          title: "20 Lac",
          value: 2000000,
        },
        {
          title: "40 Lac",
          value: 4000000,
        },
        {
          title: "80 Lac",
          value: 8000000,
        },
        {
          title: "1 Cr",
          value: 10000000,
        },
        {
          title: "1.5 Cr",
          value: 15000000,
        },
        {
          title: "2 Cr",
          value: 20000000,
        },
        {
          title: "3 Cr",
          value: 30000000,
        },
        {
          title: "4 Cr",
          value: 40000000,
        },
        {
          title: "5 Cr",
          value: 50000000,
        },
        {
          title: "6 Cr",
          value: 60000000,
        },
        {
          title: "7 Cr",
          value: 70000000,
        },
        {
          title: "8 Cr",
          value: 80000000,
        },
        {
          title: "9 Cr",
          value: 90000000,
        },
        {
          title: "10 Cr",
          value: 100000000,
        },
        {
          title: "12.5 Cr",
          value: 125000000,
        },
        {
          title: "20 Cr",
          value: 200000000,
        },
      ],
      minBudget: null,
      maxBudget: null,
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
    document.querySelector(".min-value-text-box_js").value = amount;
    this.setState({
      minBudget: amount,
    });
  };
  setMaxBudget = (e) => {
    const amount = e.target.value;
    document.querySelector(".max-value-text-box_js").value = amount;
    this.setState({
      maxBudget: amount,
    });
  };
  updateMinBudgetState = (e) => {
    const amount = e.target.value;
    this.setState({
      minBudget: amount,
    });
  };
  updateMaxBudgetState = (e) => {
    const amount = e.target.value;
    this.setState({
      maxBudget: amount,
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
  render() {
    return (
      <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggle}>
        {getValue(this.props, "selectedMinBudget", "") ||
        getValue(this.props, "selectedMaxBudget", "") ? (
          <DropdownToggle caret>
            {getValue(this.props, "selectedMinBudget", "-") +
              "-" +
              getValue(this.props, "selectedMaxBudget", "-")}
          </DropdownToggle>
        ) : (
          <DropdownToggle caret>Select Budget</DropdownToggle>
        )}
        <DropdownMenu left>
          <div className="property-dropdown position-relative mb-0">
            <div className="property-dropdown--options ">
              <h6 className="light-font">Select Your Budget</h6>
              <div className="property-dropdown--options--min-max-range d-flex">
                <input
                  type="text"
                  placeholder="Min"
                  name="minBudget"
                  onChange={this.props.handleChangeBudget}
                  onBlur={this.updateMinBudgetState}
                  className="form-control flex-1 mr-2 min-value-text-box_js"
                  data-budget-type="Min"
                  onFocus={this.getBudgetType}
                />
                <input
                  type="text"
                  placeholder="Max"
                  name="maxBudget"
                  onChange={this.props.handleChangeBudget}
                  onBlur={this.updateMaxBudgetState}
                  className="form-control flex-1 max-value-text-box_js"
                  data-budget-type="Max"
                  onFocus={this.getBudgetType}
                />
              </div>
              <div className="min-max-budget-values d-flex pb-3">
                <div className="flex-1">
                  {this.state.budgetType === "Min" ? (
                    <ul className="pr-0 disable-overflow">
                      <li key="min">
                        <input
                          type="radio"
                          className="hidden-radio-button min-budget_js"
                          name="min-budget"
                          value=""
                          id="minBudgetInitialValue"
                          onChange={this.setMinBudget}
                        />
                        <label
                          htmlFor="minBudgetInitialValue"
                          className="mb-0 ml-0 w-100"
                        >
                          Min
                        </label>
                      </li>
                      {this.props.type === "sale"
                        ? this.state.minMaxBudget.map((budgetObj, index) => {
                            return (
                              <>
                                <li key={index}>
                                  <input
                                    type="radio"
                                    className="hidden-radio-button min-budget_js"
                                    name="min-budget"
                                    value={budgetObj.value}
                                    id={"minBudget" + index}
                                    onChange={this.setMinBudget}
                                  />
                                  <label
                                    htmlFor={"minBudget" + index}
                                    className="mb-0 ml-0 w-100"
                                  >
                                    <span className="light-font">₹</span>{" "}
                                    {budgetObj.title}
                                  </label>
                                </li>
                              </>
                            );
                          })
                        : this.state.minMaxBudgetForRent.map(
                            (budgetObj, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    <input
                                      type="radio"
                                      className="hidden-radio-button min-budget_js"
                                      name="min-budget"
                                      value={budgetObj.value}
                                      id={"minBudget" + index}
                                      onChange={this.setMinBudget}
                                    />
                                    <label
                                      htmlFor={"minBudget" + index}
                                      className="mb-0 ml-0 w-100"
                                    >
                                      <span className="light-font">₹</span>{" "}
                                      {budgetObj.title}
                                    </label>
                                  </li>
                                </>
                              );
                            }
                          )}
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
                          id="maxBudgetInitialValue"
                          onChange={this.setMaxBudget}
                        />
                        <label
                          htmlFor="maxBudgetInitialValue"
                          className="mb-0 ml-0 w-100"
                        >
                          Max
                        </label>
                      </li>
                      {this.props.type === "sale"
                        ? this.state.minMaxBudget.map((budgetObj, index) => {
                            return (
                              <>
                                {budgetObj.value > this.state.minBudget ? (
                                  <li key={index}>
                                    <input
                                      type="radio"
                                      className="hidden-radio-button max-budget_js"
                                      name="max-budget"
                                      value={budgetObj.value}
                                      id={"maxBudget" + index}
                                      onChange={this.setMaxBudget}
                                    />
                                    <label
                                      htmlFor={"maxBudget" + index}
                                      className="mb-0 ml-0 w-100"
                                    >
                                      <span className="light-font">₹</span>{" "}
                                      {budgetObj.title}
                                    </label>
                                  </li>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })
                        : this.state.minMaxBudgetForRent.map(
                            (budgetObj, index) => {
                              return (
                                <>
                                  {budgetObj.value > this.state.minBudget ? (
                                    <li key={index}>
                                      <input
                                        type="radio"
                                        className="hidden-radio-button max-budget_js"
                                        name="max-budget"
                                        value={budgetObj.value}
                                        id={"maxBudget" + index}
                                        onChange={this.setMaxBudget}
                                      />
                                      <label
                                        htmlFor={"maxBudget" + index}
                                        className="mb-0 ml-0 w-100"
                                      >
                                        <span className="light-font">₹</span>{" "}
                                        {budgetObj.title}
                                      </label>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            }
                          )}
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
                  onClick={() => this.props.handleSubmitBudget(this.state)}
                  disabled={
                    this.state.maxBudget && this.state.minBudget ? false : true
                  }
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
