import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const key = process.env.key;

const getPoiList = () => {
  axios
    .get(`https://api.openchargemap.io/v3/poi?key=${key}`)
    .then((response) => {
      console.log(response);
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
