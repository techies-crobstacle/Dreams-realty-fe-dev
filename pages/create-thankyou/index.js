"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Layout = dynamic(() => import("@components/layout"));

function index(props) {
  return (
    <Layout>
      <div className="position-relative">
        <section className="list-step1 mt-5">
          <div className="custom-container">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <h2 className="text-center">
                  Request submitted successfully. Our team will contact you
                  shortly
                </h2>
                <center>
                  <img
                    src="/images/thankyou.svg"
                    className="img-fluid mt-4"
                    alt="illustration-of-person-flying-paper-plane"
                  />
                </center>
                <div className="mt-4 mb-5 text-center">
                  {/* <Link href={`/property-listing`}>
										<button className="theme-button theme-primary-btn mr-3">
											Go to Listing Page
										</button>
									</Link> */}
                  <Link href="/">
                    <button className="theme-button theme-secondary-btn mr-3">
                      Go to Home Page
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

export default index;
