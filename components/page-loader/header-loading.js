import React from "react";
import Link from "next/link";

export default class LoadingHeader extends React.Component {
  render() {
    return (
      <header className="header-wrapper header-loading-wrapper">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center icon-logo">
            <a className="logo" href="/">
              <img
                src="/images/logo/logo.png"
                width="100"
                className="header-wrapper__logo img-fluid pt-2 pb-2"
                alt="dreams-realty-logo"
              />
            </a>
          </div>
          <div className="navigation-menu d-none-mobile">
            <ul className="header-loading-wrapper__menu-wrapper">
              <li className="animate-loader ml-2 mr-2"></li>
              <li className="animate-loader ml-2 mr-2"></li>
              <li className="animate-loader ml-2 mr-2"></li>
              <li className="animate-loader ml-2 mr-2"></li>
              <li className="animate-loader ml-2 mr-2"></li>
            </ul>
          </div>
          <div className="header-button">
            <div className="shimmer-button animate-loader"></div>
          </div>
        </div>
      </header>
    );
  }
}
