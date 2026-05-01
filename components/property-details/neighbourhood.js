import { getValue } from "/utils/lodash";

export default function Neighbourhood(props) {
  const imageSelector = (value) => {
    switch (value) {
      case "Hospitals":
        return `hospital_icon.svg`;
      case "Tech Parks":
        return `tech_park_icon.svg`;
      case "Shopping Malls":
        return `shopping_mall_icon.svg`;
      case "Restaurants":
        return `restaurant_icon.svg`;
      case "Schools":
        return `schools_icon.svg`;
      default:
        return `hotel_icon.svg`;
    }
  };
  return (
    <div className="property-details-wrapper--body--information--neighbourhood property-details-section-separation">
      <h3 className="property-details-title">Neighbourhood</h3>
      <div className="neighbourhood-grid">
        {getValue(props, "propertyInfo.neighborhood", []).map((item) => {
          return (
            <>
              <div className="neighbourhood-facility d-flex align-items-start gap-2">
                <img
                  src={`/neighbour/${imageSelector(item.title)}`}
                  className="img-fluid mr-3"
                  alt={`${getValue(item, "title", "").replace(
                    /\s+/g,
                    "-"
                  )}-icon`}
                />
                <div className="facility-details">
                  <h6>{getValue(item, "title", "")}</h6>
                  <ul>
                    {getValue(item, "points", []).map((item1) => {
                      return (
                        <li>
                          <span className="dot"></span>
                          {getValue(item1, "entry", "")}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          );
        })}
        {/* <div className="neighbourhood-facility d-flex align-items-start">
                    <img
                      src="/images/property-details/hospital.svg"
                      className="img-fluid mr-3"
                    />
                    <div className="facility-details">
                      <h6>Hospital</h6>
                      <ul>
                        <li>
                          <span className="dot"></span>The International School
                          Bangalore (TISB)
                        </li>
                        <li>
                          <span className="dot"></span>Ryan International School
                        </li>
                        <li>
                          <span className="dot"></span>Inventure Academy
                        </li>
                        <li>
                          <span className="dot"></span>Oakridge International
                          School
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="neighbourhood-facility d-flex align-items-start">
                    <img
                      src="/images/property-details/business.svg"
                      className="img-fluid mr-3"
                    />
                    <div className="facility-details">
                      <h6>Tech Park</h6>
                      <ul>
                        <li>
                          <span className="dot"></span>The International School
                          Bangalore (TISB)
                        </li>
                        <li>
                          <span className="dot"></span>Ryan International School
                        </li>
                        <li>
                          <span className="dot"></span>Inventure Academy
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="neighbourhood-facility d-flex align-items-start">
                    <img
                      src="/images/property-details/mall.svg"
                      className="img-fluid mr-3"
                    />
                    <div className="facility-details">
                      <h6>Shoping Malls</h6>
                      <ul>
                        <li>
                          <span className="dot"></span>The International School
                          Bangalore (TISB)
                        </li>
                        <li>
                          <span className="dot"></span>Ryan International School
                        </li>
                        <li>
                          <span className="dot"></span>Inventure Academy
                        </li>
                        <li>
                          <span className="dot"></span>Oakridge International
                          School
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="neighbourhood-facility d-flex align-items-start">
                    <img
                      src="/images/property-details/restaurant.svg"
                      className="img-fluid mr-3"
                    />
                    <div className="facility-details">
                      <h6>Restaurant</h6>
                      <ul>
                        <li>
                          <span className="dot"></span>The International School
                          Bangalore (TISB)
                        </li>
                        <li>
                          <span className="dot"></span>Ryan International School
                        </li>
                        <li>
                          <span className="dot"></span>Inventure Academy
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="neighbourhood-facility d-flex align-items-start">
                    <img
                      src="/images/property-details/hotel.svg"
                      className="img-fluid mr-3"
                    />
                    <div className="facility-details">
                      <h6>Hotel Stay</h6>
                      <ul>
                        <li>
                          <span className="dot"></span>The International School
                          Bangalore (TISB)
                        </li>
                        <li>
                          <span className="dot"></span>Ryan International School
                        </li>
                        <li>
                          <span className="dot"></span>Inventure Academy
                        </li>
                      </ul>
                    </div>
                  </div>
              */}
      </div>
    </div>
  );
}
