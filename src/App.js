import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
// import * as pin from "./images";

// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// const map = new mapboxgl.Map({
//   container: "map-container",
//   style: "mapbox://styles/mapbox/streets-v11",
// });

function App() {
  const [poiData, setPoiData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 12,
    width: "90vw",
    height: "90vh",
  });

  const getPoiList = () => {
    axios
      .get(
        `https://api.openchargemap.io/v3/poi?key=${process.env.REACT_APP_OPENCHARGE}&distanceunit=15&maxresults=100&latitude=47.6062&longitude=-122.3321`
      )
      // go through the api and grab the coordinates for each charging ports
      .then((response) => {
        const newData = response.data.map((poi) => {
          // console.log(poi.AddressInfo);
          return {
            id: poi.AddressInfo.ID,
            lat: poi.AddressInfo.Latitude,
            long: poi.AddressInfo.Longitude,
          };
        });
        setPoiData(newData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // console.log(poiData);
  useEffect(getPoiList, []);

  return (
    <div className="App">
      <header>eevee App</header>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        SHOW ME YO MAPPPPPP!
        {poiData.map((poi) => (
          <Marker key={poi.id} latitude={poi.lat} longitude={poi.long}>
            {/* <img src="redpin" /> */}
            <div>X</div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
