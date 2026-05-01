import ProjectAboutUs from "@components/property-details/loading/project-about-us.js";
import PropertyHighlight from "@components/property-details/loading/property-highlight.js";

export default function ProjectIntroduction() {
  return (
    <div className="property-details-wrapper d-flex justify-content-center custom-container">
      <div className="d-flex w-100 gap-3">
        <div className="mb-3">
          <div className="property-details-container">
            <div className="property-details-wrapper__header property-details-wrapper__header--loading d-flex flex-direction-column-mobile align-items-center">
              <div className="property-details-wrapper__header-img">
                <img
                  src="/images/logo/logo.png"
                  className="img-fluid property-logo-dimentions"
                  alt="dreams-realty-logo"
                />
              </div>
              <div className="property-details-wrapper__details-container w-100">
                <div className="property-details-wrapper__details-wrapper d-flex flex-direction-column-mobile align-items-center justify-content-between">
                  <div className="property-details-wrapper__details">
                    <h3 className="animate-loader mb-3"></h3>
                    <p className="animate-loader mb-1"></p>
                    <p className="animate-loader"></p>
                  </div>
                  <div className="property-details-wrapper__contact-details text-right">
                    <div className="property-price text-right mt-4 mt-sm-0">
                      <h4 className="animate-loader d-inline-block"></h4>
                      <p className="animate-loader d-inline-block"></p>
                    </div>
                  </div>
                </div>
                <div className="property-details-wrapper__details-wrapper d-flex align-items-center justify-content-between flex-direction-column-mobile mt-4">
                  <div className="property-details-wrapper__details-button">
                    <div className="header-btns d-flex flex-direction-column-mobile">
                      <button className="theme-button theme-secondary-btn animate-loader">
                        <img
                          src="/images/property-details/cta-icons/Download-Brochure.svg"
                          className="img-fluid mr-2"
                          alt="download-icon"
                        />
                        Download Brochure
                      </button>
                      <button className="theme-button theme-secondary-btn animate-loader">
                        <img
                          src="/images/property-details/cta-icons/share.svg"
                          className="img-fluid mr-2"
                          alt="share-icon"
                        />
                        Share
                      </button>
                      <button className="theme-button theme-secondary-btn animate-loader">
                        <a href="#0" target="_blank">
                          <img
                            src="/images/property-details/cta-icons/Directions.svg"
                            className="img-fluid mr-2"
                            alt="direction-icon"
                          />
                          Directions
                        </a>
                      </button>
                      <button className="theme-button theme-secondary-btn mr-0 animate-loader">
                        <img
                          src="/images/property-details/cta-icons/Virtual-Tour.svg"
                          className="img-fluid mr-2"
                          alt="virtual-tour-icon"
                        />
                        Virtual Tour
                      </button>
                    </div>
                  </div>
                  <div className="property-details-wrapper__contact-details text-right">
                    <a href="#0">
                      <button className="theme-button theme-primary-btn phone-button align-items-center">
                        <img
                          src="/images/footer-icons/phone.svg"
                          className="img-fluid mr-2 d-inline-block"
                          alt="phone-icon"
                        />
                        Loading...
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="property-details-container">
            <PropertyHighlight />
            <ProjectAboutUs />
          </div>
        </div>
        <div className="property-details-wrapper--body--contact-us mt-3"></div>
      </div>
    </div>
  );
}
