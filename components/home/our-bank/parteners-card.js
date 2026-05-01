import React from "react";
import { getValue } from "/utils/lodash";
export default class PartnersCard extends React.Component {
  render() {
    return (
      <div className="customer-card-wrapper">
        <img
          src={
            process.env.NEXT_PUBLIC_API_URL +
            getValue(this.props, `ourBankPropObj.image.url`, "")
          }
          className="img-fluid"
          alt="our-partner-banks-logo"
        />
      </div>
    );
  }
}
