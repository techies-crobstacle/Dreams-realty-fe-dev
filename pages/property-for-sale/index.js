"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getValue, setValue } from "@utils/lodash";
import Pagination from "react-js-pagination";
import Router from "next/router";
import Meta from "../seo-meta";

// Dynamically import components
const Layout = dynamic(() => import("@components/layout.js"));
const PropertyLinks = dynamic(() =>
  import("../../components/property-for-sale/propert-header-links")
);
const PropertyMenu = dynamic(() =>
  import("@components/property-for-rent/property-rent-menu.js")
);
const PropertyTitle = dynamic(() =>
  import("@components/property-for-rent/property-title.js")
);
const PropertyCard = dynamic(() =>
  import("@components/property-for-sale/property-card.js")
);
const HomeCTA = dynamic(() => import("@components/home/cta/HomeCTA"));

// Static imports for services
import {
  fetchSaleProperties,
  fetchPropertyTypes,
  fetchCities,
  fetchLocations,
} from "@services/APIs/common.service";
import MapView from "@components/property-for-sale/map-view";

export default function PropertySale() {
  const [salePropertiesList, setSalePropertiesList] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [saleLoading, setSaleLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [skip, setSkip] = useState(0);
  const [activePage, setActivePage] = useState(1);

  // New state for applied filters (from popup)
  const [appliedAdvancedFilters, setAppliedAdvancedFilters] = useState({
    furnishing: "",
    facing: "",
    bhk_lte: "",
    bhk_gte: "",
  });

  // New state for search title
  const [searchTitle, setSearchTitle] = useState("");

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
  const [selectedPropertyTitle, setSelectedPropertyTitle] = useState("");
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
      { name: "South", value: "south", checked: false },
      { name: "West", value: "west", checked: false },
      { name: "North - East", value: "north_east", checked: false },
      { name: "North - West", value: "north_west", checked: false },
      { name: "South - East", value: "south_east", checked: false },
      { name: "South - West", value: "south_west", checked: false },
    ],
  });

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

  //Call to action
  const [showCta, setShowCta] = useState(false);
  const [selectedPropertyName, setSelectedPropertyName] = useState("");
const [selectedPropertyCategory, setSelectedPropertyCategory] = useState("");
  const [ctaPropType, setCtaPropType] = useState("");
  const [ctaPropId, setCtaPropId] = useState("");
  // const toggleCta = (type, id) => {
  //   setShowCta(!showCta);
  //   setCtaPropType(type);
  //   setCtaPropId(id);
  // };

  const toggleCta = (type, id, propertyName, propertyCategory) => {
  setShowCta(!showCta);
  setCtaPropType(type);
  setCtaPropId(id);
  setSelectedPropertyName(propertyName); // Add this
  setSelectedPropertyCategory(propertyCategory); // Add this
};

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    
    // pagination module - Init from URL
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    setPageNumber(parseFloat(params.page));
    setActivePage(
      params.page
        ? parseFloat(params.page) <= 0
          ? 1
          : parseFloat(params.page) + 1
        : 1
    );

    // Initial load logic for other filters from URL
    if (params.title_contains) {
      setSearchTitle(params.title_contains);
    }

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
    setSelectedPropertyConstructionStatus(
      getValue(params, "property_construction_status", "")
    );
    setSelectedMinBudget(getValue(params, "price_gte", ""));
    setSelectedMaxBudget(getValue(params, "price_lte", ""));
    setSelectedMinArea(getValue(params, "super_build_up_area_gte", ""));
    setSelectedMaxArea(getValue(params, "super_build_up_area_lte", ""));

    // Initialize appliedAdvancedFilters from URL params
    setAppliedAdvancedFilters({
      furnishing: getValue(params, "furnishing", ""),
      facing: getValue(params, "facing", ""),
      bhk_lte: getValue(params, "bhk_lte", ""),
      bhk_gte: getValue(params, "bhk_gte", ""),
    });

    getCities();
    getPropertyTypes();
    // getSaleProperties called via the useEffect dependency on State
  }, []);

  // Use Effect to trigger fetch when filters change
  useEffect(() => {
    getSaleProperties();
  }, [
    activePage,
    selectedLocation,
    selectedPropertyConstructionStatus,
    selectedPropertyType,
    selectedMinBudget,
    selectedMaxBudget,
    selectedMinArea,
    selectedMaxArea,
    appliedAdvancedFilters, // Listen to applied popup filters
    searchTitle
  ]);

  //******** SALE PROPERTIES API SECTION ******//

  const getSaleProperties = async () => {
    try {
      setSaleLoading(true);
      
      let filter = {
        "filters[hide_in_list][$eq]": false,
        "pagination[pageSize]": limit,
        "pagination[page]": activePage,
      };

      if (selectedPropertyConstructionStatus) {
        filter["filters[property_construction_status][$eq]"] =
          selectedPropertyConstructionStatus;
      }

      if (searchTitle) {
        filter["filters[title][$containsi]"] = searchTitle;
      }
      if (selectedPropertyType) {
        // Handle both Object and potential ID string cases if legacy code set it as string
        const typeId = selectedPropertyType.id || selectedPropertyType;
        if(typeId) filter["filters[property_type][id][$eq]"] = typeId;
      }
      
      // Use appliedAdvancedFilters for these
      if (appliedAdvancedFilters.furnishing) {
        filter["filters[furnishing][$eq]"] = appliedAdvancedFilters.furnishing;
      }
      if (appliedAdvancedFilters.facing) {
        filter["filters[facing][$eq]"] = appliedAdvancedFilters.facing;
      }
      if (selectedLocation && selectedLocation.id) {
        filter["filters[location][id][$eq]"] = selectedLocation.id;
      }

      if (selectedMinBudget && selectedMaxBudget) {
        filter["filters[price][$gte]"] = selectedMinBudget;
        filter["filters[price][$lte]"] = selectedMaxBudget;
      }

      if (selectedMinArea && selectedMaxArea) {
        filter["filters[super_build_up_area_max][$lte]"] = selectedMaxArea;
        filter["filters[super_build_up_area_min][$gte]"] = selectedMinArea;
      }

      if (appliedAdvancedFilters.bhk_gte) {
        filter["filters[property_bhks][value][$lte]"] = appliedAdvancedFilters.bhk_gte;
      }

      if (appliedAdvancedFilters.bhk_lte && appliedAdvancedFilters.bhk_lte >= "5") {
        filter["filters[property_bhks][value][$gte]"] = appliedAdvancedFilters.bhk_lte;
      }

      // Fetch sale properties, mapped properties, and count
      let resp = await fetchSaleProperties(filter);

      // Handle the fetched data
      if (resp) {
        setTotalCount(getValue(resp, "meta.pagination.total", 0));
        setSalePropertiesList(getValue(resp, "data", []));
        setSaleLoading(false);

        let maps =
          getValue(resp, "data.length", 0) > 0 &&
          getValue(resp, "data", []).map((item) => ({
            image: getValue(item, `cover_image.url`, ""),
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            name: item.title,
            address: item.address,
            slug: item.slug,
            type: "sale",
          }));

        setMapData(maps.length !== 0 ? maps : []);

        if (showHideFiltersPopup) {
          setShowHideFiltersPopup(false);
        }
      } else {
        setSaleLoading(false);
        if (showHideFiltersPopup) {
          setShowHideFiltersPopup(false);
        }
      }
    } catch (error) {
      setSaleLoading(false);
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

        //  update state
        setCityLocationList(getValue(resp, "data", []));
        getResultLocationCities(getValue(resp, "data[0].id", ""));
        if (!getLocation.length) {
            setSelectedLocation(getValue(resp, "data[0]", ""));
        }
        setLocationLoading(false);
      } else {
        setLocationLoading(false);
      }
    } catch (error) {
      setLocationLoading(false);
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
          return String(item.id) === String(propertyTypeFromUrl);
        });

        if (matchingPropertyType) {
          setSelectedPropertyType(matchingPropertyType); // Store object, not ID string to match other logic
        }

        setPropertyTypeList(propertyTypes);
      }
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };

  const getCityLocationAfterSearch = async (e, id) => {
    const { name, value } = e.target;
    setCitySearchInput(value);
    if (value) {
      try {
        let where = {
          where: {
            city: id,
            title_contains: value,
          },
        };
        setLocationLoading(true);
        let resp = await fetchLocations(where);
        if (resp) {
          setCityLocationList(getValue(resp, "locations", []));
          getResultLocationCities(getValue(resp, "locations[0].id", ""));
          setSelectedLocation(getValue(resp, "locations[0]", ""));
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
        { name: "South", value: "south", checked: false },
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
    setAppliedAdvancedFilters({
        furnishing: "",
        facing: "",
        bhk_lte: "",
        bhk_gte: "",
    });
    
    // No Router.push needed, state change triggers fetch
    setShowHideFiltersPopup(false);
    setActivePage(1);
  };

  // ************************************************************** //
  // *******************    Pagination Function   ***************** //
  // ************************************************************** //

  const onPageChangeHandler = (pageNumber) => {
    setActivePage(pageNumber);
    setPageNumber(pageNumber);
    window.scroll({ top: 0, behavior: "smooth" });
    // State change triggers fetch via useEffect
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
    if (value === "selectedLocation") {
      setSelectedLocation("");
    } else if (value === "selectedPropertyType") {
      setSelectedPropertyType("");
    } else if (value === "selectedMinBudget") {
      setSelectedMaxBudget("");
      setSelectedMinBudget("");
    } else if (value === "selectedMinArea") {
      setSelectedMaxArea("");
      setSelectedMinArea("");
    } else if (value === "property_construction_status") {
      setSelectedPropertyConstructionStatus("");
    }
    setActivePage(1);
  };

  // ************************************************************** //
  // *******************     Location Filter       **************** //
  // ************************************************************** //

  const handleClickOnLocation = async (obj) => {
    setCitySearchInput(obj.title);
    setSelectedLocation(obj);
    setActivePage(1);
    handleClosePopups("toggle1");
  };

  // ************************************************************** //
  // *******************     properties Filter      *************** //
  // ************************************************************** //

  const handleClickOnPropertyType = async (e) => {
    setSelectedPropertyType(e);
    setActivePage(1);
    handleClosePopups("toggle2");
  };

  // ************************************************************** //
  // *******************     Budget Filter          *************** //
  // ************************************************************** //

  const handleClickOnBudget = async (obj) => {
    setSelectedMinBudget(obj.minBudget);
    setSelectedMaxBudget(obj.maxBudget);
    setActivePage(1);
    handleClosePopups("toggle3");
  };

  // ************************************************************** //
  // *******************       Area Filter          *************** //
  // ************************************************************** //

  const handleClickOnArea = async (obj) => {
    setSelectedMinArea(obj.minArea);
    setSelectedMaxArea(obj.maxArea);
    setActivePage(1);
    handleClosePopups("toggle4");
  };
  // ************************************************************** //
  // *******************       status Filter          *************** //
  // ************************************************************** //

  const handleChangePropertyStatus = async (value) => {
    setSelectedPropertyConstructionStatus(value);
    setActivePage(1);
    handleClosePopups("toggleStatus");
  };

  // ************************************************************** //
  // *******************       More Filter          *************** //
  // ************************************************************** //

  const handleClickOnPopup = (item, type, index, status) => {
    // This updates the checked status for the UI locally, no fetch yet
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    // Note: We ignore URL params here as we are in local state mode now
    // logic remains same for updating local state and filtersObj
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

  const handleClickOnPopupSubmitFilter = async () => {
    // Now we apply the changes to the 'appliedAdvancedFilters' which triggers the fetch
    setAppliedAdvancedFilters({
        furnishing: furnishing,
        facing: facing,
        bhk_lte: bhk_lte,
        bhk_gte: bhk_gte
    });
    setActivePage(1);
    setShowHideFiltersPopup(false);
  };

  const [viewType, setViewType] = useState("list");
  function changeGrid(viewType) {
    setViewType(viewType);
    if (viewType === "map") {
      // document.querySelector("#changeViewType_js").classList.add("map-view");
      setViewType("map");
    } else {
      // document.querySelector("#changeViewType_js").classList.remove("map-view");
      setViewType("list");
    }
  }

  return (
    <>
      <Meta
        title="Property for Sale in Bangalore | Apartments, Flats & Luxury Villas"
        description="Explore property for sale in Bangalore including apartments, flats, and luxury villas.Make a safe property investment in Bangalore with trusted experts at Dreams Realty."
        keywords="Property for sale in Bangalore | Apartments for sale in Bangalore | Flats for sale in Bangalore | Luxury villas for sale in Bangalore | Safe property investment in Bangalore|Luxury villas in Whitefield Bangalore | 3 BHK & 4 BHK villas for sale | 3 BHK flats in Whitefield Bangalore | best residential projects in Whitefield, Bangalore | 3 BHK apartment | Luxury Apartment in Whitefield Bangalore | 3.5 BHK Villas for Sale | 4 BHK Villas for Sale | Bangalore East real estate market | 3 and 4 BHK Villaments | 3 BHK Villa for Sale"
      />
      <Layout>
        <div>
          <div className="">
            <PropertyLinks />
            <PropertyMenu
              // status filter
              statusFilter={statusFilter}
              dropdownOpenStatus={dropdownOpenStatus}
              toggleStatus={toggleStatus}
              handleChangePropertyStatus={handleChangePropertyStatus}
              selectedPropertyConstructionStatus={
                selectedPropertyConstructionStatus
              }
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
              onChangeFilterPopup={handleClickOnPopup}
              furnishing={furnishing}
              facing={facing}
              bhk_lte={bhk_lte}
              bhk_gte={bhk_gte}
              filtersObj={filtersObj}
              clearFilters={clearFilters}
              handleRemoveFilters={handleRemoveFilters}
              type="sale"
            />
            <PropertyTitle
              viewType={viewType}
              changeGrid={changeGrid}
              mapData={mapData}
              totalLength={getValue(salePropertiesList, "length", 0)}
            />
            {viewType === "map" && (
              <div className="d-flex justify-content-center mb-4">
                <MapView
                  changetoListView={() => changeGrid("list")}
                  mapData={mapData}
                />
              </div>
            )}
            <PropertyCard
              saleLoading={saleLoading}
              salePropertiesList={salePropertiesList}
              toggleCta={toggleCta}
              changeGrid={changeGrid}
              mapData={mapData}
              viewType={viewType}
            />
            <br />
            {/* <div style={{ marginLeft: '680px' }} className='pagination-wrapper'> */}
            {totalCount > 12 ? (
              <Pagination
                activePage={activePage}
                itemsCountPerPage={12}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={onPageChangeHandler}
              />
            ) : (
              <br></br>
            )}
            <br />
          </div>
        </div>
        <HomeCTA
          modal={showCta}
          toggle={toggleCta}
          type={ctaPropType}
          id={ctaPropId}
          propertyName={selectedPropertyName}
  propertyCategory={selectedPropertyCategory}
        />
      </Layout>
    </>
  );
}
