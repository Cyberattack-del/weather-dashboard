import { MapContainer, TileLayer } from "react-leaflet";
import "../styles/WeatherMap.css";

export default function WeatherMap() {
    return (
        <MapContainer center={[20, 78]} zoom={5} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=04d0508e5f755e1deb3c5f6cfaff4b55" />
        </MapContainer>
    );
}