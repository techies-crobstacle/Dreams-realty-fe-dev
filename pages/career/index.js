"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";

const Layout = dynamic(() => import("@components/layout"));
const PreviousPage = dynamic(() => import("@components/previous-page"));
const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const CareerListLoading = dynamic(() =>
  import("@components/careers/loading/careerListLoading")
);

import { fetchCareer } from "@services/APIs/common.service";
import { getValue } from "@utils/lodash";

function Career() {
  const [isLoading, setIsLoading] = useState(false);
  const [careerInfo, setCareerInfo] = useState([]);

  useEffect(() => {
    careerData();
  }, []);

  const careerData = async () => {
    try {
      setIsLoading(true);
      let resp = await fetchCareer();
      if (resp) {
        setCareerInfo(getValue(resp, "data", {}));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Careers", link: "" },
  ];

  return (
    <div>
      <Head>
        <title>
          The Ultimate Guide to an Impressive for Real Estate: About Us Page
        </title>
        <meta
          name="keywords"
          content="Real estate, find your dream property"
        ></meta>
        <meta
          name="description"
          content="Our team of local market experts advise our clients on their real estate transactions leading to exceptional customer experience for them"
        />
      </Head>
      <Layout>
        <div className="career-banner">
          {/* <div className="d-flex align-items-center">
            <PreviousPage isCompact={false} />
            <div style={{ marginLeft: "30px" }}>
            </div>
          </div> */}
              <DynamicBreadcrumb items={breadcrumbItems} textWhite />
          <h2>
            Our goal is to create a work environment that’s enriching —one that
            you’ll look forward to every day.
          </h2>
        </div>

        {isLoading ? (
          <CareerListLoading />
        ) : (
          <div className="custom-container my-5">
            <h2>Our Current Openings ({careerInfo.length})</h2>
            <div>
              {careerInfo.map((career) => (
                <div
                  className="career-posts"
                  index={getValue(career, `id`, "")}
                >
                  <Link
                    href={`/career/post/${getValue(career, `id`, "")}`}
                    as={`/career/post/${getValue(career, `id`, "")}`}
                  >
                    <h3>{getValue(career, `job_title`, "")}</h3>
                    <div className="d-flex align-items-center gap-5  my-2">
                      <div className="d-flex align-items-center gap-2">
                        <img src="/images/career/pin_drop.svg" />
                        <span className=" smaller-font">
                          {getValue(career, `location`, "")}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <img src="/images/career/schedule.svg" />
                        <span className=" smaller-font">
                          {getValue(career, `employment_type`, "")}
                        </span>
                      </div>
                    </div>
                    <p
                      className="mt-3 smaller-font about-the-job"
                      dangerouslySetInnerHTML={{
                        __html: getValue(career, "job_description", ""),
                      }}
                    ></p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}

export default Career;
