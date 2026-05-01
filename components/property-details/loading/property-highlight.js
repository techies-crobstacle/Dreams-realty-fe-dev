export default function PropertyHighlight() {
  return (
    <div className="property-details-wrapper--body--information--property-highlight property-details-wrapper--body--information--property-highlight--loading mt-3 property-details-section-separation">
      <h3 className="property-details-title">Property Highlights</h3>
      <div className="plot-details">
        <ul>
          <li className="d-flex align-items-center border-bottom">
            <div className="plot-list d-flex align-items-center">
              <img
                src="/images/chair_black_24dp.svg"
                className="img-fluid plot-list-img"
                alt="chair-icon"
              />
              <h6>Facing</h6>
            </div>
            <p className="animate-loader">Loading...</p>
          </li>
          <li className="d-flex align-items-center border-bottom">
            <div className="plot-list d-flex align-items-center">
              <img
                src="/images/explore_black_24dp.svg"
                className="img-fluid plot-list-img"
                alt="compass-icon"
              />
              <h6>Furnishing</h6>
            </div>
            <p className="animate-loader">Loading...</p>
          </li>
          <li className="d-flex align-items-center border-bottom">
            <div className="plot-list d-flex align-items-center">
              <img
                src="/images/fullscreen_black_24dp.svg"
                className="img-fluid plot-list-img"
                alt="expand-icon"
              />
              <h6>Development Size (Acres)</h6>
            </div>
            <p className="animate-loader">Loading...</p>
          </li>
          <li className="d-flex align-items-center border-bottom">
            <div className="plot-list d-flex align-items-center">
              <img
                src="/images/line_weight_black_24dp.svg"
                className="img-fluid plot-list-img"
                alt="lines-with-weight-icon"
              />
              <h6>Total Units</h6>
            </div>
            <p className="animate-loader">Loading...</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
