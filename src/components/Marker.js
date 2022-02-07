
  
  // Only rerender markers if props.data has changed

// function Markers() {
//   const markers = React.useMemo(() => data.map(
//   city => (
//     <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} >
//       <img src="pin.png" />
//     </Marker>
//   )
// ), [props.data]);
 

//   return (
//   //stationData.map((station) => (
//     <Marker
//       key={station.id}
//       latitude={station.lat}
//       longitude={station.long}
//     >
//       <button
//         className="marker-btn"
//         onClick={(e) => {
//           e.preventDefault();
//           setSelectedStation(station);
//         }}
//       >
//         <img className="img" src={redpin} alt="charger station" />
//       </button>
//     </Marker>
//   );
//   {selectedStation ? (
//     <Popup
//       latitude={selectedStation.lat}
//       longitude={selectedStation.long}
//       onClose={() => {
//         setSelectedStation(null)
//       }}
//     >
//       <div>
//         <h2> {selectedStation.title}</h2>
//         <p>{selectedStation.connectionType}</p>
//         <p>{selectedStation.address}</p>
//         <p>{selectedStation.phone}</p>
//       </div>
//     </Popup>
//   ) : null}
//   )
// }