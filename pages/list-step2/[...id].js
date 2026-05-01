import React, { useEffect, useState } from "react";
import Layout from "@components/layout.js";
import Link from "next/link";
import { toast } from "react-toastify";
import { getValue } from "/utils/lodash";
import router from "next/router";
import PropertySVG from "@components/svg/property-svg";
import MapSVG from "@components/svg/map-svg";
import { Button } from "reactstrap";
import ProfileSVG from "@components/svg/profile-svg";
import AlbumSVG from "@components/svg/album-svg";
import {
  fetchPropertyTypes,
  fetchRentProperties,
  fetchSaleProperties,
  fetchUpdateRentProperty,
  fetchUpdateSaleProperty,
} from "@services/APIs/common.service";

export default function ListStep2(props) {
  /* -------------------------------------------------------------------------- */
  /*                               Use State Section                            */
  /* -------------------------------------------------------------------------- */
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [property_type, setProperty_type] = useState("");
  const [request, setRequest] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  /* -------------------------------------------------------------------------- */
  /*                               Use effect Section                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    getPropertyTypeList();
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
          setProperty_type(getValue(resp, `saleProperty.property_type.id`, ""));
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
          setProperty_type(getValue(resp, `rentProperty.property_type.id`, ""));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

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

  const handleSubmit = async () => {
    if (property_type) {
      let data = {
        data: {
          property_type: property_type,
        },
        where: { id: props.id },
      };
      if (props.type === "sale") {
        try {
          setIsLoading(true);
          let resp = await fetchUpdateSaleProperty(data);
          if (resp) {
            toast.success("Updated successfully");
            setIsLoading(false);
            router.push(
              `/list-step3/${props.id}/${props.type ? props.type : "sale"}`
            );
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        try {
          setIsLoading(true);
          let resp = await fetchUpdateRentProperty(data);
          if (resp) {
            toast.success("Updated successfully");
            setIsLoading(false);
            router.push(
              `/list-step3/${props.id}/${props.type ? props.type : "rent"}`
            );
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
        }
      }
    } else {
      toast.error("Please add property type to continue");
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               On change Section                            */
  /* -------------------------------------------------------------------------- */

  const handleRequest = (id) => {
    setProperty_type(id);
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
          <li className="active">
            <Link href={`/list-step2/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <PropertySVG />
                </span>
                <span className="flight-tabs-text">Property Listing/Type</span>
              </Button>
            </Link>
          </li>
          <li>
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
                <h2>Select Your Listing and Property Type</h2>
                {/* <p className="mb-4">
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the.
								</p> */}
                <div className="form-container">
                  {loading ? (
                    <p className="text-center mt-2">Please wait...</p>
                  ) : (
                    <div className="row">
                      {propertyTypeList.map((item, index) => {
                        return (
                          <div className="col-md-4" key={index}>
                            <div className="form-group">
                              <label
                                class={`radio-css ${
                                  item.id === property_type ? "active" : ""
                                }`}
                                htmlFor="radio3"
                              >
                                <div
                                  className="cursor-pointer"
                                  onClick={() => handleRequest(item.id)}
                                >
                                  <h4>{getValue(item, "title", "")}</h4>
                                </div>
                                <input
                                  type="radio"
                                  id={getValue(item, "title", "")}
                                  name="checked"
                                  checked={item.id === property_type}
                                  onChange={() => handleRequest(item.id)}
                                />
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="mt-4 mb-5">
                    <Link href="/list-step1">
                      <button className="theme-button theme-secondary-btn mr-3">
                        Back
                      </button>
                    </Link>
                    {isLoading ? (
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
                    <Link href="/">
                      <button className="theme-button theme-secondary-btn mr-0">
                        Cancel
                      </button>
                    </Link>
                  </div>
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
