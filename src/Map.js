import { lazy, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ location }) => {
  const [viewport, setViewport] = useState({
    width: 650,
    height: 400,
    latitude: 21.7679,
    longitude: 78.8718,
    zoom: 3.5,
  });




  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {location &&
        location.map((place) => (
          <Marker
            latitude={place.latitude}
            longitude={place.longitude}
            offsetLeft={0}
            offsetTop={0}
            key={place.longitude}
          >
            <div className="icon-dc my-icon">
              <div className="loc_name">{place.name}</div>
            </div>
          </Marker>
        ))}
    </ReactMapGL>
  );
};

export default Map;
