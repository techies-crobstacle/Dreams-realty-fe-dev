import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getValue } from "/utils/lodash";
import Router from "next/router";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import {
  fetchCities,
  fetchDevelopers,
  fetchLocationAreas,
  fetchLocations,
} from "@services/APIs/common.service";

const stagingHostname = "dreams-realty-fe-dev.vercel.app";
const widgetScriptId = "dreams-realty-staging-chat";
const widgetClientId = "4a21557b-e5bd-451a-b882-bcca27e0c282";

export default function Header({ isAdmin, toggleModal }) {
  const router = useRouter();

  useEffect(() => {
    if (
      isAdmin ||
      window.location.hostname !== stagingHostname ||
      document.getElementById(widgetScriptId)
    ) {
      return;
    }

    const script = document.createElement("script");
    script.id = widgetScriptId;
    script.src = "/copilot-api/widget/widget.js";
    script.integrity = "sha384-EKB2DeRlRxRylU3YkWhTwdszl5TzYv2tgLSarcL4/13BNWUME1Cy6yghPVQZTrnL";
    Object.assign(script.dataset, {
      clientId: widgetClientId,
      apiKey: "preview",
      apiUrl: window.location.origin + "/copilot-api",
      title: "Dreams Realty",
      position: "bottom-left",
      welcomeMessage: "Hello! How can I help you today?",
      primaryColor: "#3b82f6",
      chatIcon: `/copilot-api/uploads/chat-icons/${widgetClientId}.png`,
      disclaimerText: "Staging test",
      enableVoice: "false",
    });
    script.addEventListener("error", () => script.remove(), { once: true });
    document.head.appendChild(script);
  }, [isAdmin]);
  const aboutDropdownRef = useRef(null);
  const [showPropertyDetailsTab1, setShowTab1] = useState(false);
  const [showPropertyDetailsTab2, setShowTab2] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const [showMenu, setShowMobileMenu] = useState(false);
  const [headerNavigationMenu] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Properties for Sale",
      link: "/property-for-sale",
    },
    {
      name: "Properties for Rent",
      link: "/property-for-rent",
    },
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target)
      ) {
        setShowAboutDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setShowAboutDropdown(false);
  }, [router.pathname]);

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
      const valuesArray = Array.isArray(item.value) ? item.value : [item.value];

      const promises = valuesArray.map(async (value) => {
        let where = {
          "filters[title][$startsWithi]": value,
        };
        let resp = await fetchDevelopers(where);
        return resp ? getValue(resp, "data", []) : [];
      });

      const results = await Promise.all(promises);
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
            <li key="about-us-dropdown" className="about-nav-item" ref={aboutDropdownRef}>
              <Link
                href="/about-us"
                className={
                  "/about-us" === router.pathname
                    ? "about-us-link active header-main-links"
                    : "about-us-link header-main-links"
                }
              >
                About us
              </Link>
              <button
                type="button"
                className="about-arrow-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAboutDropdown((prev) => !prev);
                }}
                aria-label="Open About dropdown"
                aria-haspopup="true"
                aria-expanded={showAboutDropdown}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showAboutDropdown && (
                <div className="about-dropdown-panel">
                  <Link
                    href="/career"
                    className="about-dropdown-link"
                    onClick={() => setShowAboutDropdown(false)}
                  >
                    {/* <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="7"
                        width="18"
                        height="13"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg> */}
                    <span>Career</span>
                  </Link>
                </div>
              )}
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
