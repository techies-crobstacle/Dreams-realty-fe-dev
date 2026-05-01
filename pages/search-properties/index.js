"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getValue } from "@utils/lodash";
import Pagination from "react-js-pagination";
import Router, { useRouter } from "next/router";
import Head from "next/head";

const Layout = dynamic(() => import("@components/layout.js"));
const PropertyLinks = dynamic(() =>
  import("@components/property-for-search/property-header-links.js")
);
const PropertyTitle = dynamic(() =>
  import("@components/property-for-search/property-title.js")
);
const PropertyCard = dynamic(() =>
  import("@components/property-for-search/property-card.js")
);
const PropertyMenu = dynamic(() =>
  import("@components/property-for-search/property-rent-menu.js")
);

import {
  fetchSaleProperties,
  fetchRentProperties,
  fetchCities,
  fetchLocations,
  fetchPropertyTypes,
} from "@services/APIs/common.service";

export default function PropertySale(props) {
  const router = useRouter();
  const url = getValue(router, "query", "");

  const [properties, setProperties] = useState([]);
  const [mapData, setMapData] = useState([]);
  // pagination
  const [limit, setLimit] = useState(12);
  const [activeSalePage, setActiveSalePage] = useState(1);
  const [activeRentPage, setActiveRentPage] = useState(1);
  const [salePageNumber, setSalePageNumber] = useState(1);
  const [rentPageNumber, setRentPageNumber] = useState(1);
  const [rentTotalCount, setRentTotalCount] = useState(0);
  const [saleTotalCount, setSaleTotalCount] = useState(0);
  // utils
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  //******** LOCATION STATE SECTION ******//
  // selected option
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  //  list data
  const [citiesList, setCitiesList] = useState([]);
  const [cityLocationList, setCityLocationList] = useState([]);
  // loading
  const [cityLoading, setCityLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  // city location search:
  const [citySearchInput, setCitySearchInput] = useState("");
  // toggle
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //******** PROPERTY TYPE STATE SECTION ******//
  // selected option
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  //  list data
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  // toggle
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);

  //******** BUDGET STATE SECTION ******//

  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);

  const [selectedMinBudget, setSelectedMinBudget] = useState("");
  const [selectedMaxBudget, setSelectedMaxBudget] = useState("");

  //******** Area STATE SECTION ******//

  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const toggle3 = () => setDropdownOpen3((prevState) => !prevState);

  const [selectedMinArea, setSelectedMinArea] = useState("");
  const [selectedMaxArea, setSelectedMaxArea] = useState("");

  //******** STATUS STATE SECTION ******//
  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const toggleStatus = () => setDropdownOpenStatus((prevState) => !prevState);
  const [
    selectedPropertyConstructionStatus,
    setSelectedPropertyConstructionStatus,
  ] = useState("");
  const [statusFilter] = useState([
    { value: "Under_Construction", label: "Under Construction" },
    { value: "Ready_Homes", label: "Ready Homes" },
    { value: "New_Launch", label: "New Launch" },
    { value: "Nearing_Completion", label: "Nearing Completion" },
    { value: "Resale", label: "Resale" },
  ]);

  //******** Filter STATE SECTION ******//
  const [showHideFiltersPopup, setShowHideFiltersPopup] = useState(false);
  const filterPopup = () => {
    setShowHideFiltersPopup(!showHideFiltersPopup);
  };
  const [furnishing, setFurnishing] = useState("");
  const [facing, setFacing] = useState("");
  const [bhk_lte, setBhk_lte] = useState("");
  const [bhk_gte, setBhk_gte] = useState("");
  const [filtersObj, setFiltersObj] = useState({
    BHK: [
      { name: "01", value: "1", checked: false },
      { name: "02", value: "2", checked: false },
      { name: "03", value: "3", checked: false },
      { name: "04", value: "4", checked: false },
      { name: "More than 5", value: "5", checked: false },
    ],
    Furnishing: [
      { name: "Furnished", value: "furnished", checked: false },
      { name: "Semi-furnished", value: "semi_furnished", checked: false },
      { name: "Unfurnished", value: "unfurnished", checked: false },
    ],
    Facing: [
      { name: "East", value: "east", checked: false },
      { name: "North", value: "north", checked: false },
      { name: "West", value: "west", checked: false },
      { name: "North - East", value: "north_east", checked: false },
      { name: "North - West", value: "north_west", checked: false },
      { name: "South - East", value: "south_east", checked: false },
      { name: "South - West", value: "south_west", checked: false },
    ],
  });

  const [developer, setDeveloper] = useState("");

  useEffect(() => {
    getCities();
    getPropertyTypes();
    // active tab
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const type = getValue(params, "type", null);

    setActiveTab(type);
    if (type === "2") {
      const rentPage = parseFloat(getValue(params, "page", 1));
      setRentPageNumber(rentPage);
      setActiveRentPage(rentPage === 0 ? 1 : rentPage);
      getRentProperties(rentPage);
    } else {
      const salePage = parseFloat(getValue(params, "page", 1));
      setSalePageNumber(salePage);
      setActiveSalePage(salePage === 0 ? 1 : salePage);
      getSaleProperties(salePage);
    }

    // pre fetch data
    if (getValue(params, "bhk_gte")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.BHK.length; ++i) {
          if (filtersObj.BHK[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexBHK = getIndex(getValue(params, "bhk_gte"));
      handleClickOnPopup(
        filtersObj.BHK[parseInt(indexBHK)],
        "BHK",
        parseInt(indexBHK)
      );
    }
    if (getValue(params, "bhk_lte")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.BHK.length; ++i) {
          if (filtersObj.BHK[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexBHK = getIndex(getValue(params, "bhk_lte"));
      handleClickOnPopup(
        filtersObj.BHK[parseInt(indexBHK)],
        "BHK",
        parseInt(indexBHK)
      );
    }
    if (getValue(params, "facing")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.Facing.length; ++i) {
          if (filtersObj.Facing[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexFacing = getIndex(getValue(params, "facing"));
      handleClickOnPopup(
        filtersObj.Facing[parseInt(indexFacing)],
        "Facing",
        parseInt(indexFacing)
      );
    }
    if (getValue(params, "furnishing")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.Furnishing.length; ++i) {
          if (filtersObj.Furnishing[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexFacing = getIndex(getValue(params, "furnishing"));
      handleClickOnPopup(
        filtersObj.Furnishing[parseInt(indexFacing)],
        "Furnishing",
        parseInt(indexFacing)
      );
    }
    if (getValue(params, "property_construction_status", "")) {
      setSelectedPropertyConstructionStatus(
        getValue(params, "property_construction_status", "")
      );
    }
    setSelectedMinBudget(getValue(params, "price_gte", ""));
    setSelectedMaxBudget(getValue(params, "price_lte", ""));
    if (params.type === "1") {
      setSelectedMinArea(getValue(params, "super_build_up_area_gte", ""));
      setSelectedMaxArea(getValue(params, "super_build_up_area_lte", ""));
    } else {
      setSelectedMinArea(getValue(params, "build_up_area_gte", ""));
      setSelectedMaxArea(getValue(params, "build_up_area_lte", ""));
    }
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const type = getValue(params, "type", null);

    setActiveTab(type);

    setActiveTab(type);
    const currentPage = parseFloat(params.page) || 1;

    if (type === "2") {
      setRentPageNumber(currentPage);
      setActiveRentPage(currentPage === 0 ? 1 : currentPage);
      getRentProperties(currentPage);
    } else {
      setSalePageNumber(currentPage);
      setActiveSalePage(currentPage === 0 ? 1 : currentPage);
      getSaleProperties(currentPage);
    }

    // pre fetch data
    if (getValue(params, "bhk_gte")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.BHK.length; ++i) {
          if (filtersObj.BHK[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexBHK = getIndex(getValue(params, "bhk_gte"));
      handleClickOnPopup(
        filtersObj.BHK[parseInt(indexBHK)],
        "BHK",
        parseInt(indexBHK)
      );
    }
    if (getValue(params, "bhk_lte")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.BHK.length; ++i) {
          if (filtersObj.BHK[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexBHK = getIndex(getValue(params, "bhk_lte"));
      handleClickOnPopup(
        filtersObj.BHK[parseInt(indexBHK)],
        "BHK",
        parseInt(indexBHK)
      );
    }
    if (getValue(params, "facing")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.Facing.length; ++i) {
          if (filtersObj.Facing[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexFacing = getIndex(getValue(params, "facing"));
      handleClickOnPopup(
        filtersObj.Facing[parseInt(indexFacing)],
        "Facing",
        parseInt(indexFacing)
      );
    }
    if (getValue(params, "furnishing")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.Furnishing.length; ++i) {
          if (filtersObj.Furnishing[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexFacing = getIndex(getValue(params, "furnishing"));
      handleClickOnPopup(
        filtersObj.Furnishing[parseInt(indexFacing)],
        "Furnishing",
        parseInt(indexFacing)
      );
    }
    // if (getValue(params, "developer", "")) {
    //   setDeveloper(getValue(params, "developer", ""));
    // }
    setSelectedMinBudget(getValue(params, "price_gte", ""));
    setSelectedMaxBudget(getValue(params, "price_lte", ""));
    if (params.type === "1") {
      setSelectedMinArea(getValue(params, "super_build_up_area_gte", ""));
      setSelectedMaxArea(getValue(params, "super_build_up_area_lte", ""));
    } else {
      setSelectedMinArea(getValue(params, "build_up_area_gte", ""));
      setSelectedMaxArea(getValue(params, "build_up_area_lte", ""));
    }
    // }
  }, [typeof window !== "undefined" && window.location.href]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const type = getValue(params, "type", null);

    setActiveTab(type);

    if (type === "1") {
      getSaleProperties();
    } else {
      getRentProperties();
    }
  }, [props.query, developer, salePageNumber, rentPageNumber]);

  // get sale properties
  const getSaleProperties = async (query, pageNumber) => {
    try {
      setIsLoading(true);

      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const currentPage = parseFloat(params.page) || 1;
      let locationFilter = getValue(params, "location_area", "");

      const where = {
        ...params,
        "filters[hide_in_list][$eq]": false,
      };

      delete where.page;
      delete where.type;

      if (params.type === "1") {
        delete where.build_up_area_gte;
        delete where.build_up_area_lte;
      } else {
        delete where.super_build_up_area_gte;
        delete where.super_build_up_area_lte;
      }

      const filter = {
        "filters[hide_in_list][$eq]": false,
        "pagination[pageSize]": limit,
        "pagination[page]": currentPage,
      };

      if (params.property_type) {
        filter["filters[property_type][$eq]"] = params.property_type;
      }

      if (params.developer) {
        filter["filters[developer][slug][$eq]"] = params.developer;
      }

      if (selectedPropertyConstructionStatus) {
        filter["filters[property_construction_status][$eq]"] =
          selectedPropertyConstructionStatus;
      }

      if (selectedPropertyType) {
        filter["filters[property_type][$eq]"] = selectedPropertyType.id;
      }

      if (furnishing) {
        filter["filters[furnishing][$eq]"] = furnishing;
      }
      if (facing) {
        filter["filters[facing][$eq]"] = facing;
      }
      if (locationFilter) {
        filter["filters[location_area][slug][$eq]"] = locationFilter;
      }

      if (selectedMinBudget && selectedMaxBudget) {
        filter["filters[price][$gte]"] = selectedMinBudget;
        filter["filters[price][$lte]"] = selectedMaxBudget;
      }

      if (selectedMinArea && selectedMaxArea) {
        filter["filters[super_build_up_area_max][$lte]"] = selectedMaxArea;
        filter["filters[super_build_up_area_min][$gte]"] = selectedMinArea;
      }

      if (bhk_gte) {
        filter["filters[property_bhks][value][$lte]"] = bhk_gte;
      }

      if (bhk_lte >= "5") {
        filter["filters[property_bhks][value][$gte]"] = bhk_lte;
      }

      if (params.title_contains) {
        filter["filters[title][$containsi]"] = params.title_contains;
      }

      let resp = await fetchSaleProperties(filter);

      if (resp) {
        setProperties(getValue(resp, "data", []));
        setSaleTotalCount(getValue(resp, "meta.pagination.total", 0));

        let map =
          getValue(resp, "data.length", 0) !== 0 &&
          getValue(resp, "data", []).map((item) => ({
            image: getValue(item, `cover_image.url`, ""),
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            name: item.title,
            address: item.address,
            slug: item.slug,
            type: "sale",
          }));
        setMapData(map.length !== 0 ? map : []);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      if (showHideFiltersPopup) {
        setShowHideFiltersPopup(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (showHideFiltersPopup) {
        setShowHideFiltersPopup(false);
      }
    }
  };

  // get rent properties
  const getRentProperties = async (query, pageNumber) => {
    try {
      setIsLoading(true);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const currentPage = parseFloat(params.page) || 1;
      let locationFilter = getValue(params, "location_area", "");

      const where = {
        ...params,
        "filters[hide_in_list][$eq]": false,
      };

      delete where.page;
      delete where.type;

      if (params.type === "1") {
        delete where.build_up_area_gte;
        delete where.build_up_area_lte;
      } else {
        delete where.super_build_up_area_gte;
        delete where.super_build_up_area_lte;
      }

      const filter = {
        "filters[hide_in_list][$eq]": false,
        "pagination[pageSize]": limit,
        "pagination[page]": currentPage,
      };

      if (params.developer) {
        filter["filters[developer][slug][$containsi]"] = params.developer;
      }

      if (selectedPropertyType) {
        filter["filters[property_type][$eq]"] = selectedPropertyType.id;
      }
      if (furnishing) {
        filter["filters[furnishing][$eq]"] = furnishing;
      }
      if (facing) {
        filter["filters[facing][$eq]"] = facing;
      }
      if (locationFilter) {
        filter["filters[location_area][slug][$eq]"] = locationFilter;
      }

      if (selectedMinBudget && selectedMaxBudget) {
        filter["filters[price][$gte]"] = selectedMinBudget;
        filter["filters[price][$lte]"] = selectedMaxBudget;
      }

      if (selectedMinArea && selectedMaxArea) {
        filter["filters[build_up_area_max][$lte]"] = selectedMaxArea;
        filter["filters[build_up_area_min][$gte]"] = selectedMinArea;
      }

      if (bhk_gte) {
        filter["filters[property_bhks][value][$lte]"] = bhk_gte;
      }

      if (bhk_lte >= "5") {
        filter["filters[property_bhks][value][$gte]"] = bhk_lte;
      }

      let resp = await fetchRentProperties(filter);

      if (resp) {
        setProperties(getValue(resp, "data", []));
        setRentTotalCount(getValue(resp, "meta.pagination.total", 0));
        let map =
          getValue(resp, "data.length", 0) !== 0 &&
          getValue(resp, "data", []).map((item) => ({
            image: getValue(item, `cover_image.url`, ""),
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            name: item.title,
            address: item.address,
            slug: item.slug,
            type: "rent",
          }));
        setMapData(map.length !== 0 ? map : []);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      if (showHideFiltersPopup) {
        setShowHideFiltersPopup(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (showHideFiltersPopup) {
        setShowHideFiltersPopup(false);
      }
    }
  };

  //******** LOCATION API SECTION ******//

  const getCities = async () => {
    try {
      setCityLoading(true);
      let resp = await fetchCities();
      if (resp) {
        setCitiesList(getValue(resp, "data", []));
        getCityLocation(getValue(resp, "data[0].id", ""));
        setSelectedCity(getValue(resp, "data[0].id", ""));
        setCityLoading(false);
      } else {
        setCityLoading(false);
      }
    } catch (error) {
      setCityLoading(false);
    }
  };
  const getCityLocation = async (id) => {
    try {
      let where = {
        where: {
          city: id,
        },
      };
      setLocationLoading(true);
      let resp = await fetchLocations(where);
      if (resp) {
        // pre-fetch url data
        const urlSearchParams = new URLSearchParams(
          process.browser && window.location.search
        );
        const params = Object.fromEntries(urlSearchParams.entries());
        const getLocation = getValue(resp, "data", []).filter(
          (item) => item.id === getValue(params, "location_area", "")
        );
        setSelectedLocation(getLocation.length > 0 ? getLocation[0] : {});
        // update data
        setCityLocationList(getValue(resp, "data", []));
        getResultLocationCities(getValue(resp, "data[0].id", ""));
        setSelectedLocation(getValue(resp, "data[0].id", ""));
        setLocationLoading(false);
      } else {
        setLocationLoading(false);
      }
    } catch (error) {
      setLocationLoading(false);
    }
  };
  const getCityLocationAfterSearch = async (e, id) => {
    const { name, value } = e.target;
    setCitySearchInput(value);
    if (value) {
      try {
        let where = {
          // where: {
          //   city: id,
          //   title_contains: value,
          "filters[title][$contains]": value,
          "filters[hide_in_list][$eq]": false,
          // },
        };
        setLocationLoading(true);
        let resp = await fetchLocations(where);
        if (resp) {
          setCityLocationList(getValue(resp, "data", []));
          getResultLocationCities(getValue(resp, "data[0].id", ""));
          setSelectedLocation(getValue(resp, "data[0].id", ""));
          setLocationLoading(false);
        } else {
          setLocationLoading(false);
        }
      } catch (error) {
        setLocationLoading(false);
      }
    } else {
      getCities();
    }
  };
  //******** PROPERTY TYPE API SECTION ******//

  const getPropertyTypes = async () => {
    try {
      let resp = await fetchPropertyTypes();
      if (resp) {
        const urlSearchParams = new URLSearchParams(
          process.browser && window.location.search
        );
        const params = Object.fromEntries(urlSearchParams.entries());
        const propertyTypeFromUrl = getValue(params, "property_type", "");

        const propertyTypes = getValue(resp, "data", []);

        const matchingPropertyType = propertyTypes.find((item) => {
          return item.id === propertyTypeFromUrl;
        });

        if (matchingPropertyType) {
          setSelectedPropertyType(matchingPropertyType.id);
        }

        setPropertyTypeList(propertyTypes);
      }
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };

  const onChangeFilterPopup = (item, type, index, status) => {
    if (type === "Facing") {
      if (item.value === facing) {
        setFacing("");
        filtersObj.Facing.forEach((item) => {
          item.checked = false;
        });
      } else {
        setFacing(item.value);
        filtersObj.Facing.forEach((item, i) => {
          if (index === i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      }
    } else if (type === "Furnishing") {
      if (item.value === furnishing) {
        setFurnishing("");
        filtersObj.Furnishing.forEach((item) => {
          item.checked = false;
        });
      } else {
        setFurnishing(item.value);
        filtersObj.Furnishing.forEach((item, i) => {
          if (index === i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      }
    } else if (type === "BHK") {
      if (parseFloat(item.value) < 5) {
        if (parseFloat(item.value) === bhk_gte) {
          setBhk_gte("");
          setBhk_lte("");
          filtersObj.BHK.forEach((item, i) => {
            item.checked = false;
          });
        } else {
          setBhk_gte(parseFloat(item.value));
          setBhk_lte("");
          filtersObj.BHK.forEach((item, i) => {
            if (index === i) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        }
      } else {
        if (parseFloat(item.value) === bhk_lte) {
          setBhk_lte("");
          setBhk_gte("");
          filtersObj.BHK.forEach((item, i) => {
            item.checked = false;
          });
        } else {
          setBhk_lte(parseFloat(item.value));
          setBhk_gte("");
          filtersObj.BHK.forEach((item, i) => {
            if (index === i) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        }
      }
    }
  };

  const clearFilters = async () => {
    setFiltersObj({
      BHK: [
        { name: "01", value: "1", checked: false },
        { name: "02", value: "2", checked: false },
        { name: "03", value: "3", checked: false },
        { name: "04", value: "4", checked: false },
        { name: "More than 5", value: "5", checked: false },
      ],
      Furnishing: [
        { name: "Furnished", value: "furnished", checked: false },
        { name: "Semi-furnished", value: "semi_furnished", checked: false },
        { name: "Unfurnished", value: "unfurnished", checked: false },
      ],
      Facing: [
        { name: "East", value: "east", checked: false },
        { name: "North", value: "north", checked: false },
        { name: "West", value: "west", checked: false },
        { name: "North - East", value: "north_east", checked: false },
        { name: "North - West", value: "north_west", checked: false },
        { name: "South - East", value: "south_east", checked: false },
        { name: "South - West", value: "south_west", checked: false },
      ],
    });
    setFacing("");
    setFurnishing("");
    setBhk_gte("");
    setBhk_lte("");
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    delete params.furnishing;
    delete params.facing;
    delete params.bhk_gte;
    delete params.bhk_lte;
    Router.push({
      pathname: `/search-properties`,
      query: params,
    });
    setShowHideFiltersPopup(false);
  };

  // ************************************************************** //
  // *******************    Pagination Function   ***************** //
  // ************************************************************** //

  // sale properties
  const onPageChangeHandlerSale = (pageNumber) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    setActiveSalePage(pageNumber);
    setSalePageNumber(pageNumber);

    params.page = pageNumber > 1 ? pageNumber : 0;
    params.type = 1;

    Router.push({
      pathname: `/property-for-sale`,
      query: params,
    });
  };

  // rent properties
  const onPageChangeHandlerRent = (pageNumber) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    setActiveRentPage(pageNumber);
    setRentPageNumber(pageNumber);

    params.page = pageNumber > 1 ? pageNumber : 0;
    params.type = 2;

    Router.push({
      pathname: `/property-for-rent`,
      query: params,
    });
  };

  // ************************************************************** //
  // *******************         Change Tab       ***************** //
  // ************************************************************** //

  const handleChangeTab = (activeTab) => {
    setRentTotalCount(0);
    setSaleTotalCount(0);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.type === "2") {
      delete params.build_up_area_gte;
      delete params.build_up_area_lte;
    } else {
      setSelectedPropertyConstructionStatus("");
      delete params.property_construction_status;
      delete params.super_build_up_area_gte;
      delete params.super_build_up_area_lte;
    }
    params.page = 0;
    params.type = activeTab;
    Router.push({
      pathname: `/search-properties`,
      query: params,
    });
  };

  // ************************************************************** //
  // *******************    Common Filter Function   ************** //
  // ************************************************************** //

  const handleClosePopups = (toggles) => {
    if (toggles === "toggle1") {
      toggle();
    } else if (toggles === "toggle2") {
      toggle1();
    } else if (toggles === "toggle3") {
      toggle2();
    } else if (toggles === "toggle4") {
      toggle3();
    } else if (toggles === "toggleStatus") {
      toggleStatus();
    }
  };

  const handleRemoveFilters = (value) => {
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (value === "selectedLocation") {
      setSelectedLocation("");
      delete params.location;
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    } else if (value === "selectedPropertyType") {
      setSelectedPropertyType("");
      delete params.property_type;
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    } else if (value === "selectedMinBudget") {
      setSelectedMaxBudget("");
      setSelectedMinBudget("");
      delete params.price_lte;
      delete params.price_gte;
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    } else if (value === "selectedMinArea") {
      const urlSearchParams = new URLSearchParams(
        process.browser && window.location.search
      );
      const params = Object.fromEntries(urlSearchParams.entries());
      setSelectedMaxArea("");
      setSelectedMinArea("");
      if (params.type === "2") {
        delete params.build_up_area_gte;
        delete params.build_up_area_lte;
      } else {
        delete params.super_build_up_area_gte;
        delete params.super_build_up_area_lte;
      }
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    } else if (value === "property_construction_status") {
      setSelectedPropertyConstructionStatus("");
      delete params.property_construction_status;
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    }
    // handleFetchFiltersDelete({}, value);
  };

  // ************************************************************** //
  // *******************     Location Filter       **************** //
  // ************************************************************** //

  const handleClickOnLocation = async (obj) => {
    setCitySearchInput(obj.title);
    setSelectedLocation(obj);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.location = obj.id;
    Router.push({
      pathname: "/search-properties",
      query: params,
    });
    handleClosePopups("toggle1");
  };

  // ************************************************************** //
  // *******************     properties Filter      *************** //
  // ************************************************************** //

  const handleClickOnPropertyType = async (e) => {
    setSelectedPropertyType(e);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.property_type = e.id;
    Router.push({
      pathname: "/search-properties",
      query: params,
    });
    handleClosePopups("toggle2");
  };

  // ************************************************************** //
  // *******************     Budget Filter          *************** //
  // ************************************************************** //

  const handleClickOnBudget = async (obj) => {
    setSelectedMinBudget(obj.minBudget);
    setSelectedMaxBudget(obj.maxBudget);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.price_lte = obj.maxBudget;
    params.price_gte = obj.minBudget;
    Router.push({
      pathname: "/search-properties",
      query: params,
    });
    handleClosePopups("toggle3");
  };

  // ************************************************************** //
  // *******************       Area Filter          *************** //
  // ************************************************************** //

  const handleClickOnArea = async (obj) => {
    setSelectedMinArea(obj.minArea);
    setSelectedMaxArea(obj.maxArea);
    if (activeTab === "2") {
      const urlSearchParams = new URLSearchParams(
        process.browser && window.location.search
      );
      const params = Object.fromEntries(urlSearchParams.entries());
      params.build_up_area_lte = obj.maxArea;
      params.build_up_area_gte = obj.minArea;
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    } else {
      const urlSearchParams = new URLSearchParams(
        process.browser && window.location.search
      );
      const params = Object.fromEntries(urlSearchParams.entries());
      params.super_build_up_area_lte = obj.maxArea;
      params.super_build_up_area_gte = obj.minArea;
      Router.push({
        pathname: "/search-properties",
        query: params,
      });
    }
    handleClosePopups("toggle4");
  };

  // ************************************************************** //
  // *******************       status Filter          *************** //
  // ************************************************************** //

  const handleChangePropertyStatus = async (value) => {
    setSelectedPropertyConstructionStatus(value);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.property_construction_status = value;

    Router.push({
      pathname: "/search-properties",
      query: params,
    });
    handleClosePopups("toggleStatus");
  };

  // ************************************************************** //
  // *******************       More Filter          *************** //
  // ************************************************************** //

  const handleClickOnPopup = (item, type, index, status) => {
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (type === "Facing") {
      if (item.value === facing) {
        setFacing("");
        filtersObj.Facing.forEach((item) => {
          item.checked = false;
        });
        delete params.facing;
      } else {
        setFacing(item.value);
        filtersObj.Facing.forEach((item, i) => {
          if (index === i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        delete params.facing;
      }
    } else if (type === "Furnishing") {
      if (item.value === furnishing) {
        setFurnishing("");
        filtersObj.Furnishing.forEach((item) => {
          item.checked = false;
        });
        delete params.furnishing;
      } else {
        setFurnishing(item.value);
        filtersObj.Furnishing.forEach((item, i) => {
          if (index === i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      }
    } else if (type === "BHK") {
      if (parseFloat(item.value) < 5) {
        if (parseFloat(item.value) === bhk_gte) {
          setBhk_gte("");
          setBhk_lte("");
          filtersObj.BHK.forEach((item, i) => {
            item.checked = false;
          });
        } else {
          setBhk_gte(parseFloat(item.value));
          setBhk_lte("");
          filtersObj.BHK.forEach((item, i) => {
            if (index === i) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        }
        delete params.bhk_gte;
      } else {
        if (parseFloat(item.value) === bhk_lte) {
          setBhk_lte("");
          setBhk_gte("");
          filtersObj.BHK.forEach((item, i) => {
            item.checked = false;
          });
        } else {
          setBhk_lte(parseFloat(item.value));
          setBhk_gte("");
          filtersObj.BHK.forEach((item, i) => {
            if (index === i) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        }
        delete params.bhk_lte;
      }
    }
  };

  const handleClickOnPopupSubmitFilter = async () => {
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (bhk_lte) {
      params.furnishing = furnishing;
      params.facing = facing;
      params.bhk_lte = bhk_lte;
    } else {
      params.furnishing = furnishing;
      params.facing = facing;
      params.bhk_gte = bhk_gte;
    }
    if (!params.bhk_gte) {
      delete params.bhk_gte;
    }
    if (!params.facing) {
      delete params.facing;
    }
    if (!params.furnishing) {
      delete params.furnishing;
    }
    Router.push({
      pathname: "/search-properties",
      query: params,
    });
    setShowHideFiltersPopup(false);
    // handleFilters(where);
  };

  return (
    <>
      <Head>
        <title>Exploring Dreams Realty: Your Gateway to Dream Properties</title>
        <meta
          name="description"
          content="Dreams Realty offers a comprehensive property search for all your real estate needs. Start your search now and find your dream home"
        ></meta>
      </Head>
      <Layout>
        <div className="position-relative">
          <PropertyLinks
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
          />
          <PropertyMenu
            // status filter
            statusFilter={statusFilter}
            dropdownOpenStatus={dropdownOpenStatus}
            toggleStatus={toggleStatus}
            handleChangePropertyStatus={handleChangePropertyStatus}
            selectedPropertyConstructionStatus={
              selectedPropertyConstructionStatus
            }
            activeTab={activeTab}
            // location filter
            citiesList={citiesList}
            cityLocationList={cityLocationList}
            getCityLocationAfterSearch={getCityLocationAfterSearch}
            citySearchInput={citySearchInput}
            locationLoading={locationLoading}
            onclickOfLocation={handleClickOnLocation}
            dropdownOpen={dropdownOpen}
            toggle={toggle}
            selectedLocation={selectedLocation}
            // propertyTypeFilter
            dropdownOpen1={dropdownOpen1}
            toggle1={toggle1}
            propertyTypeList={propertyTypeList}
            selectedPropertyType={selectedPropertyType}
            handleChangePropertyType={handleClickOnPropertyType}
            // budget
            handleSubmitBudget={handleClickOnBudget}
            dropdownOpen2={dropdownOpen2}
            toggle2={toggle2}
            selectedMinBudget={selectedMinBudget}
            selectedMaxBudget={selectedMaxBudget}
            // area
            dropdownOpen3={dropdownOpen3}
            toggle3={toggle3}
            selectedMinArea={selectedMinArea}
            selectedMaxArea={selectedMaxArea}
            handleSubmitArea={handleClickOnArea}
            // filter
            handleSubmitFilter={handleClickOnPopupSubmitFilter}
            filterPopup={filterPopup}
            showHideFiltersPopup={showHideFiltersPopup}
            onChangeFilterPopup={onChangeFilterPopup}
            furnishing={furnishing}
            facing={facing}
            bhk_lte={bhk_lte}
            bhk_gte={bhk_gte}
            filtersObj={filtersObj}
            clearFilters={clearFilters}
            handleRemoveFilters={handleRemoveFilters}
            type={activeTab === "1" ? "sale" : "rent"}
          />
          <PropertyTitle
            isLoading={isLoading}
            mapData={mapData}
            totalLength={getValue(properties, "length", 0)}
          />

          <PropertyCard
            rentLoading={isLoading}
            rentPropertiesList={properties}
            activeTab={activeTab}
          />

          {activeTab === "1" ? (
            <div className="mb-4 mt-4">
              {saleTotalCount > 12 ? (
                <Pagination
                  activePage={activeSalePage}
                  itemsCountPerPage={12}
                  totalItemsCount={saleTotalCount}
                  pageRangeDisplayed={5}
                  onChange={onPageChangeHandlerSale}
                />
              ) : (
                <br />
              )}
            </div>
          ) : rentTotalCount > 12 ? (
            <div className="mb-4 mt-4">
              <Pagination
                activePage={activeRentPage}
                itemsCountPerPage={12}
                totalItemsCount={rentTotalCount}
                pageRangeDisplayed={5}
                onChange={onPageChangeHandlerRent}
              />
              <br />
            </div>
          ) : (
            <br />
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let queries = context.query;
  return {
    props: {
      query: queries,
    }, // will be passed to the page component as props
  };
}
