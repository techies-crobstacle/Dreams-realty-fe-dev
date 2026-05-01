import GoogleMap from "@components/map/GoogleMap";
import { useJsApiLoader } from "@react-google-maps/api";
import { getValue } from "@utils/lodash";

export default function MapView(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    // googleMapsApiKey: "AIzaSyBWyyK5gkujBpxYNim55MUoSfo6cDWJM6w",
    // googleMapsApiKey: "AIzaSyB_LZsNx4Hw-XJGOO78C_cWhci9M3vDrv4",
    googleMapsApiKey: "AIzaSyCvzAcBeETi8eSSUzUuK6HjziyWAAE3-Mo",
  });
  const containerStyle = {
    width: "100%",
    height: "475px",
  };

  return (
    <section className="map-view-wrapper position-relative mb-5 mb-sm-0">
      {/* <button
        className="theme-button position-absolute"
        onClick={props.changetoListView}
      >
        <img
          src="/images/property-for-sale/right.svg"
          className="img-fluid mr-2"
          alt="chevron-right-icon"
        />
        List View
      </button> */}
      <GoogleMap
        isLoaded={isLoaded}
        loadError={loadError}
        places={getValue(props, "mapData", [])}
        mapContainerStyle={containerStyle}
      />
    </section>
  );
}
