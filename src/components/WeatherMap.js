import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/WeatherMap.css"; // Import the CSS file

const WeatherMap = () => {
  return (
    <div className="map-container">
      <MapContainer 
        center={[20, 77]}  // India Center
        zoom={5} 
        className="leaflet-map"
      >
        <TileLayer
          url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=04d0508e5f755e1deb3c5f6cfaff4b55"
        />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;