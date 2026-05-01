import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getValue } from "/utils/lodash";

export default function ListStepTab2(props) {
  const {
    loading,
    propertyTypeList,
    handleRequest,
    property_type,
    isLoading,
    handleSubmit,
  } = props;
  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h3>
          Select Your Listing and Property Type{" "}
          <span style={{ color: "red" }}>*</span>
        </h3>
        <div className="form-container mt-3">
          {loading ? (
            <p className="text-center mt-2">Please wait...</p>
          ) : (
            <div className="row">
              {getValue(props, `propertyTypeList`, []).map((item, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <div className="form-group">
                      <label
                        className={`radio-css ${
                          item.id === property_type ? "active" : ""
                        }`}
                        htmlFor={getValue(item, "title", "")}
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => handleRequest(item.id)}
                        >
                          <h4>{getValue(item, "title", "")}</h4>
                        </div>
                        <input
                          type="radio"
                          id={getValue(item, "title", "")}
                          name="checked"
                          checked={item.id === property_type}
                          onChange={() => handleRequest(item.id)}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-4 mb-5 d-flex gap-3 flex-wrap">
            <button
              className="theme-button theme-secondary-btn mr-3"
              onClick={() => handleSubmit(1)}
            >
              Back
            </button>
            {isLoading ? (
              <button className="theme-button theme-primary-btn mr-3">
                Please wait...
              </button>
            ) : (
              <button
                className="theme-button theme-primary-btn mr-3"
                onClick={() => handleSubmit(3, "tab3")}
              >
                Next
              </button>
            )}
            <Link href="/">
              <button className="theme-button theme-secondary-btn mr-0">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
