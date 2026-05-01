import React, { useEffect, useState } from "react";
import {
  GoogleMap as ReactGoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { getValue } from "/utils/lodash";

const divStyle = {
  background: `white`,
  display: "flex",
  margin: 0,
};

const onLoad = (marker) => {};

const ZOOM = 10.5;

function GoogleMap(props) {
  const { places = [], mapContainerStyle, isLoaded, loadError } = props;
  const [info, setInfo] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (places.length > 0) {
      setCenter(places[0]);
    }
  }, [places]);

  const onMarkerClick = (e, place) => {
    if (e.latLng) {
      setInfo({
        ...place,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  const renderMap = () => {
    if (!center) {
      return <h1>No places available</h1>;
    }

    return (
      <ReactGoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={ZOOM}
      >
        {info && (
          <InfoWindow
            onLoad={onLoad}
            position={info}
            onCloseClick={() => setInfo(null)}
            options={{ pixelOffset: new google.maps.Size(0, -30) }}
          >
            <div style={divStyle}>
              <img
                src={
                  getValue(info, "image", "")
                    ? process.env.NEXT_PUBLIC_API_URL +
                      getValue(info, "image", "")
                    : "https://via.placeholder.com/150"
                }
                alt={info.name}
                height={80}
                width={80}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  padding: 5,
                }}
              >
                <h3 style={{ margin: 0 }}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      info.type !== "rent"
                        ? `/property-for-sale/${info.slug}/${info.type}`
                        : `/property-for-rent/${info.slug}/${info.type}`
                    }
                  >
                    {info.name}
                  </a>
                </h3>
                <p>{info.address}</p>
              </div>
            </div>
          </InfoWindow>
        )}
        {places.map((place) => (
          <Marker
            key={place.lng}
            onLoad={onLoad}
            position={place}
            onClick={(e) => onMarkerClick(e, place)}
          />
        ))}
      </ReactGoogleMap>
    );
  };

  if (!isLoaded) return <h1>Loading map...</h1>;
  if (loadError) return <h1>The map could not be loaded at this time.</h1>;

  return renderMap();
}

export default React.memo(GoogleMap);
