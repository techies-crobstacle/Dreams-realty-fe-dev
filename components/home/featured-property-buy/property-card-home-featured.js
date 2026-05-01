import { changeNumberFormat } from "../../../common/ChangeNumberFormat";
import { textFormat } from "../../../common/formatText";
import Link from "next/link";
import React from "react";
import { getValue } from "/utils/lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Moment from "react-moment";

const ISSERVER = typeof window === "undefined";

export default function FeaturedCard(props) {
  return !ISSERVER &&
    (window.location.pathname.split("/")[1] === "property-details" ||
      window.location.pathname.split("/")[1] === "property-details-rent") ? (
    <Link
      href={
        props.type === "rent"
          ? `/property-for-rent/${props.propertyObj.slug}/${props.type}`
          : `/property-for-sale/${props.propertyObj.slug}/${props.type}`
      }
      className="featured-property-buy-wrapper p-0"
      target="_blank"
    >
      <div className="featured-property-card">
        <div className="featured-property-card--card-buy position-relative">
          {getValue(props, "propertyObj.images.length", []) > 0 ? (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              loop={true}
              navigation={true}
              autoplay={{ delay: 3000 }}
              modules={[Autoplay, Navigation, Pagination]}
              className="inner-swiper-container"
            >
              {getValue(props, "propertyObj.images", []).map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={
                      getValue(item, "url")
                        ? process.env.NEXT_PUBLIC_API_URL +
                          getValue(item, "url", "")
                        : "/default_image_dreams.png"
                    }
                    className="img-fluid featured-property-card__image"
                    alt={
                      getValue(props, "propertyObj.title.length", 0) > 24
                        ? `${props.propertyObj?.title.slice(0, 24)}...`
                        : props.propertyObj?.title
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="/default_image_dreams.png"
              className="img-fluid featured-property-card__image"
              alt="dream-realty-logo"
            />
          )}
          {props.type !== "rent" &&
            getValue(props, "propertyObj.property_construction_status", "") && (
              <div className="property-badge">
                {textFormat(
                  getValue(
                    props,
                    "propertyObj.property_construction_status",
                    ""
                  )
                )}
              </div>
            )}
          {props.propertyObj.badge ? (
            <div className="property-badge">{props.propertyObj.badge}</div>
          ) : (
            ""
          )}
          <div className="buy-card-details"> 
            <h3
              className="featured-property-buy-wrapper--title"
              title={props.propertyObj?.title}
            >
              {getValue(props, `propertyObj.title.length`, 0) > 24
                ? `${props.propertyObj?.title.slice(0, 24)}...`
                : props.propertyObj?.title}
            </h3>
            <h4>By {getValue(props, "propertyObj.developer.title", "-")}</h4>
            <h5>{getValue(props, `propertyObj.location_area.title`, "-")}</h5>
            <div className="property-card-features mb-2">
              <div className="py-1">
                <p>Configurations</p>
                <span>
                  {getValue(props, "propertyObj.property_bhks.length") === 0 ? (
                    `${getValue(props, "propertyObj.property_type.title", "")}`
                  ) : (
                    <>
                      {getValue(props, "propertyObj.property_bhks", []).map(
                        (item, index, array) =>
                          index < array.length - 1
                            ? item.title + ", "
                            : item.title
                      )}
                    </>
                  )}
                </span>
              </div>
              {props.propertyObj.build_up_area && (
                <div className="py-1">
                  <p>Built Up Area</p>
                  <span>{props.propertyObj.build_up_area}</span>
                </div>
              )}
              {props.propertyObj.available_from && (
                <div className="py-1">
                  <p>Possession Date</p>
                  <span>
                    <Moment format="MMM DD, YYYY">
                      {getValue(props, "propertyObj.available_from", "")}
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
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <Link
      href={
        props.type === "rent"
          ? `/property-for-rent/${props.propertyObj.slug}/${props.type}`
          : `/property-for-sale/${props.propertyObj.slug}/${props.type}`
      }
      className="featured-property-buy-wrapper p-0"
      target="__blank"
    >
      <div className="featured-property-card">
        <div className="featured-property-card--card-buy position-relative">
          {getValue(props, "propertyObj.images.length", []) > 0 ? (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              loop={true}
              navigation={true}
              autoplay={{ delay: 1000 }}
              // modules={[Autoplay, Navigation, Pagination]}
              className="inner-swiper-container"
            >
              {getValue(props, "propertyObj.images", []).map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={
                      getValue(item, "url")
                        ? process.env.NEXT_PUBLIC_API_URL +
                          getValue(item, "url", "")
                        : "/default_image_dreams.png"
                    }
                    className="img-fluid featured-property-card__image"
                    alt={
                      getValue(props, "propertyObj.title.length", 0) > 24
                        ? `${props.propertyObj?.title.slice(0, 24)}...`
                        : props.propertyObj?.title
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="/default_image_dreams.png"
              className="img-fluid featured-property-card__image"
              alt="dream-realty-logo"
            />
          )}
          {/* <img
            src={
              getValue(props, "propertyObj.cover_image.url")
                ? process.env.NEXT_PUBLIC_API_URL +
                  getValue(props, "propertyObj.cover_image.url")
                : "/default_image_dreams.png"
            }
            className="img-fluid featured-property-card__image"
            alt="dream-realty-logo"
          /> */}
          {props.type !== "rent" &&
            getValue(props, "propertyObj.property_construction_status", "") && (
              <div className="property-badge">
                {textFormat(
                  getValue(
                    props,
                    "propertyObj.property_construction_status",
                    ""
                  )
                )}
              </div>
            )}
          {props.propertyObj.badge ? (
            <div className="property-badge">{props.propertyObj.badge}</div>
          ) : (
            ""
          )}
          <div className="buy-card-details">
            <h3
              className="featured-property-buy-wrapper--title"
              title={props.propertyObj?.title}
            >
              {getValue(props, `propertyObj.title.length`, 0) > 24
                ? `${props.propertyObj?.title.slice(0, 24)}...`
                : props.propertyObj?.title}
            </h3>
            <h4>By {getValue(props, "propertyObj.developer.title", "-")}</h4>
            <h5>{getValue(props, `propertyObj.location_area.title`, "-")}</h5>
            <div className="property-card-features mb-2">
              {getValue(props, "propertyObj.property_bhks.length") > 0 && (
                <div className="py-1">
                  <p>Configurations</p>
                  <span>
                    {getValue(props, "propertyObj.property_bhks.length") > 0 ? (
                      `${getValue(
                        props,
                        "propertyObj.property_type.title",
                        ""
                      )}`
                    ) : (
                      <>
                        {getValue(props, "propertyObj.property_bhks", []).map(
                          (item, index, array) =>
                            index < array.length - 1
                              ? item.title + ", "
                              : item.title
                        )}
                      </>
                    )}
                  </span>
                </div>
              )}
              {props.propertyObj.build_up_area && (
                <div className="py-1">
                  <p>Built Up Area</p>
                  <span>{props.propertyObj.build_up_area}</span>
                </div>
              )}
              {props.propertyObj.available_from && (
                <div className="py-1">
                  <p>Possession Date</p>
                  <span>
                    <Moment format="MMM DD, YYYY">
                      {getValue(props, "propertyObj.available_from", "")}
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
          </div>
        </div>
      </div>
    </Link>
  );
}
