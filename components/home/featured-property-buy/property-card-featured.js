"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getValue } from "/utils/lodash";
import Moment from "react-moment";
import Image from "next/image";
import { changeNumberFormat } from "../../../common/ChangeNumberFormat";
import { textFormat } from "../../../common/formatText";
import { useRouter } from "next/router";

const ISSERVER = typeof window === "undefined";

/**
 * @typedef {Object} PropertyCardProps
 * @property {'rent' | 'sale'} type
 * @property {{
 *   slug: string,
 *   title: string,
 *   cover_image: { url: string }
 * }} propertyObj
 * @property {(type: string, id: string) => void} [toggleCta]
 */

export default function Card(props) {
  const { propertyObj, type } = props; // Destructure common props
  const router = useRouter();
  const pathname = router?.asPath || router?.pathname || "";
  const [isLoading, setIsLoading] = useState(true);

  const coverImageUrl = getValue(propertyObj, "cover_image.url")
    ? `${process.env.NEXT_PUBLIC_API_URL}${propertyObj.cover_image.url}`
    : "/default_image_dreams.png";

  const propertyUrl =
    type === "rent"
      ? `/property-for-rent/${propertyObj.slug}`
      : `/property-for-sale/${propertyObj.slug}`;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Split into DetailView and CardView components
  return !ISSERVER && pathname.startsWith("/property-details") ? (
    <DetailView
      url={propertyUrl}
      {...props}
      coverImageUrl={coverImageUrl}
      isLoading={isLoading}
    />
  ) : (
    <CardView
      url={propertyUrl}
      {...props}
      coverImageUrl={coverImageUrl}
      isLoading={isLoading}
    />
  );
}

function DetailView(props) {
  const { url, type, toggleCta } = props;
  return (
    <div className="featured-property-buy-wrapper p-0">
      <div className="featured-property-card">
        <div className="featured-property-card--card-buy position-relative">
          {props.isLoading ? (
            <div className="loading-image"></div>
          ) : (
            <Link href={url}>
              <Image
                src={props.coverImageUrl}
                className="img-fluid featured-property-card__image"
                alt="dream-realty-logo"
                width={100}
                height={214}
                unoptimized={true}
              />
            </Link>
          )}
          {type !== "rent" &&
            props.propertyObj.property_construction_status && (
              <div className="property-badge">
                {textFormat(props.propertyObj.property_construction_status)}
              </div>
            )}
          {props.propertyObj.badge && (
            <div className="property-badge">{props.propertyObj.badge}</div>
          )}

          <div>
            <Link href={url} className="buy-card-details">
              <h3
                className="featured-property-buy-wrapper--title"
                title={props.propertyObj?.title}
              >
                {props.propertyObj?.title}
              </h3>
              
              <h4>By {props.propertyObj.developer.title}</h4>
              <h5>{props.propertyObj.location_area.title}</h5>
              <div className="property-card-features mb-2">
                {(getValue(props, "propertyObj.property_bhks.length") > 0 ||
                  getValue(props, "propertyObj.property_type.title")) && (
                    <div className="py-1">
                      <p>Configurations</p>
                      <span>
                        {getValue(props, "propertyObj.property_bhks.length") >
                          0 ? (
                          <>
                            {getValue(props, "propertyObj.property_bhks", []).map(
                              (item, index, array) =>
                                index < array.length - 1
                                  ? item.title + ", "
                                  : item.title
                            )}
                          </>
                        ) : (
                          `${getValue(
                            props,
                            "propertyObj.property_type.title",
                            ""
                          )}`
                        )}
                      </span>
                    </div>
                  )}
                {props.propertyObj.super_build_up_area_min &&
                  props.propertyObj.super_build_up_area_max &&
                  props.propertyObj.super_build_up_area_min !== 0 &&
                  props.propertyObj.super_build_up_area_min !== "0" &&
                  props.propertyObj.super_build_up_area_max !== 0 &&
                  props.propertyObj.super_build_up_area_max !== "0" && (
                    <div className="py-1">
                      <p>Built Up Area</p>
                      <span>
                        {getValue(
                          props,
                          "propertyObj.super_build_up_area_min",
                          0
                        )}
                        -
                        {getValue(
                          props,
                          "propertyObj.super_build_up_area_max",
                          0
                        )}
                      </span>
                    </div>
                  )}
                {props.propertyObj.available_from && (
                  <div className="py-1">
                    <p>Possession Date</p>
                    <span>
                      <Moment format="MMM DD, YYYY">
                        {props.propertyObj.available_from}
                      </Moment>
                    </span>
                  </div>
                )}
              </div>
              <span className="price ">
                INR{" "}
                {changeNumberFormat(getValue(props, `propertyObj.price`, 0))
                  ? changeNumberFormat(getValue(props, `propertyObj.price`, ""))
                  : "-"}{" "}
                <span className="price_extra">
                  {getValue(props, `propertyObj.price_extra_text`, "")}
                </span>
              </span>
            </Link>
            <div className="px-4 py-4">
              {/* <button
                className="theme-button header-btn theme-primary-btn  w-100"
                style={{ height: "50px" }}
                onClick={() =>
                  toggleCta(type, getValue(props, `propertyObj.id`, ""),)
                }
              >
                Get in touch
              </button> */}
              <button
                className="theme-button header-btn theme-primary-btn  w-100"
                style={{ height: "50px" }}
                onClick={() =>
                  toggleCta(
                    type,
                    getValue(props, `propertyObj.id`, ""),
                    getValue(props, `propertyObj.title`, ""), // Pass title here
                    getValue(props, `propertyObj.property_type.title`, "") // Pass category if needed
                  )
                }
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardView(props) {
  const { url, type, toggleCta } = props;
  return (
    <div className="featured-property-buy-wrapper p-0">
      <div className="featured-property-card">
        <div className="featured-property-card--card-buy position-relative">
          {props.isLoading ? (
            <div className="loading-image"></div>
          ) : (
            <Link href={url}>
              <Image
                src={props.coverImageUrl}
                className="img-fluid featured-property-card__image"
                alt="dream-realty-logo"
                width={100}
                height={214}
                unoptimized={true}
              />
            </Link>
          )}
          {type !== "rent" &&
            props.propertyObj.property_construction_status && (
              <div className="property-badge">
                {textFormat(props.propertyObj.property_construction_status)}
              </div>
            )}
          {props.propertyObj.badge && (
            <div className="property-badge">{props.propertyObj.badge}</div>
          )}

          <div>
            <Link href={url} className="buy-card-details">
              <h3
                className="featured-property-buy-wrapper--title"
                title={props.propertyObj?.title}
              >
                {props.propertyObj?.title}
              </h3>
              <h4>By {props.propertyObj.developer?.title}</h4>
              <h5>{props.propertyObj.location_area?.title}</h5>
              <div className="property-card-features mb-2">
                {(getValue(props, "propertyObj.property_bhks.length") > 0 ||
                  getValue(props, "propertyObj.property_type.title")) && (
                    <div className="py-1">
                      <p>Configurations</p>
                      <span>
                        {getValue(props, "propertyObj.property_bhks.length") >
                          0 ? (
                          <>
                            {getValue(props, "propertyObj.property_bhks", []).map(
                              (item, index, array) =>
                                index < array.length - 1
                                  ? item.title + ", "
                                  : item.title
                            )}
                          </>
                        ) : (
                          `${getValue(
                            props,
                            "propertyObj.property_type.title",
                            ""
                          )}`
                        )}
                      </span>
                    </div>
                  )}
                {props.propertyObj.super_build_up_area_min &&
                  props.propertyObj.super_build_up_area_max &&
                  props.propertyObj.super_build_up_area_min !== 0 &&
                  props.propertyObj.super_build_up_area_min !== "0" &&
                  props.propertyObj.super_build_up_area_max !== 0 &&
                  props.propertyObj.super_build_up_area_max !== "0" && (
                    <div className="py-1">
                      <p>Built Up Area</p>
                      <span>
                        {getValue(
                          props,
                          "propertyObj.super_build_up_area_min",
                          0
                        )}
                        -
                        {getValue(
                          props,
                          "propertyObj.super_build_up_area_max",
                          0
                        )}
                      </span>
                    </div>
                  )}
                {props.propertyObj.available_from && (
                  <div className="py-1">
                    <p>Possession Date</p>
                    <span>
                      <Moment format="MMM DD, YYYY">
                        {props.propertyObj.available_from}
                      </Moment>
                    </span>
                  </div>
                )}
              </div>
              <span className="price ">
                INR{" "}
                {changeNumberFormat(getValue(props, `propertyObj.price`, 0))
                  ? changeNumberFormat(getValue(props, `propertyObj.price`, ""))
                  : "-"}{" "}
                <span className="price_extra">
                  {getValue(props, `propertyObj.price_extra_text`, "")}
                </span>
              </span>
            </Link>
            <div className="px-4 py-4">
              {/* <button
                className="theme-button header-btn theme-primary-btn  w-100"
                style={{ height: "50px" }}
                onClick={() =>
                  toggleCta(type, getValue(props, `propertyObj.id`, ""))
                }
              >
                Get in touch
              </button> */}
              <button
                className="theme-button header-btn theme-primary-btn  w-100"
                style={{ height: "50px" }}
                onClick={() =>
                  toggleCta(
                    type,
                    getValue(props, `propertyObj.id`, ""),
                    getValue(props, `propertyObj.title`, ""), // Pass title here
                    getValue(props, `propertyObj.property_type.title`, "") // Pass category if needed
                  )
                }
              >
                Get in touch
              </button>
              {/* <p>thIS IS cODE</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
