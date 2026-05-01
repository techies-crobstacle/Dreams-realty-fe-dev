"use client";

import React from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@components/layout.js"));
const Testimonials = dynamic(() =>
  import("@components/home/testimonials/index.js")
);

export default function PropertyListing() {
  return (
    <Layout>
      <div className="position-relative">
        <section className="property-listing-wrapper">
          <div className="custom-container">
            <h1 className="text-center">
              Sell or Rent Your Property,
              <br />
              We’ve 7 Lac buyers and tenants for you!
            </h1>
          </div>
          <Testimonials buttonChange={true} />
        </section>
      </div>
    </Layout>
  );
}
