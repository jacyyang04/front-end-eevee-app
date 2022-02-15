import "./App.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import redpin from "./images/redpin.png";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

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

  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  // holds selected station
  const [selectedStation, setSelectedStation] = useState(null);

  //on click escape key closes pop
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
  // get station request
  const getStationList = ({ newlat, newlong }) => {
    axios
      .get(
        `https://api.openchargemap.io/v3/poi?key=${process.env.REACT_APP_OPENCHARGE}&distanceunit=15&maxresults=100&latitude=${newlat}&longitude=${newlong}`
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
  //renders the application
  return (
    <div className="App">
      <header className="App-header">
        <h1>eevee app</h1>
      </header>
      <nav className="App-nav">
        <p>
          SHOW ME MY <i> STATIONS</i>!
        </p>
      </nav>
      <div className="App-map">
        <div ref={geocoderContainerRef} className="mapboxgl-ctrl-geocoder" />
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/munizr/ckznawxzi000614na56hih5hj"
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
          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onViewportChange={(newViewport) => {
              setViewport(newViewport);
              const newlat = parseFloat(newViewport.latitude);
              const newlong = parseFloat(newViewport.longitude);
              getStationList({ newlat, newlong });
            }}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position="top-left"
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
        <a href="https://www.linkedin.com/in/rebecamuniz/">Rebeca Muniz.</a>
        <a href="https://www.linkedin.com/in/jacyyang04/">Jacy Yang.</a>
      </div>
    </div>
  );
}

export default App;
//CONSIDERING ADDING THIS FEATURE
// Adds zoom in and out icon on map
// const nav = new mapboxgl.NavigationControl(
//   map.addControl(nav)
// )
