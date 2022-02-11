import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import redpin from "./images/redpin.png";
// import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

function App() {
  // holds our station data
  //get current location

  const [stationData, setStationData] = useState([]);
  //sets the default map location to Seattle
  const [viewport, setViewport] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 12,
    width: "100vw",
    height: "100vh",
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

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  // add geolocator formatting
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true,
  });

  function successLocation(position) {
    // console.log(position);
    setViewport((viewport) => ({
      ...viewport,
      latitude: parseFloat(position.coords.latitude),
      longitude: parseFloat(position.coords.longitude),
    }));
  }

  function errorLocation() {}

  // beginning of CRUDE routes
  // get station request
  const getStationList = ({ searchBoxLat, searchBoxLong }) => {
    axios
      .get(
        `https://api.openchargemap.io/v3/poi?key=${process.env.REACT_APP_OPENCHARGE}&distanceunit=15&maxresults=100&latitude=${searchBoxLat.value}&longitude=${searchBoxLong.value}`
      )
      // go through the api and grab the coordinates for each charging ports
      .then((response) => {
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
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>eevee app</h1>
      </header>
      <nav className="App-nav">
        <p>SHOW ME MY STATIONS!</p>
        <input
          id="searchInputLat"
          className="searchInputLat"
          placeholder="Search Location Lat..."
          type="text"
        />
        <input
          id="searchInputLong"
          className="searchInputLong"
          placeholder="Search Location Long..."
          type="text"
        />
        <button
          id="goButton"
          className="go"
          onClick={(e) => {
            e.preventDefault();
            const searchBoxLat = document.getElementById("searchInputLat");
            const searchBoxLong = document.getElementById("searchInputLong");
            // alert(searchBox.value);
            console.log(searchBoxLat);
            console.log(searchBoxLong);
            getStationList({ searchBoxLat, searchBoxLong });
            setViewport((viewport) => ({
              ...viewport,
              latitude: parseFloat(searchBoxLat.value),
              longitude: parseFloat(searchBoxLong.value),
            }));
          }}
        >
          Go!
        </button>
      </nav>
      <div className="App-map">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          // mapStyle="mapbox://styles/munizr/ckz947dv7000v15qnfa41z08z"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(newViewport) => {
            setViewport(newViewport);
          }}
        >
          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            auto
          />
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
                setSelectedStation(null);
              }}
            >
              <div classname="card">
                <label> Charging Station</label>
                <h4 className="description"> {selectedStation.title}</h4>
                <label> Connector</label>
                <p className="description">{selectedStation.connectionType}</p>
                <label> Address</label>
                <p className="description">{selectedStation.address}</p>
                <label> Phone</label>
                <p className="description">{selectedStation.phone}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
      <div className="App-footer">
        <p>Add Linkedin</p>
      </div>
    </div>
  );
}

export default App;

// Adds zoom in and out icon on map
// const nav = new mapboxgl.NavigationControl(
//   map.addControl(nav)
// )
