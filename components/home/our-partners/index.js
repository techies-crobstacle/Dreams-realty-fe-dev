import React from "react";
import PartnersSlider from "@components/home/our-partners/partner-slider.js";

export default class OurPartner extends React.Component {
  render() {
    return (
      <div className="customer-story-wrapper">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between mb-2 mb-sm-0">
            <div className="customer-story-wrapper--title">
              <h2 className="medium-bold-font">
                {/* Our Partners */}
                Builder Partners
              </h2>
            </div>
            <div className="customer-story-wrapper--cta-wrapper">
              <ul className="d-flex gap-3">
                <li>
                  <div className="arrow mr-2 mr-md-4 CustomerCard-slide-left">
                    <img
                      src="/images/home/slider-controls/arrow-back.svg"
                      alt="chevron-left-icon"
                    />
                  </div>
                </li>
                <li>
                  <div className="arrow CustomerCard-slide-right">
                    <img
                      src="/images/home/slider-controls/arrow-right.svg"
                      alt="chevron-right-icon"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <PartnersSlider partnersList={this.props.partnersList} />
        </div>
      </div>
    );
  }
}
