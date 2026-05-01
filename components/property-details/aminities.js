import { getValue } from "/utils/lodash";

export default function Amminites(props) {
  return (
    <div className="property-details-wrapper--body--information--amminites property-details-section-separation">
      <h3 className="property-details-title">Amenities</h3>
      <div className="facilities">
        {getValue(props, "propertyInfo.amenities", []).map((item, index) => {
          return (
            <div className="d-flex align-items-center" key={index}>
              <img
                src="/images/property-details/circle-chk.svg"
                className="img-fluid img-margin"
                alt="check-with-circle-icon"
              />
              <p>{getValue(item, "title")}</p>
            </div>
          );
        })}

        {/* <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Football Court</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Convention Centre</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Cricket Pitch</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Seating Areat</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Health Club</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Open Air Theatre</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Gymnasium</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Table Tennis</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Basketball Court</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Swimming Pool</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Crèche</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Multipurpose Hall</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/property-details/circle-chk.svg"
                      className="img-fluid img-margin"
                    />
                    <p>Tennis Court</p>
                  </div>
               */}
      </div>
    </div>
  );
}
