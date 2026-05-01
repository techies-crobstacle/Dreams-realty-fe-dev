import React from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Link from "next/link";
import Meta from "../seo-meta";
import { fetchFaq } from "@services/APIs/common.service";
import DynamicBreadcrumb from "@components/breadcrumbs";

const Layout = dynamic(() => import("@components/layout.js"));
const PreviousPage = dynamic(() => import("@components/previous-page"));
const Review = dynamic(() => import("@components/home/reviews/index.js"));
const Accordian = dynamic(
  () => import("@components/about-us/accordian/index.js"),
);

export default function AboutUs({ reviews, faqList }) {
  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "About Us" }];

  return (
    <>
      <Meta
        title="About Dreams Realty | Trusted Real Estate Experts in Bangalore"
        description="Learn about Dreams Realty, a trusted real estate partner in Bangalore. Explore our mission, values, and commitment to helping you buy, sell, or rent easily."
        keywords="Best real estate agents in Bangalore | Best realtor in Bangalore for luxury homes | Most trusted realtor in Bangalore | Trusted property dealers in Bangalore"
      />
      <Layout>
        <div className="about-us-banner position-relative">
          <img
            src="/images/about-us/banner-about-image.webp"
            className="img-fluid about-banner-img"
            alt="collage-of-buildings-and-rooms"
          />
          <div className="custom-container">
            <h3>About Us</h3>
          </div>
        </div>
        <div className="about-us-wrapper">
          <div className="custom-container">
            {/* <div className="d-flex align-items-center mb-4">
              <PreviousPage isCompact={false} />
              <div style={{ marginLeft: "30px" }}>
              </div>
            </div> */}
            <DynamicBreadcrumb items={breadcrumbItems} />
            <div className="about-us-wrapper--title">
              <h1
                className="mb-3"
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "500",
                  lineHeight: "inherit",
                }}
              >
                Real estate: Where your home dreams come true
              </h1>
              <br />
              <h2>Own Your Dreams.</h2>
              <br />
              <p>
                We are a new age real estate advisory, brokerage and investment
                firm based out in East of Bengaluru primarily dealing with
                luxurious villas and apartments.Our clients include Top
                Developers, Potential home buyers of top-notch IT Professionals
                & NRIs, Sellers and Investors in the Bengaluru market.Our team
                of local market experts advise our clients on their real estate
                transactions leading to exceptional customer experience for
                them.
              </p>
              <br />
              <h2>Our Vision</h2>
              <br />
              <p>We help you find your Dream Home</p>
              <br />
              <p>
                We believe in transparent and hassle-free deals with our
                customers, providing end to end services from villa/ apartment
                search to the happiness of ownership.We at Dreams Realty offer
                customers with properties best in the market by understanding
                customer needs and requirements.In addition to it we also
                provide services in Home Loans, Legal and Documents Works,
                Interior Designing & Property Management.
              </p>
              <br />
              <h2>What do we do?</h2>
              <br />
              <ul style={{ paddingLeft: "1.5rem" }} className="space-y-2">
                <li style={{ listStyleType: "disc", display: "list-item" }}>
                  Buy / Sell Property
                </li>
                <li style={{ listStyleType: "disc", display: "list-item" }}>
                  Understand, Valuate & Search
                </li>
                <li style={{ listStyleType: "disc", display: "list-item" }}>
                  Detail, Compare & Consult
                </li>
                <li style={{ listStyleType: "disc", display: "list-item" }}>
                  Visit, Virtual Tour & Feedback
                </li>
                <li style={{ listStyleType: "disc", display: "list-item" }}>
                  Negotiate, Documentation & Legal Assistance
                </li>
                <li style={{ listStyleType: "disc", display: "list-item" }}>
                  Interior Designing & Property Management
                </li>
              </ul>
            </div>
            <div className="about-us-wrapper--body">
              <div className="about-us-card">
                <img
                  src="/images/about-us/img1.webp"
                  className="img-fluid dimention-card"
                  alt="house-with-lights-on"
                />
                <h4>Comprehensive & Verified Properties</h4>
              </div>
              <div className="about-us-card">
                <img
                  src="/images/about-us/img2.webp"
                  className="img-fluid dimention-card"
                  alt="commercial-building"
                />
                <h4>Exhaustive search options for both renting and buying</h4>
              </div>
              <div className="about-us-card">
                <img
                  src="/images/about-us/img3.webp"
                  className="img-fluid dimention-card"
                  alt="commercial-building-with-white-color"
                />
                <h4>Providing solutions for 15 Years in Bangalore</h4>
              </div>
            </div>
            <div className="about-us-wrapper--footer">
              <div className="about-us-btn text-center">
                <Link href="/">
                  <button className="theme-button theme-primary-btn">
                    Explore Now
                  </button>
                </Link>
                <Link href="/contact-us">
                  <button className="theme-button theme-secondary-btn mr-0">
                    Contact us
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {reviews.length > 0 && <Review reviews={reviews} />}
          {faqList && (
            <div className="custom-container">
              <Accordian faqList={faqList} />
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const url = `${process.env.GOOGLE_API_URL}/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&language=en&reviews_sort=rating&key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const faqResponse = await fetchFaq();
    const faqList = getValue(faqResponse, "data", {});

    return {
      props: {
        reviews: data.result?.reviews || [],
        faqList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        reviews: [],
        faqList: {},
        error: "Failed to fetch data",
      },
    };
  }
}
