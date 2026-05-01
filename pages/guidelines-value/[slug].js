"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Moment from "react-moment";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchGuidanceValues } from "@services/APIs/common.service";
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";
import Head from "next/head";

const Layout = dynamic(() => import("@components/layout.js"));

export default function valuePage(props) {
  const [guideline, setGuideline] = useState({});
  const [blogLoading, setBlogLoading] = useState(false);
  useEffect(() => {
    getSpecificGuidelineValue(props.slug);
  }, []);

  const getSpecificGuidelineValue = async (slug) => {
    try {
      setBlogLoading(true);
      let where = {
        "filters[slug][$eq]": slug,
      };
      let resp = await fetchGuidanceValues(where);
      if (resp) {
        setBlogLoading(false);
        setGuideline(getValue(resp, "data[0]", {}));
      } else {
        setBlogLoading(false);
      }
    } catch (error) {
      setBlogLoading(false);
    }
  };

  const [showSharePopup, toogleSharePopup] = useState(false);
  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Link copied to clipboard");
  };
  const redirectToWhatsApp = () => {
    if (detectMobileDevice()) {
      window.location.href = `whatsapp://send?text=${
        typeof window !== "undefined" && window.location.href
      }`;
    } else {
      window.location.href = `https://web.whatsapp.com/send?text=${
        typeof window !== "undefined" && window.location.href
      }`;
    }
  };
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Guidelines Value", link: "/guidelines-value" },
    { label: getValue(guideline, "title", "") },
  ];
  return (
    <>
      <Head>
        <title>
          {props.meta_title
            ? props.meta_title
            : "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"}
        </title>
        <meta
          property="og:title"
          content={
            props.meta_title
              ? props.meta_title
              : "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
          }
        />
        {/* <meta
                name="description"
                content={`${metaDescription}Helloo`}
              /> */}
        <meta
          name="description"
          content={
            props.meta_description
              ? props.meta_description
              : "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          }
        />
        <meta name="keywords" content={props.keywords ? props.keywords : ""} />
        <meta
          property="og:url"
          content={typeof window !== "undefined" && window.location.href}
        />
        {/* <meta
              property="og:description"
              content={getValue(
                props,
                "meta_description",
                "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
              )}
            /> */}
        <meta
          property="og:image"
          content={getValue(
            props,
            "meta_image",
            "backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
          )}
        />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertyStructuredData),
          }}
        /> */}

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        {blogLoading ? (
          <p className="text-center mt-2">Please wait...</p>
        ) : (
          <section className="blog-wrapper">
            <div className="d-flex align-items-center mb-4">
              <PreviousPage isCompact={false} />
              <div style={{  marginLeft: "30px" }}>
                <DynamicBreadcrumb items={breadcrumbItems} />
              </div>
            </div>
            <div className="container">
              <div className="blog-wrapper--title">
                <p>Guidance Value</p>
                <h4 className="blog-name-guidelines">
                  {getValue(guideline, "title", "")}
                </h4>
                <div className="blog-release-date">
                  <ul className="d-flex align-items-center">
                    <li>
                      {
                        <Moment format="MMM DD, YYYY">
                          {getValue(guideline, "createdAt", "")}
                        </Moment>
                      }
                    </li>
                    <li className="dot"></li>
                    <li>6 Mins read</li>
                    <li className="dot"></li>
                    <li
                      className="d-flex align-items-center cursor-pointer"
                      onClick={() => toogleSharePopup(!showSharePopup)}
                    >
                      <img
                        src="/images/guidelines/share-icon.svg"
                        className="img-fluid mr-2"
                        alt="share-icon"
                      />
                      Share
                    </li>
                  </ul>
                </div>
                {getValue(guideline, "main_image.mime", "").includes("image") &&
                  getValue(guideline, `main_image.url`, "") && (
                    <div className="d-flex align-items-center justify-content-center mt-4 mb-5">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          getValue(guideline, `main_image.url`, "")
                        }
                        className="img-fluid"
                        alt={getValue(guideline, "title", "")}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          maxWidth: "940px",
                          maxHeight: "500px",
                        }}
                      />
                    </div>
                  )}
              </div>
              <div className="blog-wrapper--description">
                <div>
                  {getValue(guideline, "guidance_values", []).map((item) => {
                    return (
                      <>
                        <div className="values-title">
                          <h4 className="latest-title">
                            {getValue(item, `title`, "")}
                          </h4>
                        </div>
                        <div className="values-text">
                          <p
                            className="latest-text"
                            dangerouslySetInnerHTML={{
                              __html: getValue(item, `content`, ""),
                            }}
                          ></p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className={
                showSharePopup
                  ? "share-review-popup active"
                  : "share-review-popup"
              }
            >
              <div className="share-review-popup-wrapper">
                <div className="share-review-popup-wrapper__header d-flex align-items-center justify-content-between">
                  <h2
                    className="share-review-popup-wrapper__title"
                    onClick={() => toogleSharePopup(!showSharePopup)}
                  >
                    Share
                  </h2>
                  <img
                    src="/images/closeSVG.svg"
                    className="img-fluid cursor-pointer"
                    onClick={() => {
                      toogleSharePopup(false);
                    }}
                    alt="close-icon"
                  />
                </div>
                <div className="share-review-popup-wrapper__body">
                  <div className="share-review-popup-wrapper__icons ">
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        redirectToWhatsApp();
                      }}
                      target="_blank"
                    >
                      <img
                        src="/images/rewars-share-icons/whatsapp.png"
                        className="img-fluid"
                        alt="whatsapp-icon"
                      />
                      <p
                        rel="nofollow noopener"
                        className="share-review-popup-wrapper__text"
                        target="_blank"
                      >
                        Whatsapp
                      </p>
                    </a>
                  </div>
                  <div className="share-review-popup-wrapper__icons">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${
                        typeof window !== "undefined" && window.location.href
                      }`}
                      target="_blank"
                    >
                      <img
                        src="/images/rewars-share-icons/facebook.png"
                        className="img-fluid"
                        target="_blank"
                        alt="facebook-icon"
                      />
                      <p className="share-review-popup-wrapper__text">
                        Facebook
                      </p>
                    </a>
                  </div>
                  <div className="share-review-popup-wrapper__icons">
                    <a
                      href={`http://twitter.com/share?url=${
                        typeof window !== "undefined" && window.location.href
                      }`}
                      target="_blank"
                    >
                      <img
                        src="/images/rewars-share-icons/twitter.png"
                        className="img-fluid share-review-popup-wrapper__img-border"
                        alt="twitter-icon"
                      />
                      <p className="share-review-popup-wrapper__text">
                        Twitter
                      </p>
                    </a>
                  </div>

                  <div className="share-review-popup-wrapper__icons">
                    <a
                      href={`https://www.linkedin.com/feed/`}
                      target="_blank"
                      onClick={() =>
                        copyToClipboard(
                          `${
                            typeof window !== "undefined" &&
                            window.location.href
                          }`
                        )
                      }
                    >
                      <img
                        src="/images/rewars-share-icons/linkedin.png"
                        className="img-fluid share-review-popup-wrapper__img-border"
                        alt="linkedin-icon"
                      />
                      <p className="share-review-popup-wrapper__text">
                        Linkedin
                      </p>
                    </a>
                  </div>
                  <div className="share-review-popup-wrapper__icons">
                    <a
                      target="_blank"
                      href={`mailto:?subject=&body=${
                        typeof window !== "undefined" && window.location.href
                      }`}
                    >
                      <img
                        src="/images/rewars-share-icons/email.png"
                        className="img-fluid share-review-popup-wrapper__img-border"
                        alt="email-icon"
                      />
                      <p className="share-review-popup-wrapper__text">Email</p>
                    </a>
                  </div>

                  <div className="share-review-popup-wrapper__icons">
                    <a
                      href={`https://www.instagram.com/`}
                      target="_blank"
                      onClick={() =>
                        copyToClipboard(
                          `${
                            typeof window !== "undefined" &&
                            window.location.href
                          }`
                        )
                      }
                    >
                      <img
                        src="/images/rewars-share-icons/instagram.png"
                        className="img-fluid"
                        alt="instagram-icon"
                      />
                      <p className="share-review-popup-wrapper__text">
                        Instagram
                      </p>
                    </a>
                  </div>
                </div>
                <div
                  className="share-review-popup-wrapper__footer d-flex align-items-center justify-content-between"
                  onClick={() =>
                    copyToClipboard(
                      `${typeof window !== "undefined" && window.location.href}`
                    )
                  }
                >
                  <a>{typeof window !== "undefined" && window.location.href}</a>
                  <img
                    src="/images/copySVG.svg"
                    className="img-fluid cursor-pointer"
                    alt="clipboard-icon"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps({ query }) {
  const slug = query.slug;

  let resp;
  try {
    let where = {
      "filters[slug][$eq]": slug,
    };
    resp = await fetchGuidanceValues(where);
  } catch (error) {
    resp = { data: [] };
  }

  const guideline = resp?.data?.[0] || {};
  const meta_title = guideline?.meta_title || "";
  const meta_description = guideline?.meta_description || "";
  const keywords = guideline?.keywords || "";
  const meta_image = guideline?.main_image?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${guideline.main_image.url}`
    : "";

  return {
    props: {
      slug,
      meta_title,
      meta_description,
      meta_image,
      keywords,
    },
  };
}
