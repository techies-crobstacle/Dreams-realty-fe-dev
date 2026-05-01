"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components
const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const PreviousPage = dynamic(() => import("@components/previous-page"));

export default function PropertyLinks(props) {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Search Properties",
      link: "/search-properties?developer=611377c978b33d968a53025a&page=0&type=1",
    },
  ];

  return (
    <section className="property-for-sale-wrapper">
      {/* <div className="d-flex align-items-center">
        <PreviousPage isCompact={false} />
        <div style={{ marginLeft: "30px" }}>
        </div>
      </div> */}
          <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="custom-container">
        <h1 style={{ fontSize: "2rem", fontWeight: "500" }}>
          Exploring Dreams Realty: Craft your home with us
        </h1>
        <div className="property-for-sale-wrapper--banner-links">
          <ul>
            <li>
              <a
                className={
                  props.activeTab === "1"
                    ? "active cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => props.handleChangeTab("1")}
              >
                Properties to Buy
              </a>
            </li>
            <li>
              <a
                className={
                  props.activeTab === "2"
                    ? "active cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => props.handleChangeTab("2")}
              >
                Properties to Rent
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
