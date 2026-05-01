import Link from "next/link";
import React from "react";

export default function FeaturedBuyHeading() {
  return (
    <section className="featured-property-buy-wrapper--header d-flex justify-content-between align-items-center flex-direction-column-mobile mb-4 mb-md-4">
      <div className="featured-property-buy-wrapper--title d-flex align-items-center">
        <h3 className="m-0">Featured Properties to Buy</h3>
      </div>
      <div className="featured-property-buy-wrapper--slider-controls-buy d-flex align-items-center">
        <Link href="/property-for-sale">View All</Link>
        <div className="customer-story-wrapper--cta-wrapper">
          <ul className="d-flex gap-4 mb-0 align-items-center">
            <li>
              <div className="arrow mr-2 mr-md-4 property-card-slide-left">
                <img
                  src="/images/home/slider-controls/arrow-back.svg"
                  alt="chevron-left-icon"
                />
              </div>
            </li>
            <li>
              <div className="arrow property-card-slide-right">
                <img
                  src="/images/home/slider-controls/arrow-right.svg"
                  alt="chevron-right-icon"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
