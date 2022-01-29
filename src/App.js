import "./App.css";
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";

// const getPoiList = () => {
//   axios
//     .get(`https://api.openchargemap.io/v3/poi?key=${key}`)
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error.response.data);
//     });
// };

// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// mapboxAPIAccessToken = process.env.REACT_APP_MAPBOX;

// const map = new mapboxgl.Map({
//   container: "map-container",
//   style: "mapbox://styles/mapbox/streets-v11",
// });

// &latitude=74.0060&longitude=40.712

function App() {
  const [viewport, setViewport] = useState({
    latitude: 47.6062,
    longitude: 122.3321,
    zoom: 10,
    width: "50vw",
    height: "50vh",
  });

  return (
    <div className="App">
      <header>eevee App</header>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        SHOW ME YO MAPPPPPP!
      </ReactMapGL>
    </div>
  );
}

export default App;
