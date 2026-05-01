import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getValue } from "/utils/lodash";
import Router from "next/router";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  fetchCities,
  fetchDevelopers,
  fetchLocationAreas,
  fetchLocations,
} from "@services/APIs/common.service";

export default function Header({ isAdmin, toggleModal }) {
  const router = useRouter();
  const [showPropertyDetailsTab1, setShowTab1] = useState(false);
  const [showPropertyDetailsTab2, setShowTab2] = useState(false);

  const [showMenu, setShowMobileMenu] = useState(false);
  const [headerNavigationMenu] = useState([
    {
      name: "Home",
      link: "/",
    },
    // {
    //   name: "Properties by Location",
    //   link: "#0",
    //   showDropdown: true,
    //   id: 1
    // },
    // {
    //   name: "Properties by Developers",
    //   link: "#0",
    //   showDropdown: true,
    //   id: 2
    // },
    {
      name: "Properties for Sale",
      link: "/property-for-sale",
    },
    {
      name: "Properties for Rent",
      link: "/property-for-rent",
    },
    // {
    //   name: "About us",
    //   link: "/about-us",
    // },
    {
      name: "Blogs",
      link: "/blog",
    },
    
    
  ]);
  const [locationsArray] = useState([
    "All",
    "Kalyan Nagar",
    "Kalyan Nagar",
    "Kalyan Nagar",
    "Kalyan Nagar",
    "Banaswadi",
    "ORR North",
    "ORR North",
    "ORR North",
    "ORR North",
    "Devanahalli",
    "Rajaji Nagar",
    "Rajaji Nagar",
    "Rajaji Nagar",
    "Rajaji Nagar",
    "Hebbal",
    "RMV Layout",
    "RMV Layout",
    "RMV Layout",
    "RMV Layout",
    "New Airport Road",
    "Thanisandra",
    "Thanisandra",
    "Thanisandra",
    "Thanisandra",
    "Jayamahal",
    "Yelahanka",
    "Yelahanka",
    "Yelahanka",
    "Yelahanka",
  ]);
  const [developersAlphabetList] = useState([
    { value: ["A", "B", "C"], label: "A to C" },
    { value: ["D", "E", "F"], label: "D to F" },
    { value: ["G", "H", "I"], label: "G to I" },
    { value: ["J", "K", "L"], label: "J to L" },
    { value: ["M", "N", "O"], label: "M to O" },
    { value: ["P", "Q", "R"], label: "P to R" },
    { value: ["S", "T", "U"], label: "S to U" },
    { value: ["V", "W", "X", "Y", "Z"], label: "V to Z" },
  ]);

  const [developersByAlphabets, setDevelopersByAlphabets] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [cityLocationList, setCityLocationList] = useState([]);
  const [cityLocationListAreas, setCityLocationListAreas] = useState([]);

  const [cityLoading, setCityLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationAreaLoading, setLocationAreaLoading] = useState(false);
  const [developerLoading, setDeveloperLoading] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationArea, setSelectedLocationArea] = useState("");

  const [selectedDeveloperLabel, setSelectedDeveloperLabel] = useState({
    value: ["A", "B", "C"],
    label: "A to C",
  });

  useEffect(() => {
    getCities();
    handleChangeDeveloper(selectedDeveloperLabel);
  }, []);

  const getCities = async () => {
    try {
      setCityLoading(true);
      let resp = await fetchCities();
      // console.group("cities", resp);
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
        "filters[id][$eq]": id,
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
  };

  const getResultLocationCities = async (id) => {
    try {
      let where = {
        "filters[location][id][$eq]": id,
      };
      setLocationAreaLoading(true);
      let resp = await fetchLocationAreas(where);
      // console.group("location", id);

      if (resp) {
        setCityLocationListAreas(getValue(resp, "data", []));
        setLocationAreaLoading(false);
      } else {
        setLocationAreaLoading(false);
      }
    } catch (error) {
      setLocationAreaLoading(false);
    }
  };

  const handleChangeLocationCities = (locationId) => {
    setSelectedLocation(locationId);
    getResultLocationCities(locationId);
  };

  const handleNavigateSearch = (slug) => {
    setShowTab1(!showPropertyDetailsTab1);
    Router.push({
      pathname: "/search-properties",
      query: {
        location_area: slug,
        // location: selectedLocation,
        // city: selectedCity,
        page: 0,
        type: 1,
      },
    });
  };

  const handleNavigateSearchDeveloper = (slug) => {
    setShowTab2(!showPropertyDetailsTab2);
    Router.push({
      pathname: "/search-properties",
      query: {
        developer: slug,
        // location: selectedLocation,
        // city: selectedCity,
        page: 0,
        type: 1,
      },
    });
  };

  const handleMakeTab = (id) => {
    if (id === 1) {
      setShowTab1(!showPropertyDetailsTab1);
      setShowTab2(false);
    } else if (id === 2) {
      setShowTab2(!showPropertyDetailsTab2);
      setShowTab1(false);
    }
  };

  const handleChangeDeveloper = async (item) => {
    setDeveloperLoading(true);
    setSelectedDeveloperLabel(item);

    try {
      // Convert item.value to an array if it's not already
      const valuesArray = Array.isArray(item.value) ? item.value : [item.value];

      // Create an array of promises
      const promises = valuesArray.map(async (value) => {
        let where = {
          "filters[title][$startsWithi]": value,
        };
        let resp = await fetchDevelopers(where);
        return resp ? getValue(resp, "data", []) : [];
      });

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Combine all results into a single array
      const combinedResults = results.flat();

      setDeveloperLoading(false);
      setDevelopersByAlphabets(combinedResults);
    } catch (error) {
      setDeveloperLoading(false);
    }
  };

  return (
    <header className="header-wrapper">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center icon-logo">
          <div
            className="material-icons d-none-tablet-above cursor-pointer mr-2"
            onClick={() => {
              setShowMobileMenu(!showMenu);
            }}
          >
            <img
              src="/images/menu.svg"
              width="40"
              className="header-wrapper__logo img-fluid"
              alt="dreams-realty-logo"
            />
          </div>
          <Link href="/" className="logo">
            <img
              src="/images/logo/logo.png"
              width="100"
              className="header-wrapper__logo img-fluid"
              alt="dreams-realty-logo"
            />
          </Link>
        </div>
        <div className={`${showMenu ? "active" : ""} navigation-menu`}>
          <div className="d-flex align-items-center justify-content-between ">
            <Link href="/" className="logo d-none-tablet-above">
              <img
                src="/images/logo/logo.png"
                width="100"
                className="header-wrapper__logo img-fluid"
                alt="dreams-realty-logo"
              />
            </Link>
            <a
              className="close-menu-icon-wrapper d-none-tablet-above"
              onClick={() => {
                setShowMobileMenu(!showMenu);
              }}
            >
              <img
                src="/images/closeSVG.svg"
                className="img-fluid"
                alt="close-icon"
              />
            </a>
          </div>
          <ul>
            {headerNavigationMenu.map((eachObj, index) => {
              if (
                !eachObj.showDropdown &&
                eachObj.name !== "Properties for Rent" &&
                eachObj.name !== "Blogs"
              ) {
                return (
                  <>
                    <li key={`menu-${index + 1}`}>
                      <Link
                        href={eachObj.link}
                        className={
                          router.pathname === "/"
                            ? eachObj.link === "/"
                              ? "active header-main-links"
                              : "header-main-links"
                            : eachObj.link.includes(router.pathname)
                            ? "active header-main-links"
                            : "header-main-links"
                        }
                      >
                        {eachObj.name}
                      </Link>
                    </li>
                  </>
                );
              } else if (eachObj.name !== "Properties for Rent" && eachObj.name !== "Blogs") {
                return (
                  <li key={`menu-${index + 1}`}>
                    <Link
                      href={eachObj.link}
                      onClick={() => {
                        handleMakeTab(eachObj.id);
                      }}
                    >
                      {eachObj.name}
                    </Link>
                  </li>
                );
              }
            })}
            <li key="location-dropdown">
              <UncontrolledDropdown className="mega-dropdown-wrapper mx-3 padding-adj">
                <DropdownToggle tag="a" className="nav-link cursor-pointer ">
                  Properties by Location
                </DropdownToggle>
                <DropdownMenu>
                  <div className="property-header-wrapper d-flex view-property-header flex-direction-column-mobile">
                    <div
                      className={`location ${
                        cityLocationList.length === 0 ? "not-found" : ""
                      }`}
                    >
                      {locationLoading ? (
                        "Please wait..."
                      ) : (
                        <ul>
                          {cityLocationList.length !== 0
                            ? cityLocationList.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <a
                                      onClick={() =>
                                        handleChangeLocationCities(item.id)
                                      }
                                      className={
                                        selectedLocation === item.id
                                          ? "active cursor-pointer"
                                          : "cursor-pointer"
                                      }
                                    >
                                      {item.title}
                                    </a>
                                  </li>
                                );
                              })
                            : "No Cities Found"}
                        </ul>
                      )}
                    </div>
                    <div className="property-by-location">
                      <h3>Properties by Location</h3>
                      <ul className="property-by-location-list">
                        {locationAreaLoading
                          ? "Please wait..."
                          : cityLocationListAreas.length !== 0
                          ? cityLocationListAreas.map((eachLocation, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    onClick={() =>
                                      handleNavigateSearch(eachLocation.slug)
                                    }
                                    className="cursor-pointer"
                                  >
                                    {eachLocation.title}
                                  </a>
                                </li>
                              );
                            })
                          : "No Areas Found"}
                      </ul>
                    </div>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            <li className="ms-3" key="developers-dropdown">
              <UncontrolledDropdown className="mega-dropdown-wrapper padding-adj">
                <DropdownToggle tag="a" className="nav-link me-3 cursor-pointer">
                  Properties by Developers
                </DropdownToggle>
                <DropdownMenu>
                  <div className="property-header-wrapper d-flex view-property-header flex-direction-column-mobile">
                    <div className="location property-by-alphabets">
                      <ul>
                        {developersAlphabetList.length !== 0
                          ? developersAlphabetList.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    onClick={() => handleChangeDeveloper(item)}
                                    className={
                                      selectedDeveloperLabel.label ===
                                      item.label
                                        ? "active cursor-pointer"
                                        : "cursor-pointer"
                                    }
                                  >
                                    {item.label}
                                  </a>
                                </li>
                              );
                            })
                          : "No Developers Found"}
                      </ul>
                    </div>
                    <div className="property-by-location">
                      <h3>Properties by Developers</h3>
                      <ul>
                        {developerLoading
                          ? "Please wait..."
                          : developersByAlphabets.length !== 0
                          ? developersByAlphabets.map((eachLocation, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    onClick={() =>
                                      handleNavigateSearchDeveloper(
                                        eachLocation.slug
                                      )
                                    }
                                    className="cursor-pointer"
                                  >
                                    {eachLocation.title}
                                  </a>
                                </li>
                              );
                            })
                          : "No Developers Found"}
                      </ul>
                    </div>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            {headerNavigationMenu.map((eachObj, index) => {
              if (
                !eachObj.showDropdown &&
                eachObj.name === "Properties for Rent"
              ) {
                return (
                  <>
                    <li key={`menu-${index + 1}`}>
                      <Link
                        href={eachObj.link}
                        className={
                          eachObj.link === router.pathname
                            ? "active header-main-links"
                            : "header-main-links"
                        }
                      >
                        {eachObj.name}
                      </Link>
                    </li>
                  </>
                );
              } else if (eachObj.name === "Properties for Rent") {
                return (
                  <li key={`menu-${index + 1}`}>
                    <Link
                      href={eachObj.link}
                      onClick={() => {
                        handleMakeTab(eachObj.id);
                      }}
                    >
                      {eachObj.name}
                    </Link>
                  </li>
                );
              }
            })}
            <li key="about-us-link">
              <Link
                href="/about-us"
                className={
                  "/about-us" === router.pathname
                    ? "active header-main-links"
                    : "header-main-links"
                }
              >
                About us
              </Link>
            </li>
            <li key="blogs-link">
              <Link
                href="/blog"
                className={
                  router.pathname.startsWith("/blog")
                    ? "active header-main-links"
                    : "header-main-links"
                }
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        {isAdmin ? (
          <button
            onClick={() => toggleModal()}
            className="theme-button header-btn theme-primary-btn"
          >
            Logout
          </button>
        ) : (
          <div className="header-button">
            <Link
              href="/contact-us"
              className="theme-button header-btn theme-primary-btn"
            >
              Contact us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
// Merge
