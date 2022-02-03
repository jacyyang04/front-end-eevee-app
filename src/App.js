import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import redpin from "./images/redpin.png";

// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// const map = new mapboxgl.Map({
//   container: "map-container",
//   style: "mapbox://styles/mapbox/streets-v11",
// });

function App() {
  // holds our station data
  const [stationData, setStationData] = useState([]);
  //sets the default map location to Seattle
  const [viewport, setViewport] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 12,
    width: "90vw",
    height: "90vh",
  });

  // holds selected station
  const [selectedStation, setSelectedStation] = useState(null);

  //on click esp closes pop
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedStation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return() => {
      window.removeEventListener("keydown", listener);
    }
  }, []);

  // beginning of CRUDE routes
  // get station request
  const getStationList = () => {
    axios
      .get(
        `https://api.openchargemap.io/v3/poi?key=${process.env.REACT_APP_OPENCHARGE}&distanceunit=15&maxresults=100&latitude=47.6062&longitude=-122.3321`
      )
      // .get(
      //   `https://api.openchargemap.io/v3/referencedata?key=${process.env.REACT_APP_OPENCHARGE}&countryid=2`
      // )
      // go through the api and grab the coordinates for each charging ports
      .then((response) => {
        console.log(response.data);
        const newData = response.data.map((station) => {
          return {
            id: station.AddressInfo.ID,
            lat: station.AddressInfo.Latitude,
            long: station.AddressInfo.Longitude,
            address: station.AddressInfo.AddressLine1,
            phone: station.AddressInfo.ContactTelephone1,
            title: station.AddressInfo.Title,
            connectionType: station.Connections[0].ConnectionType.Title,
            conntectionTypeID: station.Connections.ConnectionTypeID,
          };
        });
        setStationData(newData);
      })
      // .then((response) => {
      //   console.log(response.data);
      // })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // console.log(stationData);
  useEffect(getStationList, []);

  return (
    <div className="App">
      <header>eevee App</header>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => {
          setViewport(newViewport);
        }}
      >
        SHOW ME YO MAPPPPPP!
        {stationData.map((station) => (
          <Marker
            key={station.id}
            latitude={station.lat}
            longitude={station.long}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedStation(station);
              }}
            >
              <img className="img" src={redpin} alt="charger station" />
            </button>
          </Marker>
        ))}
        {selectedStation ? (
          <Popup
            latitude={selectedStation.lat}
            longitude={selectedStation.long}
            onClose={() => {
              setSelectedStation(null)
            }}
          >
            <div>
              <h2> {selectedStation.title}</h2>
              <p>{selectedStation.connectionType}</p>
              <p>{selectedStation.address}</p>
              <p>{selectedStation.phone}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
