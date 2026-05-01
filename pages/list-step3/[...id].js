import React, { useEffect, useState, useRef } from "react";
import Layout from "@components/layout.js";
import Link from "next/link";
import SaleForm from "./sale-form";
import RentForm from "./rent-form";
import SimpleReactValidator from "simple-react-validator";
import { getValue } from "/utils/lodash";
import { toast } from "react-toastify";
import router from "next/router";
import axios from "axios";
import { Button } from "reactstrap";
import ProfileSVG from "@components/svg/profile-svg";
import AlbumSVG from "@components/svg/album-svg";
import PropertySVG from "@components/svg/property-svg";
import MapSVG from "@components/svg/map-svg";
import {
  fetchAmenities,
  fetchCities,
  fetchDevelopers,
  fetchLocationAreas,
  fetchLocations,
  fetchPropertyBhks,
  fetchRentProperties,
  fetchSaleProperties,
  fetchUpdateRentProperty,
  fetchUpdateSaleProperty,
} from "@services/APIs/common.service";

export default function ListStep3(props) {
  /* -------------------------------------------------------------------------- */
  /*                               Use State Section                            */
  /* -------------------------------------------------------------------------- */
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [saleRequest, setSaleRequest] = useState({
    title: "",
    address: "",
    about: "",
    balcony: "",
    bathrooms: "",

    logo: "", //-file

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

    Developer: "", //--dropdown

    // property_construction_status: "", //--dropdown
    furnishing: "", //--dropdown
    facing: "", //--dropdown
    property_bhks: [], //--dropdown
    amenities: [],
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [image, setImage] = useState("");
  const [property_type, setProperty_type] = useState("");

  const [rentRequest, setRentRequest] = useState({
    title: "",
    address: "",
    about: "",
    logo: "",

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
  const [isLoading1, setIsLoading1] = useState(false);

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
  /*                               Use effect Section                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    getPropertyBHKs();
    getDevelopers();
    getCities();
    getAmenities();
    getData();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               API Section                                  */
  /* -------------------------------------------------------------------------- */

  const getData = async () => {
    if (props.type === "sale") {
      try {
        setIsLoading(true);
        let resp = await fetchSaleProperties(props.id);
        if (resp) {
          setIsLoading(false);
          setImage(
            getValue(resp, `saleProperty.logo.url`, "")
              ? process.env.NEXT_PUBLIC_API_URL +
                  getValue(resp, `saleProperty.logo.url`, "")
              : ""
          );
          setProperty_type(
            getValue(resp, `saleProperty.property_type.title`, "")
          );
          setSaleRequest({
            ...saleRequest,
            title: getValue(resp, `saleProperty.title`, ""),
            address: getValue(resp, `saleProperty.address`, ""),
            about: getValue(resp, `saleProperty.about`, ""),
            balcony: getValue(resp, `saleProperty.balcony`, ""),
            bathrooms: getValue(resp, `saleProperty.bathrooms`, ""),
            logo: getValue(resp, `saleProperty.logo.id`, ""), //-file
            property_rera: getValue(resp, `saleProperty.property_rera`, ""),
            total_units: getValue(resp, `saleProperty.total_units`, ""),
            development_size: getValue(
              resp,
              `saleProperty.development_size`,
              ""
            ),
            price:
              getValue(resp, `saleProperty.price`, "") !== 0
                ? getValue(resp, `saleProperty.price`, "")
                : "",
            video_url: getValue(resp, `saleProperty.video_url`, ""),
            plot_area: getValue(resp, `saleProperty.plot_area`, ""),
            plot_area_max: getValue(resp, `saleProperty.plot_area_max`, ""),
            plot_area_min: getValue(resp, `saleProperty.plot_area_min`, ""),
            carpet_area: getValue(resp, `saleProperty.carpet_area`, ""),
            carpet_area_min: getValue(resp, `saleProperty.carpet_area_min`, ""),
            carpet_area_max: getValue(resp, `saleProperty.carpet_area_max`, ""),
            super_build_up_area: getValue(
              resp,
              `saleProperty.super_build_up_area`,
              ""
            ),
            super_build_up_area_min: getValue(
              resp,
              `saleProperty.super_build_up_area_min`,
              ""
            ),
            super_build_up_area_max: getValue(
              resp,
              `saleProperty.super_build_up_area_max`,
              ""
            ),

            latitude: getValue(resp, `saleProperty.latitude`, ""),
            longitude: getValue(resp, `saleProperty.longitude`, ""),

            city: getValue(resp, `saleProperty.city.id`, ""),
            location: getValue(resp, `saleProperty.location.id`, ""),
            location_area: getValue(resp, `saleProperty.location_area.id`, ""),

            developer: getValue(resp, `saleProperty.developer.id`, ""),

            // property_construction_status: "", //--dropdown
            furnishing: getValue(resp, `saleProperty.furnishing`, ""),
            facing: getValue(resp, `saleProperty.facing`, ""),
            property_bhks: getValue(resp, `saleProperty.property_bhks`, []).map(
              (item) => item.id
            ),
            amenities: getValue(resp, `saleProperty.amenities`, []).map(
              (item) => ({
                value: item.title,
                label: item.title,
                id: item.id,
              })
            ),
          });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      try {
        let resp = await fetchRentProperties(props.id);
        setIsLoading(true);
        if (resp) {
          setImage(
            getValue(resp, `rentProperty.logo.url`, "")
              ? process.env.NEXT_PUBLIC_API_URL +
                  getValue(resp, `rentProperty.logo.url`, "")
              : ""
          );
          setProperty_type(
            getValue(resp, `rentProperty.property_type.title`, "")
          );
          setRentRequest({
            ...rentRequest,
            title: getValue(resp, `rentProperty.title`, ""),
            address: getValue(resp, `rentProperty.address`, ""),
            about: getValue(resp, `rentProperty.about`, ""),
            balcony: getValue(resp, `rentProperty.balcony`, ""),
            bathrooms: getValue(resp, `rentProperty.bathrooms`, ""),
            logo: getValue(resp, `rentProperty.logo.id`, ""), //-file
            development_size: getValue(
              resp,
              `rentProperty.development_size`,
              ""
            ),
            price:
              getValue(resp, `rentProperty.price`, "") !== 0
                ? getValue(resp, `rentProperty.price`, "")
                : "",
            video_url: getValue(resp, `rentProperty.video_url`, ""),
            plot_area: getValue(resp, `rentProperty.plot_area`, ""),
            plot_area_max: getValue(resp, `rentProperty.plot_area_max`, ""),
            plot_area_min: getValue(resp, `rentProperty.plot_area_min`, ""),
            carpet_area: getValue(resp, `rentProperty.carpet_area`, ""),
            carpet_area_min: getValue(resp, `rentProperty.carpet_area_min`, ""),
            carpet_area_max: getValue(resp, `rentProperty.carpet_area_max`, ""),
            build_up_area: getValue(resp, `rentProperty.build_up_area`, ""),
            build_up_area_min: getValue(
              resp,
              `rentProperty.build_up_area_min`,
              ""
            ),
            build_up_area_max: getValue(
              resp,
              `rentProperty.build_up_area_max`,
              ""
            ),

            latitude: getValue(resp, `rentProperty.latitude`, ""),
            longitude: getValue(resp, `rentProperty.longitude`, ""),

            city: getValue(resp, `rentProperty.city.id`, ""),
            location: getValue(resp, `rentProperty.location.id`, ""),
            location_area: getValue(resp, `rentProperty.location_area.id`, ""),

            developer: getValue(resp, `rentProperty.developer.id`, ""),

            // property_construction_status: "", //--dropdown
            furnishing: getValue(resp, `rentProperty.furnishing`, ""),
            facing: getValue(resp, `rentProperty.facing`, ""),
            property_bhks: getValue(resp, `rentProperty.property_bhks`, []).map(
              (item) => item.id
            ),
            amenities: getValue(resp, `rentProperty.amenities`, []).map(
              (item) => ({
                value: item.title,
                label: item.title,
                id: item.id,
              })
            ),
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const getPropertyBHKs = async () => {
    try {
      let resp = await fetchPropertyBhks();
      if (resp) {
        setPropertyBHKList(getValue(resp, "data", []));
      }
    } catch (error) {}
  };

  const getDevelopers = async () => {
    try {
      let resp = await fetchDevelopers();
      if (resp) {
        setDeveloperList(getValue(resp, `data`, []));
      }
    } catch (error) {}
  };
  const getAmenities = async () => {
    try {
      let resp = await fetchAmenities();
      if (resp) {
        setAmenitiesList(
          getValue(resp, `amenities`, []).map((item) => ({
            value: item.title,
            label: item.title,
            id: item.id,
          }))
        );
      }
    } catch (error) {}
  };

  const getCities = async () => {
    try {
      let resp = await fetchCities();
      if (resp) {
        setCityList(getValue(resp, "cities", []));
        getLocations(getValue(resp, `cities[${0}].id`, ""));
      }
    } catch (error) {}
  };

  const getLocations = async (id) => {
    let where = {
      city: id,
    };
    try {
      let resp = await fetchLocations(where);
      if (resp) {
        setLocationList(getValue(resp, "data", []));
        getLocationArea(getValue(resp, `data[${0}].id`, ""));
      }
    } catch (error) {}
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
    } catch (error) {}
  };

  const uploadImage = async (e, path, state, name) => {
    if (e.target.files[0]) {
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      Array.from(e.target.files).forEach((image) => {
        formData.append("files", image);
      });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: "Bearer " + authToken,
          },
        })
        .then(async (res) => {
          path({
            ...state,
            [name]: getValue(res, `data[${0}].id`, ""),
          });
        })
        .catch((err) => {});
    }
  };

  /* -------------------------------------  Submit Section ------------------------------------- */

  const handleSubmit = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    } else {
      if (props.type === "sale") {
        let saleReq = JSON.parse(JSON.stringify(saleRequest));

        saleReq.balcony = saleReq.balcony ? parseFloat(saleReq.balcony) : 0;
        saleReq.bathrooms = saleReq.bathrooms
          ? parseFloat(saleReq.bathrooms)
          : 0;
        saleReq.total_units = saleReq.total_units
          ? parseFloat(saleReq.total_units)
          : 0;
        saleReq.development_size = saleReq.development_size
          ? parseFloat(saleReq.development_size)
          : 0;
        saleReq.price = saleReq.price ? parseFloat(saleReq.price) : 0;
        saleReq.plot_area = saleReq.plot_area
          ? parseFloat(saleReq.plot_area)
          : 0;
        saleReq.plot_area_max = saleReq.plot_area_max
          ? parseFloat(saleReq.plot_area_max)
          : 0;
        saleReq.plot_area_min = saleReq.plot_area
          ? parseFloat(saleReq.plot_area_min)
          : 0;
        saleReq.carpet_area = saleReq.carpet_area
          ? parseFloat(saleReq.carpet_area)
          : 0;
        saleReq.carpet_area_min = saleReq.carpet_area_min
          ? parseFloat(saleReq.carpet_area_min)
          : 0;
        saleReq.carpet_area_max = saleReq.carpet_area_max
          ? parseFloat(saleReq.carpet_area_max)
          : 0;
        saleReq.super_build_up_area = saleReq.super_build_up_area
          ? parseFloat(saleReq.super_build_up_area)
          : 0;
        saleReq.super_build_up_area_min = saleReq.super_build_up_area_min
          ? parseFloat(saleReq.super_build_up_area_min)
          : 0;
        saleReq.super_build_up_area_max = saleReq.super_build_up_area_max
          ? parseFloat(saleReq.super_build_up_area_max)
          : 0;
        saleReq.amenities =
          getValue(saleReq, `amenities.length`, 0) > 0
            ? getValue(saleReq, `amenities`, []).map((item) =>
                getValue(item, `id`, "")
              )
            : [];
        let data = {
          data: saleReq,
          where: { id: props.id },
        };
        Object.keys(data.data).forEach((key) => {
          if (
            !data.data[key] ||
            data.data[key] === undefined ||
            data.data[key] === false
          ) {
            delete data.data[key];
          }
        });
        if (saleRequest.price != 0) {
          try {
            setIsLoading1(true);
            let resp = await fetchUpdateSaleProperty(data);
            if (resp) {
              toast.success("Updated successfully");
              setIsLoading1(false);
              router.push(
                `/list-step4/${props.id}/${props.type ? props.type : "sale"}`
              );
            } else {
              setIsLoading1(false);
            }
          } catch (error) {
            setIsLoading1(false);
          }
        } else {
          toast.error("Please add price to continue");
        }
      } else {
        let rentReq = JSON.parse(JSON.stringify(rentRequest));

        rentReq.balcony = rentReq.balcony ? parseFloat(rentReq.balcony) : 0;
        rentReq.bathrooms = rentReq.bathrooms
          ? parseFloat(rentReq.bathrooms)
          : 0;
        rentReq.development_size = rentReq.development_size
          ? parseFloat(rentReq.development_size)
          : 0;
        rentReq.price = rentReq.price ? parseFloat(rentReq.price) : 0;
        rentReq.plot_area = rentReq.plot_area
          ? parseFloat(rentReq.plot_area)
          : 0;
        rentReq.plot_area_max = rentReq.plot_area_max
          ? parseFloat(rentReq.plot_area_max)
          : 0;
        rentReq.plot_area_min = rentReq.plot_area
          ? parseFloat(rentReq.plot_area_min)
          : 0;
        rentReq.carpet_area = rentReq.carpet_area
          ? parseFloat(rentReq.carpet_area)
          : 0;
        rentReq.carpet_area_min = rentReq.carpet_area_min
          ? parseFloat(rentReq.carpet_area_min)
          : 0;
        rentReq.carpet_area_max = rentReq.carpet_area_max
          ? parseFloat(rentReq.carpet_area_max)
          : 0;
        rentReq.build_up_area = rentReq.build_up_area
          ? parseFloat(rentReq.build_up_area)
          : 0;
        rentReq.build_up_area_min = rentReq.build_up_area_min
          ? parseFloat(rentReq.build_up_area_min)
          : 0;
        rentReq.build_up_area_max = rentReq.build_up_area_max
          ? parseFloat(rentReq.build_up_area_max)
          : 0;
        rentReq.amenities =
          getValue(rentReq, `amenities.length`, 0) > 0
            ? getValue(rentReq, `amenities`, []).map((item) =>
                getValue(item, `id`, "")
              )
            : [];
        let data = {
          data: rentReq,
          where: { id: props.id },
        };
        Object.keys(data.data).forEach((key) => {
          if (
            !data.data[key] ||
            data.data[key] === undefined ||
            data.data[key] === false
          ) {
            delete data.data[key];
          }
        });
        if (rentRequest.price != 0) {
          try {
            setIsLoading1(true);
            let resp = await fetchUpdateRentProperty(data);
            if (resp) {
              toast.success("Updated successfully");
              setIsLoading1(false);
              router.push(
                `/list-step4/${props.id}/${props.type ? props.type : "rent"}`
              );
            } else {
              setIsLoading1(false);
            }
          } catch (error) {
            setIsLoading1(false);
          }
        } else {
          toast.error("Please add price to continue");
        }
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Onchange Section                             */
  /* -------------------------------------------------------------------------- */

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
  return (
    <Layout>
      <div className="position-relative">
        <ul className="flight-tabs-ul">
          <li>
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <ProfileSVG />
              </span>
              <span className="flight-tabs-text">Your Details</span>
            </Button>
          </li>
          <li>
            <Link href={`/list-step2/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <PropertySVG />
                </span>
                <span className="flight-tabs-text">Property Listing/Type</span>
              </Button>
            </Link>
          </li>
          <li className="active">
            <Link href={`/list-step3/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <MapSVG />
                </span>
                <span className="flight-tabs-text">Property Details</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={`/list-step4/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <AlbumSVG />
                </span>
                <span className="flight-tabs-text">Property Photos</span>
              </Button>
            </Link>
          </li>
        </ul>
        <section className="list-step1">
          <div className="custom-container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h2>Provide Property Details Below</h2>
                {/* <p className="mb-4">
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the.
								</p> */}
                {props.type === "sale" && (
                  <SaleForm
                    image={image}
                    request={saleRequest}
                    setRequest={setSaleRequest}
                    onChange={handleChangeSaleRequest}
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
                    uploadImage={uploadImage}
                    logoPreview={logoPreview}
                    amenitiesList={amenitiesList}
                    handleChangeSelect={handleChangeSelect}
                    property_type={property_type}
                  />
                )}
                {props.type === "rent" && (
                  <RentForm
                    request={rentRequest}
                    image={image}
                    setRequest={setRentRequest}
                    onChange={handleChangeRentRequest}
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
                  />
                )}
                <div className="mt-4 mb-5">
                  {isLoading1 ? (
                    <button className="theme-button theme-primary-btn mr-3">
                      Please wait...
                    </button>
                  ) : (
                    <button
                      className="theme-button theme-primary-btn mr-3"
                      onClick={handleSubmit}
                    >
                      Next
                    </button>
                  )}
                  <Link href={`/list-step2/${props.id}/${props.type}`}>
                    <button className="theme-button theme-secondary-btn mr-3">
                      Previous
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="theme-button theme-secondary-btn mr-3">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id[0];
  const type = query.id[1];
  return {
    props: {
      id,
      type,
    },
  };
}
