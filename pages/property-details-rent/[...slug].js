"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import Head from "next/head";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Layout = dynamic(() => import("@components/layout.js"));
const PropertyHeader = dynamic(() =>
  import("@components/property-details/header.js")
);
const PropertyHighlights = dynamic(() =>
  import("@components/property-details/property-highlights.js")
);
const About = dynamic(() => import("@components/property-details/about.js"));
const Aminites = dynamic(() =>
  import("@components/property-details/aminities.js")
);
const Contact = dynamic(() =>
  import("@components/property-details/contact-us.js")
);
const PropertySlider = dynamic(() =>
  import("@components/property-details/image-slider-popup.js")
);
const PropertyCard = dynamic(() =>
  import("@components/home/featured-property-buy/property-card-featured.js")
);
const PropertyDetailsLoading = dynamic(() =>
  import("@components/property-details/loading")
);
const PreviousPage = dynamic(() => import("@components/previous-page"));
const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));

import {
  fetchRentProperties,
  postCreateSalePropertyEnquiry,
  postCreateRentPropertyEnquiry,
} from "@services/APIs/common.service";

export default function PropertyDetails(props) {
  const params = useParams();
  const type = params.slug[1];
  const slug = params.slug[0];

  // share popup
  const [showSharePopup, toogleSharePopup] = useState(false);

  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [isContactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    if (type === "rent") {
      getRentData();
    } else {
      getSalesData();
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState({});

  const getRentData = async () => {
    try {
      let where = {
        "filters[slug][$eq]": slug,
      };
      setIsLoading(true);
      let resp = await fetchRentProperties(where);
      if (resp) {
        setPropertyInfo(getValue(resp, "data[0]", {}));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getSalesData = async () => {
    try {
      setIsLoading(true);
      let resp = await fetchRentProperties(slug);
      if (resp) {
        setPropertyInfo(getValue(resp, "salePropertyBySlug", {}));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    } else {
      if (type === "rent") {
        try {
          setContactLoading(true);
          let data = {
            data: {
              name: request.name,
              phone: "+91" + request.phone,
              comment: request.comment,
              rent_property: getValue(propertyInfo, `id`, ""),
            },
          };
          let resp = await postCreateRentPropertyEnquiry(data);
          if (resp) {
            toast.success(getValue(resp, "message", "Updated successfully"));
            setContactLoading(false);
            setRequest({
              ...request,
              name: "",
              phone: "",
              comment: "",
            });
            simpleValidator.current.hideMessages();
            forceUpdate(0);
          } else {
            setContactLoading(false);
          }
        } catch (error) {
          setContactLoading(false);
        }
      } else {
        try {
          setContactLoading(true);
          let data = {
            data: {
              name: request.name,
              phone: "+91" + request.phone,
              comment: request.comment,
              sale_property: getValue(propertyInfo, `id`, ""),
            },
          };
          let resp = await postCreateSalePropertyEnquiry(data);
          if (resp) {
            toast.success(getValue(resp, "message", "Updated successfully"));
            setContactLoading(false);
            setRequest({
              ...request,
              name: "",
              phone: "",
              comment: "",
            });
            simpleValidator.current.hideMessages();
            forceUpdate(0);
          } else {
            setContactLoading(false);
          }
        } catch (error) {
          setContactLoading(false);
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  // share popup stuff
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
  const detectMobileDevice = () => {
    if (typeof window) {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }
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
    { label: "Properties for Rent", link: "/property-for-rent" },
    { label: propertyInfo.title },
  ];

  return (
    <>
      <Head>
        <title>
          {getValue(
            props,
            "meta_title",
            "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
          )}
        </title>
        <meta
          property="og:title"
          content={getValue(
            props,
            "meta_title",
            "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
          )}
        />
        <meta
          name="description"
          content={getValue(
            props,
            "meta_description",
            "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          )}
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" && window.location.href}
        />
        <meta
          property="og:description"
          content={getValue(
            props,
            "meta_description",
            "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          )}
        />
        <meta
          property="og:image"
          content={getValue(
            props,
            "meta_image",
            "backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
          )}
        />
      </Head>
      <Layout>
        {isLoading ? (
          <PropertyDetailsLoading />
        ) : (
          <>
            <PropertySlider images={getValue(propertyInfo, `images`, [])} />
            <section className="property-details-wrapper">
              <div className="property-details-container">
                <div className="d-flex align-items-center mb-4">
                  <PreviousPage isCompact={false} />
                  <div style={{  marginLeft: "30px" }}>
                    <DynamicBreadcrumb items={breadcrumbItems} />
                  </div>
                </div>

                <div className="property-details-wrapper--body d-flex flex-direction-column-mobile">
                  <div>
                    <PropertyHeader
                      showPopup={showSharePopup}
                      toogleSharePopup={toogleSharePopup}
                      hideSharePopup={() => {
                        toogleSharePopup(false);
                      }}
                      propertyInfo={propertyInfo}
                      type={type}
                    />
                    <div className="property-details-wrapper--body--information w-100 mt-3">
                      {getValue(propertyInfo, "bathrooms") !== "0" ||
                      getValue(propertyInfo, "approved_by") ||
                      getValue(propertyInfo, "brochure") ||
                      getValue(propertyInfo, "brokerage_details") ||
                      getValue(propertyInfo, "brokerage_charges") ||
                      getValue(propertyInfo, "carpet_area") !== "0" ||
                      getValue(propertyInfo, "carpet_area_max") !== "0" ||
                      getValue(propertyInfo, "carpet_area_min") !== "0" ||
                      getValue(propertyInfo, "development_size") ||
                      getValue(propertyInfo, "facing") ||
                      getValue(propertyInfo, "floor_type") ||
                      getValue(propertyInfo, "furnishing") ||
                      getValue(propertyInfo, "monthly_maintenance") ||
                      getValue(propertyInfo, "plot_area") !== "0" ||
                      getValue(propertyInfo, "plot_area_max") !== "0" ||
                      getValue(propertyInfo, "plot_area_min") !== "0" ||
                      getValue(propertyInfo, "plot_length") !== "0" ||
                      getValue(propertyInfo, "plot_breath") !== "0" ||
                      getValue(propertyInfo, "pooja_room") ||
                      getValue(propertyInfo, "property_on_floor") ||
                      getValue(propertyInfo, "property_rera") ||
                      getValue(propertyInfo, "reserved_parking") ||
                      getValue(propertyInfo, "servant_accommodation") ||
                      getValue(propertyInfo, "security_amount") ||
                      getValue(
                        propertyInfo,
                        "separate_entery_for_servent_room"
                      ) ||
                      getValue(propertyInfo, "store_room") ||
                      getValue(propertyInfo, "study_room") ||
                      getValue(propertyInfo, "super_build_up_area") !== "0" ||
                      getValue(propertyInfo, "super_build_up_area_max") !==
                        "0" ||
                      getValue(propertyInfo, "super_build_up_area_min") !==
                        "0" ||
                      getValue(propertyInfo, "total_floor") !== "0" ||
                      getValue(propertyInfo, "total_units") !== "0" ||
                      getValue(propertyInfo, "water_supply") ? (
                        <PropertyHighlights
                          propertyInfo={propertyInfo}
                          type={"rent"}
                        />
                      ) : (
                        ""
                      )}
                      {getValue(propertyInfo, "about") ? (
                        <About propertyInfo={propertyInfo} />
                      ) : (
                        ""
                      )}
                      {getValue(propertyInfo, "amenities.length", 0) > 0 ? (
                        <Aminites propertyInfo={propertyInfo} />
                      ) : (
                        ""
                      )}
                      {/* <UnitPlan
                propertyInfo={propertyInfo}
              />
              <Neighbourhood
                propertyInfo={propertyInfo}
              />
              <GroupBuy />
              <Video
                propertyInfo={propertyInfo}
              /> */}
                    </div>
                  </div>
                  <Contact
                    request={request}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    validator={simpleValidator}
                    isContactLoading={isContactLoading}
                  />
                </div>
              </div>
              {getValue(propertyInfo, `rent_availabilities.length`) > 0 && (
                <>
                  <div className="property-details-wrapper--similar-properties">
                    <div className="custom-container">
                      <h3 className="mb-4 text-center">
                        More Rent Availability at{" "}
                        {getValue(propertyInfo, "title", "")}
                      </h3>
                      <div className="position-relative">
                        <div className="property-banners-wraper--slider-controls">
                          <img
                            src="/images/property-details/slider/controls/prev.svg"
                            className="img-fluid cursor-pointer position-absolute property-banners-wraper--slider-controls--left property-banners-wraper--slider-control-left"
                            alt="arrow-left-icon"
                          />
                          <img
                            src="/images/property-details/slider/controls/next.svg"
                            className="img-fluid cursor-pointer position-absolute property-banners-wraper--slider-controls--right property-banners-wraper--slider-control-next"
                            alt="arrow-right-icon"
                          />
                        </div>
                        <div className="swiper-container unit-availability-slider_js">
                          <div className="swiper-wrapper">
                            {getValue(
                              propertyInfo,
                              `rent_availabilities`,
                              []
                            ).map((item, index) => {
                              return (
                                <div className="swiper-slide property-card-wrapper--max-width mr-4">
                                  <PropertyCard
                                    key={`similar-properties-${index}`}
                                    propertyObj={item}
                                    type={type}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {/* <div className="view-all-cta mt-5">
                <button className="theme-button theme-secondary-btn">
                  Show all Properties
                </button>
              </div> */}
                    </div>
                  </div>
                </>
              )}

              {getValue(propertyInfo, `similar_properties.length`) > 0 && (
                <>
                  <div className="property-details-wrapper--similar-properties">
                    <div className="custom-container">
                      <h3 className="mb-4 text-center">Similar Properties</h3>
                      <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={3}
                        autoplay={{
                          delay: 3000,
                        }}
                        navigation={true}
                        breakpoints={{
                          320: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                          },
                          480: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                          },
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                          },
                          767: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                          },
                          992: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                          },
                          1200: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                          },
                        }}
                        className="outer-swiper-container py-2"
                      >
                        {getValue(propertyInfo, `similar_properties`, []).map(
                          (item, index1) => {
                            return (
                              <SwiperSlide key={`similar-properties-${index1}`}>
                                <PropertyCard propertyObj={item} type={type} />
                              </SwiperSlide>
                            );
                          }
                        )}
                      </Swiper>
                    </div>
                  </div>
                </>
              )}
            </section>
            {/* <SharePopup
						showPopup={showSharePopup}
						hideSharePopup={() => {
							toogleSharePopup(false);
						}}
						slug={getValue(props, "slug")}
						title={getValue(props, "meta_title", "")}
						description={getValue(props, "meta_description", "")}
						image={getValue(props, "meta_image", "")}
					/> */}
            {/* share popup section */}
            <div
              className={
                showSharePopup
                  ? "share-review-popup active"
                  : "share-review-popup"
              }
            >
              <div className="share-review-popup-wrapper">
                <div className="share-review-popup-wrapper__header d-flex align-items-center justify-content-between">
                  <h2 className="share-review-popup-wrapper__title">Share</h2>
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
          </>
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps({ query }) {
  const slug = query.slug[0];
  const type = query.slug[1];
  let resp = await fetchRentProperties();

  const property = resp?.data?.[0];
  const meta_title = property?.title || "";
  const meta_description = property?.meta_description || "";
  const meta_image = `${process.env.NEXT_PUBLIC_API_URL}${
    property?.cover_image?.url || ""
  }`;

  return {
    props: {
      slug,
      type,
      meta_title,
      meta_description,
      meta_image,
    },
  };
}
