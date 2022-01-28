import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OPEN_CHARGE_API_URL = process.env.OPEN_CHARGE_API;
const key = process.env.key;

// Params:
// countrycode = "US"

const getPoiList = () => {
  axios
    .get(
      "https://api.openchargemap.io/v3/referencedata/?key=0932b917-00fe-4b0e-b21f-9183fedc8ce2"
    )
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
  return (
    <div className="App">
      <header>Mapbox Branch...</header>
    </div>
  );
}

export default App;
