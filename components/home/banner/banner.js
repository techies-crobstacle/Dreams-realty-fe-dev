"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { getValue } from "/utils/lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { changeNumberFormat } from "../../../common/ChangeNumberFormat";
import Image from "next/image";
import { MdVilla } from "react-icons/md";
import { MdApartment } from "react-icons/md";
import { PiIslandFill } from "react-icons/pi";
import { PiFarmFill } from "react-icons/pi";
import { HiMiniBuildingOffice } from "react-icons/hi2";

const LoadingBanner = dynamic(() =>
  import("@components/home/banner/banner-loading.js")
);

// Extract these to a separate constants file
const PROPERTY_ICONS = {
  "villa-homes": MdVilla,
  apartments: MdApartment,
  plots: PiIslandFill,
  farmland: PiFarmFill,
  default: HiMiniBuildingOffice,
};

// Extract SearchResults into a separate component
const SearchResults = ({ mainSearchSuggestionList, activeTab }) => {
  if (!mainSearchSuggestionList?.length) {
    return (
      <div className="property-search-result__not-found">
        <h6>No Records Found…</h6>
      </div>
    );
  }

  return mainSearchSuggestionList.map((list) => (
    <Link
      key={list.slug}
      href={`/property-for-${activeTab === "1" ? "sale" : "rent"}/${list.slug}`}
    >
      <li className="d-flex align-items-center justify-content-between">
        <div className="property-search-result d-flex align-items-center gap-2">
          <img
            src="/images/generic-icons/header-property-icon.svg"
            className="img-fluid"
            alt="building-icon"
          />
          <div className="property-search-result--meta ml-3">
            <h6 className="property-name"> {getValue(list, `title`, "")}</h6>
            <small>
              {getValue(list, `locality.name`, "")}{" "}
              {getValue(list, `city.title`, "")}
            </small>
          </div>
        </div>
        <h6 className="price">
          {changeNumberFormat(getValue(list, `price`, ""))
            ? changeNumberFormat(getValue(list, `price`, ""))
            : ""}{" "}
          {getValue(list, `price_extra_text`, "")}
          {/* Onwards */}
        </h6>
      </li>
    </Link>
  ));
};

export default function Banner({
  isBannerLoading,
  banners,
  activeTab,
  handleChangeTab,
  propertyTypeList,
  handlePropertyTypeChange,
  selectedOption,
  mainSearchInput,
  handleChangeMainSearch,
  mainSearchLoading,
  mainSearchSuggestionList,
  mainSearchSubmit,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("All");

  const handleOptionClick = (value, title) => {
    handlePropertyTypeChange({ target: { value } });
    setSelectedTitle(title);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const formatOption = (option) => {
    if (!option) return "Select Property Type";
    return option
      .split("-") // Replace hyphens with spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" ");
  };

  const getPropertyIcon = (slug) => {
    const IconComponent = PROPERTY_ICONS[slug] || PROPERTY_ICONS.default;
    return <IconComponent />;
  };

  const handleStickyButtonClick = (event) => {
    event.preventDefault();
    router.replace("/list-step1");
  };
//testing
  return (
    <section className="banner-wrapper">
      <div className="banner-container position-relative">
        <div className="banner-floating-btn">
          <Link
            href="/list-step1"
            className="banner-floating-btn__link"
            onClick={handleStickyButtonClick}
          >
            Buy / Sell Property
          </Link>
        </div>
        {isBannerLoading ? (
          <LoadingBanner />
        ) : (
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            effect="fade"
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {banners
              ?.sort((a, b) => (b.is_home ? 1 : 0) - (a.is_home ? 1 : 0))
              .map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        getValue(
                          item,
                          `banner.url`,
                          "/images/home/banner/home-banner-2.webp"
                        )
                      }
                      className="w-100 img-fluid banner-images"
                      height="375"
                      width={100}
                      alt="modern-hotel-with-people-and-trees"
                      priority={true}
                      quality={30}
                      unoptimized={true}
                    />
                    <div className="banner-title text-center">
                      <span className="home-banner-heading">
                        {getValue(item, "title", "")}
                      </span>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}

        <div className="banner-details">
          <div className="banner-links">
            <ul>
              <li>
                <a
                  href="#0"
                  className={
                    activeTab === "1"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleChangeTab("1")}
                >
                  Properties to Buy
                </a>
              </li>
              <li>
                <a
                  href="#0"
                  className={
                    activeTab === "2"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleChangeTab("2")}
                >
                  Properties to Rent
                </a>
              </li>
            </ul>
          </div>
          <div className="banner-form">
            <div className="form-group form-group-banner pb-2 d-flex align-items-center gap-2">
              <div className="position-relative">
                <select
                  name="types"
                  id="types"
                  onChange={handlePropertyTypeChange}
                  className="form-control custom-select"
                  value={selectedOption}
                  style={{ display: "none" }}
                >
                  {propertyTypeList?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.title}
                    </option>
                  ))}
                </select>
                <div className="custom-select-box" onClick={toggleDropdown}>
                  {getPropertyIcon(selectedTitle)}
                  {formatOption(selectedTitle) === "Villa Homes"
                    ? "Villas"
                    : formatOption(selectedTitle) || "Select Property Type"}
                </div>

                {isOpen && (
                  <div className="custom-options">
                    {/* "All" Option */}
                    <div
                      className="custom-option"
                      onClick={() => handleOptionClick("all", "All")}
                    >
                      <HiMiniBuildingOffice />
                      All
                    </div>

                    {/* Dynamic Property Type Options */}
                    {propertyTypeList?.map((type) => (
                      <div
                        key={type.id}
                        className="custom-option"
                        onClick={() => handleOptionClick(type.id, type.slug)}
                      >
                        {getPropertyIcon(type.slug)}
                        {type.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Search Properties"
                  className="form-control position-relative banner-form-control"
                  id="search-form"
                  onChange={(e) => handleChangeMainSearch(e)}
                  value={mainSearchInput}
                />
                <img
                  src="/images/home/banner/search-icon.svg"
                  alt="search-icon"
                  className="banner-search-icon"
                />
                {mainSearchLoading && mainSearchInput ? (
                  <div className="header-wrapper--search-bar__search-results">
                    <ul>
                      <li className="d-flex align-items-center justify-content-between">
                        <div className="property-search-result d-flex align-items-center">
                          Loading...
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : mainSearchInput && mainSearchSuggestionList?.length > 0 ? (
                  <div className="header-wrapper--search-bar__search-results">
                    <ul>
                      <SearchResults
                        mainSearchSuggestionList={mainSearchSuggestionList}
                        activeTab={activeTab}
                      />
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="search-form-elements">
                <button
                  className="banner-btn theme-button theme-primary-btn"
                  onClick={mainSearchSubmit}
                >
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
