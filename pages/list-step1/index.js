import React, { useEffect, useState, useRef } from "react";
import Layout from "@components/layout.js";
import SimpleReactValidator from "simple-react-validator";
import { sendPropertyListingEmail, prepareEmailData } from "@services/emailService";

import { getValue } from "@utils/lodash";
import { toast } from "react-toastify";
import router from "next/router";
import ProfileSVG from "@components/svg/profile-svg";
import AlbumSVG from "@components/svg/album-svg";
import { Button } from "reactstrap";
import PropertySVG from "@components/svg/property-svg";
import MapSVG from "@components/svg/map-svg";
import Tab1 from "./tab1";
import ListStepTab2 from "pages/list-step2";
import ListStepTab3 from "pages/list-step3";
import ListStepTab4 from "pages/list-step4";
import RouteLeavingGuard from "@common/promptPage";
import axios from "axios";
import { MockCountries } from "@common/contry";
import {
  fetchCreateSalePropertyByUser,
  fetchCreateRentPropertyByUser,
  fetchPropertyTypes,
  fetchLocationAreas,
} from "@services/APIs/common.service";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  fetchAmenities,
  fetchCities,
  fetchDevelopers,
  fetchLocations,
  fetchPropertyBhks,
} from "services/APIs/common.service";

export default function ListStep1(props) {
  const [isDirty, setIsDirty] = React.useState(true);

  const [activeTab, setActiveTab] = useState(1);

  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);

  /* -------------------------------------------------------------------------- */
  /*                                   TAB1 Section                             */
  /* -------------------------------------------------------------------------- */

  const [isLoading, setIsLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("sale");
  const [request, setRequest] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [countryCode, setCountryCode] = useState("+91 India");

  const handleCountryCode = (e) => {
    setCountryCode(e);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   TAB2 Section                             */
  /* -------------------------------------------------------------------------- */

  const [loading, setLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [property_type, setProperty_type] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                   TAB3 Section                             */
  /* -------------------------------------------------------------------------- */

  const [isLoading2, setIsLoading2] = useState(false);
  const [saleRequest, setSaleRequest] = useState({
    title: "",
    address: "",
    about: "",
    // balcony: "",
    bathrooms: "",

    logo: "", //-file
    action: "send_email",
    property_rera: "",
    total_units: "",
    development_size: "",
    price: "",
    video_url: "",

    plot_area: "",
    plot_area_max: "",
    plot_area_min: "",
    carpet_area: "",
    carpet_area_min: "",
    carpet_area_max: "",
    super_build_up_area: "",
    super_build_up_area_min: "",
    super_build_up_area_max: "",

    latitude: "",
    longitude: "",

    city: "", //--dropdown
    location: "", //--dropdown
    location_area: "", //--dropdown

    developer: "", //--dropdown

    // property_construction_status: "", //--dropdown
    furnishing: "", //--dropdown
    facing: "", //--dropdown
    property_bhks: [], //--dropdown
    amenities: [],
  });
  const [logoPreview, setLogoPreview] = useState("");
  const [image, setImage] = useState("");
  // const [property_type, setProperty_type] = useState("");
  const [rentRequest, setRentRequest] = useState({
    title: "",
    address: "",
    about: "",
    logo: "",
    action: "send_email",
    property_rera: "",
    total_units: "",
    development_size: "",
    price: "",
    video_url: "",
    bathrooms: "",
    balcony: "",

    plot_area: "",
    plot_area_max: "",
    plot_area_min: "",
    carpet_area: "",
    carpet_area_min: "",
    carpet_area_max: "",
    build_up_area: "",
    build_up_area_min: "",
    build_up_area_max: "",

    latitude: "",
    longitude: "",

    city: "", //--dropdown
    location: "", //--dropdown
    location_area: "", //--dropdown

    developer: "", //--dropdown

    furnishing: "", //--dropdown
    facing: "", //--dropdown
    property_bhks: [], //--dropdown
  });
  const [isLoading3, setIsLoading3] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [locationAreaList, setLocationAreaList] = useState([]);
  const [propertyBHKList, setPropertyBHKList] = useState([]);
  const [developerList, setDeveloperList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [furnishingList] = useState([
    { value: "furnished" },
    { value: "semi_furnished" },
    { value: "unfurnished" },
  ]);
  const [facingList] = useState([
    { value: "north" },
    { value: "south" },
    { value: "east" },
    { value: "west" },
    { value: "north_east" },
    { value: "north_west" },
    { value: "south_east" },
    { value: "south_west" },
  ]);

  /* -------------------------------------------------------------------------- */
  /*                                   TAB4 Section                             */
  /* -------------------------------------------------------------------------- */

  const [isLoading4, setIsLoading4] = useState(false);
  const [imageList, setImageList] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                               Use effect Section                           */
  /* -------------------------------------------------------------------------- */
  const [countryOption, setOption] = useState([]);

  useEffect(() => {
    // Add push state to intercept back button
    window.history.pushState(null, null, window.location.pathname);
    const handlePopState = () => {
      router.replace("/");
    };
    window.addEventListener("popstate", handlePopState);

    // tab2
    getPropertyTypeList();
    // tab3
    getPropertyBHKs();
    getDevelopers();
    getCities();
    getAmenities();
    // country code
    let countryOptions = [];
    MockCountries.map((item) => {
      countryOptions.push({
        id: item.id,
        country: item.code,
        label: (
          <>
            {/* <Flag code={item.code} height="16" />{" "} */}
            {item.dial_code + " " + item.name}
          </>
        ),
        value: item.dial_code + " " + item.name,
      });
    });
    setOption(countryOptions);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               API Section                                  */
  /* -------------------------------------------------------------------------- */

  // tab2
  const getPropertyTypeList = async () => {
    try {
      setLoading(true);
      let resp = await fetchPropertyTypes();
      if (resp) {
        setPropertyTypeList(getValue(resp, `data`, []));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // tab3
  const getPropertyBHKs = async () => {
    try {
      let resp = await fetchPropertyBhks();
      if (resp) {
        setPropertyBHKList(getValue(resp, "data", []));
      }
    } catch (error) { }
  };
  const getDevelopers = async () => {
    try {
      let resp = await fetchDevelopers();
      if (resp) {
        setDeveloperList(getValue(resp, `data`, []));
      }
    } catch (error) { }
  };
  const getAmenities = async () => {
    try {
      let resp = await fetchAmenities();
      if (resp) {
        setAmenitiesList(
          getValue(resp, `data`, []).map((item) => ({
            value: item.title,
            label: item.title,
            id: item.id,
          }))
        );
      }
    } catch (error) { }
  };
  const getCities = async () => {
    if (cityList.length > 0) return; // Skip if we already have cities

    try {
      let resp = await fetchCities();
      if (resp) {
        const cities = getValue(resp, "data", []);
        setCityList(cities);
        // Only get locations if we have cities
        if (cities.length > 0) {
          await getLocations(cities[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  const getLocations = async (id) => {
    let where = {
      city: id,
    };
    try {
      let resp = await fetchLocations(where);
      if (resp) {
        const locations = getValue(resp, "data", []);
        setLocationList(locations);
        // Only get location areas if we have locations and haven't loaded them yet
        if (locations.length > 0 && locationAreaList.length === 0) {
          await getLocationArea(locations[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const getLocationArea = async (id) => {
    try {
      let where = {
        where: {
          location: id,
        },
      };
      let resp = await fetchLocationAreas(where);
      if (resp) {
        setLocationAreaList(getValue(resp, "data", []));
      }
    } catch (error) { }
  };
  const uploadImage = async (e, path, state, name) => {
    if (e.target.files[0]) {
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      Array.from(e.target.files).forEach((image) => {
        formData.append("files", image);
      });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: "Bearer " + authToken,
          },
        })
        .then(async (res) => {
          setImageList(getValue(res, `data`, []));
          path({
            ...state,
            [name]: getValue(res, `data[${0}].id`, ""),
          });
        })
        .catch((err) => { });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Onchange Section                             */
  /* -------------------------------------------------------------------------- */

  const handleChangeRequest = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  // tab2
  const handleRequest = (id) => {
    setProperty_type(id);
  };
  // tab3
  const handleChangeSaleRequest = (e) => {
    const { name, value } = e.target;
    setSaleRequest({
      ...saleRequest,
      [name]: value,
    });
  };

  const handleChangeRentRequest = (e) => {
    const { name, value } = e.target;
    setRentRequest({
      ...rentRequest,
      [name]: value,
    });
  };

  const handleChangeSelectId = (e, path, state, name) => {
    const { value } = e.target;
    path({
      ...state,
      [name]: value,
    });
  };

  const handleChangePushArray = (value, path, state) => {
    let indexOf = getValue(state, `property_bhks`, []).includes(value);
    if (indexOf) {
      let filtered = getValue(state, `property_bhks`, []).filter(
        (item) => item !== value
      );
      state.property_bhks = filtered;
      path({ ...state });
    } else {
      state.property_bhks.push(value);
      path({ ...state });
    }
  };

  const handleChangeSelect = (e, path, state) => {
    state.amenities = e;
    path({ ...state });
  };

  const handleRemoveImages = (index) => {
    let filteredImages = imageList.filter((item, ind) => ind !== index);
    setImageList(filteredImages);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Submit Section                               */
  /* -------------------------------------------------------------------------- */

  const getMissingRequiredFields = () => {
    const missing = [];

    if (!getValue(request, "full_name", "").trim()) missing.push("Full Name");
    if (!getValue(request, "email", "").trim()) missing.push("Email");
    if (!getValue(request, "phone", "").trim()) missing.push("Phone Number");
    if (!property_type) missing.push("Property Type");

    const currentReq = propertyType === "sale" ? saleRequest : rentRequest;
    if (!getValue(currentReq, "title", "").trim()) missing.push("Property Name");
    if (!getValue(currentReq, "furnishing", "")) missing.push("Furnishing");
    if (!(parseFloat(getValue(currentReq, "price", 0)) > 0))
      missing.push("Price");

    if (propertyType === "sale") {
      if (!(parseFloat(getValue(currentReq, "super_build_up_area", 0)) > 0)) {
        missing.push("Super Built-up Area");
      }
    } else if (!(parseFloat(getValue(currentReq, "build_up_area", 0)) > 0)) {
      missing.push("Built-up Area");
    }

    return missing;
  };

  // submit/create-thankyou
  // const handleSubmit = async () => {
  //   const formValid = simpleValidator.current.allValid();
  //   if (!formValid) {
  //     simpleValidator.current.showMessages();
  //     forceUpdate(1);
  //   } else {
  //     try {
  //       let requestInfo = JSON.parse(JSON.stringify(request));
  //       requestInfo.phone =
  //         (countryCode ? countryCode.split(" ")[0] : "+91") + requestInfo.phone;
  //       setIsLoading(true);

  //       const prepareSaleData = (data) => {
  //         return {
  //           ...data,
  //           bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : 0,
  //           total_units: data.total_units ? parseFloat(data.total_units) : 0,
  //           development_size: data.development_size
  //             ? parseFloat(data.development_size)
  //             : 0,
  //           price: data.price ? parseFloat(data.price) : 0,
  //           plot_area: data.plot_area ? parseFloat(data.plot_area) : 0,
  //           plot_area_max: data.plot_area_max
  //             ? parseFloat(data.plot_area_max)
  //             : 0,
  //           plot_area_min: data.plot_area_min
  //             ? parseFloat(data.plot_area_min)
  //             : 0,
  //           carpet_area: data.carpet_area ? parseFloat(data.carpet_area) : 0,
  //           carpet_area_min: data.carpet_area_min
  //             ? parseFloat(data.carpet_area_min)
  //             : 0,
  //           carpet_area_max: data.carpet_area_max
  //             ? parseFloat(data.carpet_area_max)
  //             : 0,
  //           super_build_up_area: data.super_build_up_area
  //             ? parseFloat(data.super_build_up_area)
  //             : 0,
  //           super_build_up_area_min: data.super_build_up_area_min
  //             ? parseFloat(data.super_build_up_area_min)
  //             : 0,
  //           super_build_up_area_max: data.super_build_up_area_max
  //             ? parseFloat(data.super_build_up_area_max)
  //             : 0,
  //           amenities: Array.isArray(data.amenities)
  //             ? data.amenities.map((item) => item.id)
  //             : [],
  //           images: Array.isArray(imageList)
  //             ? imageList.map((item) => item.id)
  //             : [],
  //           locale: "en",
  //         };
  //       };

  //       const prepareRentData = (data) => {
  //         return {
  //           ...data,
  //           balcony: data.balcony ? parseFloat(data.balcony) : 0,
  //           bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : 0,
  //           development_size: data.development_size
  //             ? parseFloat(data.development_size)
  //             : 0,
  //           price: data.price ? parseFloat(data.price) : 0,
  //           plot_area: data.plot_area ? parseFloat(data.plot_area) : 0,
  //           plot_area_max: data.plot_area_max
  //             ? parseFloat(data.plot_area_max)
  //             : 0,
  //           plot_area_min: data.plot_area_min
  //             ? parseFloat(data.plot_area_min)
  //             : 0,
  //           carpet_area: data.carpet_area ? parseFloat(data.carpet_area) : 0,
  //           carpet_area_min: data.carpet_area_min
  //             ? parseFloat(data.carpet_area_min)
  //             : 0,
  //           carpet_area_max: data.carpet_area_max
  //             ? parseFloat(data.carpet_area_max)
  //             : 0,
  //           build_up_area: data.build_up_area
  //             ? parseFloat(data.build_up_area)
  //             : 0,
  //           build_up_area_min: data.build_up_area_min
  //             ? parseFloat(data.build_up_area_min)
  //             : 0,
  //           build_up_area_max: data.build_up_area_max
  //             ? parseFloat(data.build_up_area_max)
  //             : 0,
  //           amenities: Array.isArray(data.amenities)
  //             ? data.amenities.map((item) => item.id)
  //             : [],
  //           images: Array.isArray(imageList)
  //             ? imageList.map((item) => item.id)
  //             : [],
  //           locale: "en",
  //         };
  //       };

  //       let data;
  //       if (propertyType === "sale") {
  //         let saleReq = prepareSaleData(saleRequest);
  //         data = {
  //           data: {
  //             ...saleReq,
  //             property_type: property_type,
  //             // Add user details here
  //             // full_name: request.full_name,
  //             // email: request.email,
  //             // phone: requestInfo.phone,
  //           },
  //         };
  //       } else {
  //         let rentReq = prepareRentData(rentRequest);
  //         data = {
  //           data: {
  //             ...rentReq,
  //             property_type: property_type,
  //             // Add user details here
  //     // full_name: request.full_name,
  //     // email: request.email,
  //     // phone: requestInfo.phone,
  //           },
  //         };
  //       }

  //       // Ensure no unnecessary fields are included
  //       Object.keys(data.data).forEach((key) => {
  //         const val = data.data[key];
  //         const isEmptyArray = Array.isArray(val) && val.length === 0;

  //         // Keep only price = 0 (for validation check), remove other zero fields
  //         if (
  //           val === undefined ||
  //           val === null ||
  //           val === "" ||
  //           val === false ||
  //           isEmptyArray ||
  //           (val === 0 && key !== "price")
  //         ) {
  //           delete data.data[key];
  //         }
  //       });

  //       if (data.data.price !== 0) {
  //         let resp =
  //           propertyType === "sale"
  //             ? await fetchCreateSalePropertyByUser(data)
  //             : await fetchCreateRentPropertyByUser(data);

  //         if (resp) {
  //           toast.success("Created successfully");
  //           router.push(`/create-thankyou`);
  //           setIsLoading(false);
  //         } else {
  //           setIsLoading(false);
  //         }
  //       } else {
  //         toast.error("Please add price to continue");
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.error("Error during submission:", error);
  //     }
  //   }
  // };

  const handleSubmit = async () => {
  const missingRequiredFields = getMissingRequiredFields();
  if (missingRequiredFields.length > 0) {
    toast.error(
      `Please complete required fields: ${missingRequiredFields
        .slice(0, 3)
        .join(", ")}${missingRequiredFields.length > 3 ? "..." : ""}`
    );
    return false;
  }

  const formValid = simpleValidator.current.allValid();
  if (!formValid) {
    simpleValidator.current.showMessages();
    forceUpdate(1);
    return false;
  }

  try {
    let requestInfo = JSON.parse(JSON.stringify(request));
    requestInfo.phone =
      (countryCode ? countryCode.split(" ")[0] : "+91") + requestInfo.phone;
    setIsLoading(true);

    const prepareSaleData = (data) => {
      return {
        ...data,
        bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : 0,
        total_units: data.total_units ? parseFloat(data.total_units) : 0,
        development_size: data.development_size
          ? parseFloat(data.development_size)
          : 0,
        price: data.price ? parseFloat(data.price) : 0,
        plot_area: data.plot_area ? parseFloat(data.plot_area) : 0,
        plot_area_max: data.plot_area_max
          ? parseFloat(data.plot_area_max)
          : 0,
        plot_area_min: data.plot_area_min
          ? parseFloat(data.plot_area_min)
          : 0,
        carpet_area: data.carpet_area ? parseFloat(data.carpet_area) : 0,
        carpet_area_min: data.carpet_area_min
          ? parseFloat(data.carpet_area_min)
          : 0,
        carpet_area_max: data.carpet_area_max
          ? parseFloat(data.carpet_area_max)
          : 0,
        super_build_up_area: data.super_build_up_area
          ? parseFloat(data.super_build_up_area)
          : 0,
        super_build_up_area_min: data.super_build_up_area_min
          ? parseFloat(data.super_build_up_area_min)
          : 0,
        super_build_up_area_max: data.super_build_up_area_max
          ? parseFloat(data.super_build_up_area_max)
          : 0,
        amenities: Array.isArray(data.amenities)
          ? data.amenities.map((item) => item.id)
          : [],
        images: Array.isArray(imageList)
          ? imageList.map((item) => item.id)
          : [],
        locale: "en",
      };
    };

    const prepareRentData = (data) => {
      return {
        ...data,
        balcony: data.balcony ? parseFloat(data.balcony) : 0,
        bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : 0,
        development_size: data.development_size
          ? parseFloat(data.development_size)
          : 0,
        price: data.price ? parseFloat(data.price) : 0,
        plot_area: data.plot_area ? parseFloat(data.plot_area) : 0,
        plot_area_max: data.plot_area_max
          ? parseFloat(data.plot_area_max)
          : 0,
        plot_area_min: data.plot_area_min
          ? parseFloat(data.plot_area_min)
          : 0,
        carpet_area: data.carpet_area ? parseFloat(data.carpet_area) : 0,
        carpet_area_min: data.carpet_area_min
          ? parseFloat(data.carpet_area_min)
          : 0,
        carpet_area_max: data.carpet_area_max
          ? parseFloat(data.carpet_area_max)
          : 0,
        build_up_area: data.build_up_area
          ? parseFloat(data.build_up_area)
          : 0,
        build_up_area_min: data.build_up_area_min
          ? parseFloat(data.build_up_area_min)
          : 0,
        build_up_area_max: data.build_up_area_max
          ? parseFloat(data.build_up_area_max)
          : 0,
        amenities: Array.isArray(data.amenities)
          ? data.amenities.map((item) => item.id)
          : [],
        images: Array.isArray(imageList)
          ? imageList.map((item) => item.id)
          : [],
        locale: "en",
      };
    };

    let data;
    if (propertyType === "sale") {
      let saleReq = prepareSaleData(saleRequest);
      data = {
        data: {
          ...saleReq,
          property_type: property_type,
          publishedAt: null,
        },
      };
    } else {
      let rentReq = prepareRentData(rentRequest);
      data = {
        data: {
          ...rentReq,
          property_type: property_type,
          publishedAt: null,
        },
      };
    }

    // Ensure no unnecessary fields are included
    Object.keys(data.data).forEach((key) => {
      const val = data.data[key];
      const isEmptyArray = Array.isArray(val) && val.length === 0;

      // Keep only price = 0 (for validation check), remove other zero fields
      if (
        val === undefined ||
        val === null ||
        val === "" ||
        val === false ||
        isEmptyArray ||
        (val === 0 && key !== "price")
      ) {
        delete data.data[key];
      }
    });

    if (data.data.price !== 0) {
      // ============================================
      // EXISTING API CALL - Keep as is
      // ============================================
      let resp =
        propertyType === "sale"
          ? await fetchCreateSalePropertyByUser(data)
          : await fetchCreateRentPropertyByUser(data);

      if (resp) {
        // ============================================
        // ⭐ NEW: EMAIL NOTIFICATION (Added)
        // ============================================
        try {
          // Prepare email data
          const emailData = prepareEmailData({
            request,
            saleRequest,
            rentRequest,
            propertyType,
            property_type,
            imageList,
            cityList,
            locationList,
            locationAreaList,
            developerList,
            propertyTypeList,
            propertyBHKList,
          });

          // Send email (non-blocking - don't fail if email fails)
          const emailResult = await sendPropertyListingEmail(emailData);
          
          if (emailResult.success) {
            console.log('✅ Email notification sent successfully');
          } else {
            console.warn('⚠️ Email notification failed:', emailResult.message);
            // Don't show error to user - property is already saved
          }
        } catch (emailError) {
          console.error('⚠️ Email sending error (non-critical):', emailError);
          // Continue with success flow even if email fails
        }
        // ============================================
        // END OF EMAIL NOTIFICATION
        // ============================================

        toast.success("Property listing created successfully!");
        router.push(`/create-thankyou`);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        toast.error("Failed to create property listing");
        return false;
      }
    } else {
      toast.error("Please add price to continue");
      setIsLoading(false);
      return false;
    }
  } catch (error) {
    setIsLoading(false);
    console.error("Error during submission:", error);
    toast.error("An error occurred. Please try again.");
    return false;
  }
};

  const [phoneError, setPhoneError] = useState("");

  const handleSubmitTab = (tab, error) => {
    if (error === "tab2") {
      let isPhoneValid = true;

      if (request.phone) {
        try {
          isPhoneValid = isValidPhoneNumber(request.phone);
          if (!isPhoneValid) {
            setPhoneError("Please enter a valid phone number");
          }
        } catch (error) {
          isPhoneValid = false;
          setPhoneError("Please enter a valid phone number");
        }
      } else {
        isPhoneValid = false;
        setPhoneError("Phone number is required");
      }

      const formValid = simpleValidator.current.allValid();

      if (!formValid) {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }

      if (isPhoneValid && formValid) {
        setPhoneError("");
        setActiveTab(tab);
      }
    } else if (error === "tab3") {
      if (property_type) {
        setActiveTab(tab);
      } else {
        toast.error("Please select property type");
      }
    } else if (error === "tab4") {
      const missingRequiredFields = getMissingRequiredFields();
      if (missingRequiredFields.length > 0) {
        toast.error(
          `Please complete required fields before uploading photos`
        );
        return;
      }
      const formValid = simpleValidator.current.allValid();
      if (!formValid) {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      } else {
        setActiveTab(tab);
      }
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <Layout>
      <div className="position-relative">
        <ul className="flight-tabs-ul">
          <li
            className={activeTab == 1 ? "active" : ""}
            onClick={() => handleSubmitTab(1)}
          >
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <ProfileSVG />
              </span>
              <span className="flight-tabs-text">Your Details</span>
            </Button>
          </li>
          <li
            className={activeTab == 2 ? "active" : ""}
            onClick={() => handleSubmitTab(2, "tab2")}
          >
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <PropertySVG />
              </span>
              <span className="flight-tabs-text">Property Listing/Type</span>
            </Button>
          </li>
          <li
            className={activeTab == 3 ? "active" : ""}
            onClick={() => handleSubmitTab(3, "tab3")}
          >
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <MapSVG />
              </span>
              <span className="flight-tabs-text">Property Details</span>
            </Button>
          </li>
          <li
            className={activeTab == 4 ? "active" : ""}
            onClick={() => handleSubmitTab(4, "tab4")}
          >
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <AlbumSVG />
              </span>
              <span className="flight-tabs-text">Property Photos</span>
            </Button>
          </li>
        </ul>
        <section className="list-step1">
          <div className="custom-container">
            <div className="row">
              <div
                className={`col-lg-10 mx-auto ${activeTab === 1
                    ? "medium-padding"
                    : activeTab === 3
                      ? "large-padding"
                      : ""
                  }`}
              >
                {activeTab == 1 && (
                  <Tab1
                    {...props}
                    propertyType={propertyType}
                    setPropertyType={setPropertyType}
                    handleChangeRequest={handleChangeRequest}
                    simpleValidator={simpleValidator}
                    request={request}
                    handleSubmit={handleSubmitTab}
                    countryOption={countryOption}
                    countryCode={countryCode}
                    handleCountryCode={handleCountryCode}
                    setRequest={setRequest}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    isValidPhoneNumber={isValidPhoneNumber}
                  />
                )}
                {activeTab == 2 && (
                  <ListStepTab2
                    {...props}
                    handleRequest={handleRequest}
                    loading={loading}
                    propertyTypeList={propertyTypeList}
                    property_type={property_type}
                    handleSubmit={handleSubmitTab}
                  />
                )}

                {activeTab == 3 && (
                  <ListStepTab3
                    {...props}
                    type={propertyType}
                    image={image}
                    saleRequest={saleRequest}
                    setSaleRequest={setSaleRequest}
                    handleChangeSaleRequest={handleChangeSaleRequest}
                    rentRequest={rentRequest}
                    setRentRequest={setRentRequest}
                    handleChangeRentRequest={handleChangeRentRequest}
                    handleChangeSelectId={handleChangeSelectId}
                    handleChangePushArray={handleChangePushArray}
                    cityList={cityList}
                    locationList={locationList}
                    locationAreaList={locationAreaList}
                    propertyBHKList={propertyBHKList}
                    developerList={developerList}
                    furnishingList={furnishingList}
                    facingList={facingList}
                    simpleValidator={simpleValidator}
                    amenitiesList={amenitiesList}
                    handleChangeSelect={handleChangeSelect}
                    logoPreview={logoPreview}
                    uploadImage={uploadImage}
                    property_type={property_type}
                    handleSubmit={handleSubmitTab}
                  />
                )}

                {activeTab == 4 && (
                  <ListStepTab4
                    {...props}
                    imageList={imageList}
                    isLoading={isLoading}
                    uploadImage={uploadImage}
                    handleSubmit={handleSubmit}
                    handleSubmitTab={handleSubmitTab}
                    handleRemoveImages={handleRemoveImages}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <RouteLeavingGuard
        // When should shouldBlockNavigation be invoked,
        // simply passing a boolean
        // (same as "when" prop of Prompt of React-Router)
        when={isDirty}
        // Navigate function
        navigate={(path) => history.push(path)}
        // Use as "message" prop of Prompt of React-Router
        shouldBlockNavigation={(location) => {
          // This case it blocks the navigation when:
          // 1. the login form is dirty, and
          // 2. the user is going to 'sign-up' scene.
          //    (Just an example, in real case you might
          //     need to block all location regarding this case)
          if (isDirty) {
            if (location.pathname === "/list-step1") {
              return true;
            }
          }
          return false;
        }}
      />
    </Layout>
  );
}
