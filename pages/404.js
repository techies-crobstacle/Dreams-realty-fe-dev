"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Layout = dynamic(() => import("@components/layout"));

// import '@assets/scss/pages/page-not-found.scss';

export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <div className="d-flex justify-content-center my-5 gap-5 align-items-center">
          <img
            src="/images/404.webp"
            width="200"
            className="not-found"
            alt="not-found-image"
          />
          <div>
            <h1>Error 404</h1>
            <p className="mb-5">
              The page you are looking for doesn’t exits.
              <br /> We will take you back home.
            </p>
            <Link
              href="/"
              className="theme-button header-btn theme-primary-btn mt-1 py-3 px-4"
            >
              Home Page
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}
