import React from "react";
import ReviewHeader from "@components/home/reviews/review-header.js";
import ReviewSlider from "@components/home/reviews/review-slider.js";

export default function Review(props) {
  return (
    <section className="customer-review-wrapper">
      <div className="custom-container" style={{ overflowY: "auto" }}>
        {/* <ReviewHeader /> */}
        <ReviewSlider reviews={props.reviews} />
      </div>
      <div className="rvw-btn text-center">
        <a
          href={`https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TLcoMDPNSUozYLRSNagwTkpMNTRMtbC0TDM0TTRNsjKoMEm2MDVJSbMwMUg0STQ1S_PiTSlKTcwtVgCSOSWVAKSVFIA&q=dreams+realty&rlz=1C5CHFA_enIN938IN938&oq=dreams+real&aqs=chrome.1.69i57j46i175i199i512j0i512l7.3214j0j15&sourceid=chrome&ie=UTF-8#lrd=0x3bae11e899f15a5b:0x4c854df840a4a56f,1,,,`}
          target="_blank"
          className="theme-button theme-primary-btn"
        >
          View More Google Reviews
        </a>
      </div>
    </section>
  );
}
