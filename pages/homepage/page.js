"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import SimpleReactValidator from "simple-react-validator";
import Router from "next/router";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";

const Banner = dynamic(() => import("@components/home/banner/banner.js"));
const PropertyListed = dynamic(() =>
  import("@components/home/property-listed/index.js")
);
const Testimonials = dynamic(() =>
  import("@components/home/testimonials/index.js")
);
const FeaturedPropertyBuy = dynamic(() =>
  import("@components/home/featured-property-buy/index.js")
);
const FeaturedPropertyRent = dynamic(() =>
  import("@components/home/featured-property-rent/index.js")
);
const Partners = dynamic(() =>
  import("@components/home/our-partners/index.js")
);
const Bank = dynamic(() => import("@components/home/our-bank/index.js"));
const Search = dynamic(() =>
  import("@components/home/unique-properties/index.js")
);
const CustomerReview = dynamic(() =>
  import("@components/home/reviews/index.js")
);
const Layout = dynamic(() => import("@components/layout.js"));
const PropertiesByLocation = dynamic(() =>
  import("@components/home/properties-by-location")
);
const PropertySocialShare = dynamic(() =>
  import("@components/home/share-property/PropertySocialShare")
);
const HomeCTA = dynamic(() => import("@components/home/cta/HomeCTA"));

import {
  fetchBanners,
  fetchOurPartners,
  fetchOurBank,
  fetchSaleProperties,
  fetchRentProperties,
  fetchPropertyTypes,
  postCreatePropertyEnquiry,
  fetchCities,
  fetchLocationAreas,
} from "@services/APIs/common.service";
import Review from "@components/home/reviews/index.js";
import Meta from "../seo-meta";

const HomePage = ({ reviews }) => {
  const [rentPropertiesList, setRentPropertiesList] = useState([]);
  const [salePropertiesList, setSalePropertiesList] = useState([]);
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [isContactLoading, setContactLoading] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  //   const [reviews, setReviews] = useState([]);

  // banner search
  const [banners, setBanners] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [mainSearchInput, setMainSearchInput] = useState("");
  const [mainSearchLoading, setMainSearchLoading] = useState(false);
  const [mainSearchSuggestionList, setMainSearchSuggestionList] = useState([]);
  const [partnersList, setPartnersList] = useState([]);
  const [banksList, setBanksList] = useState([]);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);
  const [isBannerLoading, setBannerLoading] = useState(false);

  //location search
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  //Location areas
  const [locationArea, getLocationArea] = useState([]);
  const [isLocationAreaLoading, setIsLocationAreaLoading] = useState("");

  //property types
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const [propertySlug, setPropertySlug] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = (slug) => {
    setModal(!modal);
    setPropertySlug(slug);
  };

  const [showCta, setShowCta] = useState(false);
  const [ctaPropType, setCtaPropType] = useState("");
  const [ctaPropId, setCtaPropId] = useState("");
  const [selectedPropertyName, setSelectedPropertyName] = useState("");
const [selectedPropertyCategory, setSelectedPropertyCategory] = useState("");
  // const toggleCta = (type, id) => {
  //   setShowCta(!showCta);
  //   setCtaPropType(type);
  //   setCtaPropId(id);
  // };

  const toggleCta = (type, id, propertyName, propertyCategory) => {
  setShowCta(!showCta);
  setCtaPropType(type);
  setCtaPropId(id);
  setSelectedPropertyName(propertyName || "");
  setSelectedPropertyCategory(propertyCategory || "");
};


  const [request, setRequest] = useState({
    name: "",
    phone: "",
  });

  const [activeTabHome, setActiveTabHome] = useState("1");
  const handleChangeContact = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
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
      setPhoneError(""); // Clear error if valid
      return true;
    }
  };

  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async () => {
    // First, trigger validation for all fields
    const formValid = simpleValidator.current.allValid();

    // Explicitly validate phone (add this)
    const isPhoneValid = validatePhone(request.phone);

    if (!formValid || !isPhoneValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1); // Ensure re-render for errors
      return;
    } else {
      try {
        setContactLoading(true);
        let data = {
          data: {
            name: request.name,
            phone: request.phone,
            // property: getValue(this.props, `propertyDetails.projectBySlug.id`, '')
          },
        };
        let resp = await postCreatePropertyEnquiry(data);
        if (resp) {
          toast.success(getValue(resp, "message", "Submitted successfully"));
          setContactLoading(false);
          setRequest({
            ...request,
            name: "",
            phone: "",
            comment: "",
          });
          setPhoneError("");
          simpleValidator.current.hideMessages();
          forceUpdate(0);
        } else {
          setContactLoading(false);
        }
      } catch (error) {
        setContactLoading(false);
      }
    }
  };

  useEffect(() => {
    getRentProperties();
    getSaleProperties();
    getPartners();
    getBanks();
    getPropertyTypes();
    getBannerImages();
    getCities();
    getLocationAreas();
    if (typeof window !== "undefined") {
      localStorage.removeItem("path");
    }
  }, []);

  useEffect(() => {
    if (propertyTypeList) {
      setSelectedPropertyType(getValue(propertyTypeList, "[0].id", ""));
    }
  }, [propertyTypeList]);

  const getBannerImages = async () => {
    setBannerLoading(true);
    try {
      let resp = await fetchBanners();
      if (resp) {
        setBanners(getValue(resp, "data", []));
        setBannerLoading(false);
      }
    } catch (error) {
      setBannerLoading(false);
    }
  };

  const getPartners = async () => {
    try {
      let resp = await fetchOurPartners();
      if (resp) {
        setPartnersList(getValue(resp, "data", []));
      }
    } catch (error) {}
  };

  const getBanks = async () => {
    try {
      let resp = await fetchOurBank();
      if (resp) {
        setBanksList(getValue(resp, "data", []));
      }
    } catch (error) {}
  };

  const getCities = async () => {
    setCitiesLoading(true);
    try {
      let resp = await fetchCities();
      if (resp) {
        setCities(getValue(resp, "data", []));
        setCitiesLoading(false);
      }
    } catch (error) {
      setCitiesLoading(false);
    }
  };

  const getLocationAreas = async () => {
    setIsLocationAreaLoading(true);
    try {
      let resp = await fetchLocationAreas();
      if (resp) {
        getLocationArea(getValue(resp, "data", []));
        setIsLocationAreaLoading(false);
      }
    } catch (error) {
      setIsLocationAreaLoading(false);
    }
  };

  const [rentLoading, setRentLoading] = useState(false);
  const getRentProperties = async () => {
    try {
      let where = {
        "filters[is_featured][$eq]": true,
        "filters[hide_in_list][$eq]": false,
      };
      setRentLoading(true);
      let resp = await fetchRentProperties(where);
      if (resp) {
        setRentPropertiesList(getValue(resp, "data", []));
        setRentLoading(false);
      } else {
        setRentLoading(false);
      }
    } catch (error) {
      setRentLoading(false);
    }
  };

  const [saleLoading, setSaleLoading] = useState(false);
  const getSaleProperties = async () => {
    try {
      let where = {
        "filters[is_featured][$eq]": true,
        "filters[hide_in_list][$eq]": false,
      };
      setSaleLoading(true);
      let resp = await fetchSaleProperties(where);
      if (resp) {
        setSalePropertiesList(getValue(resp, "data", []));
        setSaleLoading(false);
      } else {
        setSaleLoading(false);
      }
    } catch (error) {
      setSaleLoading(false);
    }
  };

  const [typeLoading, setTypeLoading] = useState(false);
  const getPropertyTypes = async () => {
    try {
      setTypeLoading(true);
      let resp = await fetchPropertyTypes();
      if (resp) {
        const order = [
          "villa-homes",
          "apartments",
          "plots",
          "farmland",
          "office-spaces",
        ];
        const sortedList = getValue(resp, "data", []).sort((a, b) => {
          return order.indexOf(a.slug) - order.indexOf(b.slug);
        });
        setTypeLoading(false);
        setPropertyTypeList(sortedList);
      } else {
        setTypeLoading(false);
      }
    } catch (error) {
      setTypeLoading(false);
    }
  };

  const handleNavigateSearch = () => {
    Router.push(`/search-properties?page=0&type=${activeTab}`);
  };

  const handleChangeTab = (value) => {
    setActiveTab(value);
    setMainSearchInput("");
    setMainSearchSuggestionList([]);
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleChangeMainSearch = async (e) => {
    const { name, value } = e.target;
    if (value) {
      setMainSearchInput(value);
      let where = {
        "filters[title][$containsi]": value,
        "filters[hide_in_list][$eq]": false,
        ...(selectedOption !== "All" &&
          selectedOption !== "all" && {
            "filters[property_type][id][$eq]": selectedOption,
          }),
      };
      if (value) {
        if (activeTab === "1") {
          try {
            setMainSearchLoading(true);
            let resp = await fetchSaleProperties(where);
            if (resp) {
              setMainSearchLoading(false);
              setMainSearchSuggestionList(getValue(resp, "data", []));
            } else {
              setMainSearchLoading(false);
            }
          } catch (error) {
            setMainSearchLoading(false);
          }
        } else {
          try {
            setMainSearchLoading(true);
            let resp = await fetchRentProperties(where);
            if (resp) {
              setMainSearchLoading(false);
              setMainSearchSuggestionList(getValue(resp, "data", []));
            } else {
              setMainSearchLoading(false);
            }
          } catch (error) {
            setMainSearchLoading(false);
          }
        }
      }
    } else {
      setMainSearchInput(value);
      setMainSearchLoading(false);
    }
  };

  const mainSearchSubmit = () => {
    const hasPropertyType =
      selectedPropertyType &&
      selectedPropertyType !== "All" &&
      selectedPropertyType !== "all";

    // If search is empty and no specific category selected
    if (!mainSearchInput && !hasPropertyType) {
      Router.push(`/property-for-${activeTab === "1" ? "sale" : "rent"}`);
      return;
    }

    Router.push({
      pathname: `property-for-${activeTab === "1" ? "sale" : "rent"}`,
      query: {
        ...(mainSearchInput && { title_contains: mainSearchInput }),
        page: 0,
        type: activeTab,
        ...(hasPropertyType && { property_type: selectedPropertyType }),
      },
    });
  };

  const handleNavigate = (id) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("path", activeTabHome);
    }
    Router.push({
      pathname: `/search-properties`,
      query: {
        property_type: id,
        page: 0,
        type: activeTabHome,
      },
    });
  };

  const handleActiveTabHome = async (value) => {
    setActiveTabHome(value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCities(selectedCity);
  };

  const handlePropertyTypeChange = (e) => {
    setSelectedPropertyType(e.target.value);
  };

  return (
    <Layout>
      <Meta
        title="Dreams Realty | Most Trusted Realtor in Bangalore"
        description="Buy or rent verified luxury properties in Bangalore with Dreams Realty, the most trusted realtor. Expert guidance to find your perfect home."
        keywords="Most trusted realtor in Bangalore | Trusted real estate consultant in Bangalore | Villas for sale in Whitefield Bangalore |Flats for sale in Bangalore | Apartments for sale in Bangalore"
      />
      <Banner
        banners={banners}
        handleNavigateSearch={handleNavigateSearch}
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
        isBannerLoading={isBannerLoading}
        // search
        mainSearchSubmit={mainSearchSubmit}
        mainSearchInput={mainSearchInput}
        mainSearchLoading={mainSearchLoading}
        mainSearchSuggestionList={mainSearchSuggestionList}
        handleChangeMainSearch={handleChangeMainSearch}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        //cities
        cities={cities}
        citiesLoading={citiesLoading}
        handleCityChange={handleCityChange}
        selectedCity={selectedCity}
        //property type
        propertyTypeList={propertyTypeList}
        handlePropertyTypeChange={handlePropertyTypeChange}
      />
      {/* {salePropertiesList.length > 0 && ( */}
      <FeaturedPropertyBuy
        saleLoading={saleLoading}
        salePropertiesList={salePropertiesList}
        toggle={toggle}
        toggleCta={toggleCta}
      />
      {/* )} */}
      {rentPropertiesList.length > 0 && (
        <FeaturedPropertyRent
          rentLoading={rentLoading}
          rentPropertiesList={rentPropertiesList}
          toggle={toggle}
          toggleCta={toggleCta}
        />
      )}
      <Search
        handleChange={handleChangeContact}
        request={request}
        setRequest={setRequest}
        handleSubmit={handleSubmit}
        isContactLoading={isContactLoading}
        validator={validator}
        simpleValidator={simpleValidator}
        phoneError={phoneError}
        setPhoneError={setPhoneError}
        validatePhone={validatePhone}
      />
      <Partners partnersList={partnersList} />
      <Bank banksList={banksList} />
      <PropertyListed
        typeLoading={typeLoading}
        propertyTypeList={propertyTypeList}
        handleNavigate={handleNavigate}
        activeTabHome={activeTabHome}
        handleActiveTabHome={handleActiveTabHome}
      />
      <Testimonials />
      <PropertiesByLocation
        locationArea={locationArea}
        isLocationAreaLoading={isLocationAreaLoading}
        propertyTypeList={propertyTypeList}
        handleNavigate={handleNavigate}
        activeTabHome={activeTabHome}
        handleActiveTabHome={handleActiveTabHome}
      />
      {/* {reviews.length > 0 ? <CustomerReview reviews={reviews} /> : ""} */}
      <div className="custom-container mb-5 mt-5">
        <p>©2025 Dreams Realty</p>
        <p>
          Dreams Realty Promoted by Authorised Affiliate Channel Sales Partner.
        </p>
        <h6 className="mt-4">Privacy Policy & Disclaimer :</h6>
        <span style={{ fontSize: "12px" }}>
          Any content mentioned in this website is sourced from the
          Developer/Builder for information purpose only and not to be
          considered as an official website. This Website belongs to Authorised
          Sales Partner of Dreams Realty and does not include Dreams Realty
          Sales Team. The details given here are sourced content from the
          builder but does not abide Dreams Realty to this website in any
          manner.
        </span>
      </div>
      {reviews?.length > 0 && <Review reviews={reviews} />}

      <PropertySocialShare
        modal={modal}
        toggle={toggle}
        propertySlug={propertySlug}
      />
      

      <HomeCTA
  modal={showCta}
  toggle={toggleCta}
  type={ctaPropType}
  id={ctaPropId}
  propertyName={selectedPropertyName}
  propertyCategory={selectedPropertyCategory}
/>
    </Layout>
  );
};

export default HomePage;
