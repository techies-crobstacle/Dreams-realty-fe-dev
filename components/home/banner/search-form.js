import React from "react";

export default function BannerForm() {
  return (
    <div className="banner-form">
      <div className="form-group position-relative">
        <input
          type="text"
          placeholder="Search Properties"
          className="form-control position-relative"
          id="search-form"
        />
        <img src="/images/home/banner/search-icon.svg" alt="search-icon" />
        <div className="search-form-elements">
          <button className="banner-btn theme-button theme-primary-btn">
            Search Now
          </button>
        </div>
      </div>
    </div>
  );
}
