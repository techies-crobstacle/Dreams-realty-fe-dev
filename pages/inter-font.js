import React from "react";
import Banner from "@components/home/banner/banner.js";
import PropertyListed from "@components/home/property-listed/index.js";
import Testimonials from "@components/home/testimonials/index.js";
import FeaturedPropertyBuy from "@components/home/featured-property-buy/index.js";
import FeaturedPropertyRent from "@components/home/featured-property-rent/index.js";
import Partners from "@components/home/our-partners/index.js";
import Bank from "@components/home/our-bank/index.js";
import Search from "@components/home/unique-properties/index.js";
import CustomerReview from "@components/home/reviews/index.js";
import Layout from "@components/layout.js";

export default function Home() {
  return (
    <Layout>
      <Banner />
      <PropertyListed />
      <Testimonials />
      <FeaturedPropertyBuy />
      <FeaturedPropertyRent />
      {/* <Search /> */}
      <Partners />
      <Bank />
      <CustomerReview />
    </Layout>
  );
}
