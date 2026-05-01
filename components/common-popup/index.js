import React from "react";
import { getValue } from "/utils/lodash";

export default function PropertyPopup(props) {
  return (
    <div
      className={
        props.showPopup
          ? "popup-wrapper popup-wrapper--active"
          : "popup-wrapper"
      }
    >
      <div className="popup-wrapper__popup">
        <div className="d-flex justify-content-between popup-wrapper__popup-border align-items-start">
          <div>
            <h5 className="popup-wrapper__title">{props.popupTitle}</h5>
            <p className="popup-wrapper__text">
              Our support team will contact you for your interest
            </p>
          </div>
          <img
            src="/images/closeSVG.svg"
            className="img-fluid cursor-pointer"
            onClick={() => props.hidePopup()}
            alt="close-icon"
          />
        </div>
        <div className="popup-wrapper__form">
          <div className="popup-wrapper__form-group">
            <label htmlFor="person-name" className="popup-wrapper__label">
              Name *
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name='name'
              value={getValue(props, 'request.name', '')}
              onChange={props.handleChange}
              id="person-name"
              className="form-control popup-wrapper__input"
            />
          </div>
          <div className="popup-wrapper__form-group">
            <label htmlFor="person-number" className="popup-wrapper__label">
              Mobile Number *
            </label>
            <input
              type="text"
              name='phone'
              value={getValue(props, 'request.phone', '')}
              onChange={props.handleChange}
              placeholder="Enter Mobile Number"
              id="person-number"
              className="form-control popup-wrapper__input"
            />
          </div>
        </div>
        {props.isLoading ?
          <button className="popup-wrapper__button">Please wait...</button>
          :
          <button className="popup-wrapper__button" onClick={props.handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}
