"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getValue } from "/utils/lodash";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import Head from "next/head";
import emailjs from "@emailjs/browser";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  fetchRentProperties,
  postCreateRentPropertyEnquiry,
} from "@services/APIs/common.service";
import { useRouter } from "next/navigation";
import PropertyCard from "../../components/home/featured-property-buy/property-card-featured";
import { isValidPhoneNumber } from "libphonenumber-js";

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
const UnitPlan = dynamic(() =>
  import("@components/property-details/unit-plan.js")
);
const Neighbourhood = dynamic(() =>
  import("@components/property-details/neighbourhood.js")
);
const Video = dynamic(() =>
  import("@components/property-details/video-section.js")
);
const GroupBuy = dynamic(() =>
  import("@components/property-details/group-buy.js")
);
const Contact = dynamic(() =>
  import("@components/property-details/contact-us.js")
);
const PropertySlider = dynamic(() =>
  import("@components/property-details/image-slider-popup.js")
);
const PropertyDetailsLoading = dynamic(() =>
  import("@components/property-details/loading/index.js")
);
const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const PreviousPage = dynamic(() => import("@components/previous-page"));

// EmailJS Configuration - KEEP ORIGINAL
const EMAILJS_SERVICE_ID = "service_e67pkv9";
const EMAILJS_TEMPLATE_ID = "template_7qmbrk7";
const EMAILJS_PUBLIC_KEY = "q9Fr2zJMwV3ooiPQP";

function PropertyDetails(props) {
  const router = useRouter();

  // share popup
  const [showSharePopup, toogleSharePopup] = useState(false);

  const [unitPlansBkhs, setUnitPlanBhks] = useState([]);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [, forceUpdate] = useState(0);

  // Initialize request state with category - KEEP ORIGINAL
  const [request, setRequest] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
    category: "rent", // Using category instead of property_type
  });

  const [isContactLoading, setContactLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState({});

  // --- Hydration fix: Store current URL after mount ---
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // --- useEffect should depend on props.slug ---
  useEffect(() => {
    if (props.slug) {
      getRentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.slug]);

  const handleFilterBHKS = (id) => {
    setSelectedPlan(id);
    let plans = getValue(propertyInfo, "unit_plans", []).filter(
      (item) => getValue(item, `property_bhk.id`, "") === id
    );
    setUnitPlanBhks(plans);
  };
  const handleFilterAllBHKS = (id) => {
    setSelectedPlan(id);
    setUnitPlanBhks(getValue(propertyInfo, "unit_plans", []));
  };
  const handleFilterMasterPlanBHKS = (id) => {
    setSelectedPlan(id);
    let plans = getValue(propertyInfo, "unit_plans", []).filter(
      (item) => item.is_master_plan
    );
    setUnitPlanBhks(plans);
  };

  const getRentData = async () => {
    try {
      let where = {
        "filters[slug][$eq]": props.slug,
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

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        phone: {
          message: "Please enter a valid phone number",
          rule: (val, params, validator) => {
            try {
              if (!val) return false;
              // Remove spaces and any other non-digit characters except +
              const cleanedValue = val.replace(/[^\d+]/g, "");
              return isValidPhoneNumber(cleanedValue);
            } catch (error) {
              return false;
            }
          },
        },
      },
    })
  );

  // Add this function to validate phone independently
  const validatePhone = (phoneValue) => {
    if (!phoneValue) {
      setPhoneError("Phone number is required");
      return false;
    } else if (!isValidPhoneNumber(phoneValue)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const [phoneError, setPhoneError] = useState("");

  
  
  // ✅ KEEP ORIGINAL EMAIL FUNCTION - This was working!
  const sendEmailNotification = async (formData) => {
    try {
      // Helper to ensure values are strings
      const sanitizeValue = (val) => {
        if (val === undefined || val === null) return "";
        return String(val);
      };

      // ✅ ORIGINAL template params that were working
      const templateParams = {
        from_name: sanitizeValue(formData.name),
        from_email: sanitizeValue(formData.email),
        phone: sanitizeValue(formData.phone),
        message: sanitizeValue(formData.comment),
        category: "rent", // Using category instead of property_type
        listing_type: "For Rent", // More readable format
        property_name: sanitizeValue(getValue(propertyInfo, "title", "")),
        property_id: sanitizeValue(getValue(propertyInfo, "id", "")),
      };

      // Debug log to verify parameters
      console.debug("EmailJS parameters:", templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", response);
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    // First, trigger validation for all fields
    const formValid = simpleValidator.current.allValid();

    // Explicitly validate phone
    const isPhoneValid = validatePhone(request.phone);

    if (!formValid || !isPhoneValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      return;
    } else {
      try {
        setContactLoading(true);

        // ✅ FIXED: Proper data structure for Strapi (without propertyName, without category)
        let data = {
          data: {
            name: request.name,
            phone: request.phone, // Already has country code
            email: request.email,
            comment: request.comment,
            rent_property: getValue(propertyInfo, `id`, ""), // Relation field
          },
        };

        // Debug log
        console.debug("Submitting to Strapi:", data);

        // ✅ Send to Strapi API
        let resp = await postCreateRentPropertyEnquiry(data);

        // ✅ Send email notification via EmailJS (ORIGINAL WORKING VERSION)
        const emailSent = await sendEmailNotification({
          name: request.name,
          phone: request.phone,
          email: request.email,
          comment: request.comment,
        });

        if (resp) {
          if (emailSent) {
            toast.success(
              "Enquiry submitted successfully! You will receive a confirmation email."
            );
          } else {
            toast.success(getValue(resp, "message", "Updated successfully"));
            toast.info(
              "Email notification could not be sent, but your enquiry was saved."
            );
          }

          setContactLoading(false);
          // Reset form while preserving category
          setRequest({
            name: "",
            phone: "",
            email: "",
            comment: "",
            category: "rent", // Preserve category as rent
          });
          setPhoneError("");
          simpleValidator.current.hideMessages();
          forceUpdate(0);
        } else {
          setContactLoading(false);
          toast.error("Failed to submit enquiry. Please try again.");
        }
      } catch (error) {
        console.error("Submit error:", error);
        // Enhanced error logging
        if (error.response) {
          console.error("API Error Response:", error.response.data);
        }
        setContactLoading(false);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  // ✅ KEEP ORIGINAL handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
      category: "rent", // Always preserve category as "rent"
    }));

    // Debug log when form fields change
    console.debug("Form field updated:", {
      field: name,
      value,
      category: "rent",
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
      window.location.href = `whatsapp://send?text=${currentUrl}`;
    } else {
      window.location.href = `https://web.whatsapp.com/send?text=${currentUrl}`;
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
        <meta
          name="description"
          content={
            props.meta_description
              ? props.meta_description
              : "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          }
        />
        <meta name="keywords" content={props.keywords ? props.keywords : ""} />
        <meta property="og:url" content={currentUrl} />
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
          <>
            <PropertyDetailsLoading />
          </>
        ) : (
          <>
            <PropertySlider
              images={getValue(propertyInfo, `images`, [])}
              propertyInfo={propertyInfo}
            />
            <section className="property-details-wrapper">
              <div className="property-details-container">
                {/* <div className="d-flex align-items-center mb-4">
                  <PreviousPage
                    isCompact={false}
                    navigate={() => {
                      router.push("/property-for-rent?page=0");
                    }}
                  />
                  <div style={{ marginLeft: "30px" }}>
                  </div>
                </div> */}
                    <DynamicBreadcrumb items={breadcrumbItems} />

                <div className="property-details-wrapper--body d-flex flex-direction-column-mobile">
                  <div>
                    <PropertyHeader
                      showPopup={showSharePopup}
                      toogleSharePopup={toogleSharePopup}
                      hideSharePopup={() => {
                        toogleSharePopup(false);
                      }}
                      propertyInfo={propertyInfo}
                    />
                    <div className="property-details-wrapper--body--information w-100 mt-3">
                      {getValue(propertyInfo, "bathrooms") ||
                      getValue(propertyInfo, "approved_by") ||
                      getValue(propertyInfo, "brochure") ||
                      getValue(propertyInfo, "brokerage_details") ||
                      getValue(propertyInfo, "brokerage_charges") ||
                      getValue(propertyInfo, "carpet_area") ||
                      getValue(propertyInfo, "carpet_area_max") ||
                      getValue(propertyInfo, "carpet_area_min") ||
                      getValue(propertyInfo, "development_size") ||
                      getValue(propertyInfo, "facing") ||
                      getValue(propertyInfo, "floor_type") ||
                      getValue(propertyInfo, "furnishing") ||
                      getValue(propertyInfo, "monthly_maintenance") ||
                      getValue(propertyInfo, "plot_area") ||
                      getValue(propertyInfo, "plot_area_max") ||
                      getValue(propertyInfo, "plot_area_min") ||
                      getValue(propertyInfo, "plot_length") ||
                      getValue(propertyInfo, "plot_breath") ||
                      getValue(propertyInfo, "pooja_room") ||
                      getValue(propertyInfo, "property_on_floor") ||
                      getValue(propertyInfo, "property_rera") ||
                      getValue(propertyInfo, "reserved_parking") ||
                      getValue(propertyInfo, "servant_accommodation") ||
                      getValue(
                        propertyInfo,
                        "separate_entery_for_servent_room"
                      ) ||
                      getValue(propertyInfo, "store_room") ||
                      getValue(propertyInfo, "study_room") ||
                      getValue(propertyInfo, "total_floor") ||
                      getValue(propertyInfo, "total_units") ||
                      getValue(propertyInfo, "water_supply") ? (
                        <div className="mb-3">
                          <PropertyHighlights
                            propertyInfo={propertyInfo}
                            type={"sale"}
                          />
                        </div>
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
                      {getValue(unitPlansBkhs, "length", 0) > 0 ? (
                        <UnitPlan
                          propertyInfo={propertyInfo}
                          unitPlansBkhs={unitPlansBkhs}
                          handleFilterBHKS={handleFilterBHKS}
                          handleFilterMasterPlanBHKS={
                            handleFilterMasterPlanBHKS
                          }
                          handleFilterAllBHKS={handleFilterAllBHKS}
                          selectedPlan={selectedPlan}
                        />
                      ) : (
                        ""
                      )}
                      {getValue(propertyInfo, "neighborhood.length", 0) > 0 ? (
                        <Neighbourhood propertyInfo={propertyInfo} />
                      ) : (
                        ""
                      )}
                      {getValue(propertyInfo, "is_group_buy") && <GroupBuy />}
                      {getValue(propertyInfo, "video_url") ? (
                        <Video propertyInfo={propertyInfo} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <Contact
                    request={request}
                    setRequest={setRequest}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    validator={validator}
                    simpleValidator={simpleValidator}
                    isContactLoading={isContactLoading}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    validatePhone={validatePhone}
                    propertyName={getValue(propertyInfo, "title", "")}
                    propertyType="rent"
                  />
                </div>
              </div>

              {getValue(propertyInfo, `rent_properties.length`) > 0 && (
                <>
                  <div className="property-details-wrapper--similar-properties">
                    <div className="custom-container">
                      <h3 className="mb-4 text-center">
                        Unit Availability with{" "}
                        {getValue(propertyInfo, "title", "")}
                      </h3>
                      <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={3}
                        autoplay={{
                          delay: 3000,
                        }}
                        navigation={true}
                        breakpoints={{
                          320: { slidesPerView: 1, spaceBetween: 16 },
                          480: { slidesPerView: 1, spaceBetween: 16 },
                          640: { slidesPerView: 2, spaceBetween: 16 },
                          767: { slidesPerView: 2, spaceBetween: 16 },
                          768: { slidesPerView: 3, spaceBetween: 24 },
                          992: { slidesPerView: 3, spaceBetween: 24 },
                          1200: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className="outer-swiper-container py-2"
                      >
                        {getValue(propertyInfo, `rent_properties`, []).map(
                          (item, index2) => (
                            <SwiperSlide key={`rent-properties-${index2}`}>
                              <PropertyCard propertyObj={item} type={"rent"} />
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
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
                          320: { slidesPerView: 1, spaceBetween: 16 },
                          480: { slidesPerView: 1, spaceBetween: 16 },
                          640: { slidesPerView: 2, spaceBetween: 16 },
                          767: { slidesPerView: 2, spaceBetween: 16 },
                          768: { slidesPerView: 3, spaceBetween: 24 },
                          992: { slidesPerView: 3, spaceBetween: 24 },
                          1200: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className="outer-swiper-container py-2"
                      >
                        {getValue(propertyInfo, `similar_properties`, []).map(
                          (item, index1) => {
                            return (
                              <SwiperSlide key={`similar-properties-${index1}`}>
                                <PropertyCard
                                  propertyObj={item}
                                  type={"rent"}
                                />
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
                      href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
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
                      href={`http://twitter.com/share?url=${currentUrl}`}
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
                      onClick={() => copyToClipboard(currentUrl)}
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
                      href={`mailto:?subject=&body=${currentUrl}`}
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
                      onClick={() => copyToClipboard(currentUrl)}
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
                  onClick={() => copyToClipboard(currentUrl)}
                >
                  <a>{currentUrl}</a>
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
  const slug = query.slug;

  let resp;
  try {
    let where = {
      "filters[slug][$eq]": slug,
    };
    resp = await fetchRentProperties(where);
  } catch (error) {
    resp = { data: [] };
  }

  const property = resp?.data?.[0] || {};
  const meta_title = property?.meta_title || "";
  const meta_description = property?.meta_description || "";
  const keywords = property?.recommended_title || "";
  const meta_image = property?.cover_image?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${property.cover_image.url}`
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

// --- KEYED EXPORT FOR REMOUNTING ON SLUG CHANGE ---
const PropertyDetailsPage = (props) => (
  <PropertyDetails key={props.slug} {...props} />
);
export default PropertyDetailsPage;
