import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OPEN_CHARGE_URL = process.env.OPEN_CHARGE_URL;
const key = process.env.key;

// Params:

// countrycode = "US"

const getPoiList = () => {
  axios

    .get(`https://api.openchargemap.io/v3/referencedata/?key=${key}`)

    //.get(`${OPEN_CHARGE_API_URL}?key=${key}`)

    .then((response) => {
      console.log(response);

      return response.data;
    })

    .catch((error) => {
      console.log(error.response.data);
    });
};

// &latitude=74.0060&longitude=40.712

function App() {
  getPoiList();

  // CREATE query string so that getPOIlist doesn't run with every refresh

  // return <div>HIIIIII</div>;

  return (
    <div className="App">
      <header>Loading..</header>
      <iframe
        src="https://map.openchargemap.io/?mode=embedded"
        allow="geolocation"
        frameborder="0"
        width="100%"
        height="500px"
      ></iframe>
    </div>
  );
}

export default App;
