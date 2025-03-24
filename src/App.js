import React, { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { useAQI } from "./hooks/useAQI";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import AQI from "./components/AQI";
import WeatherMap from "./components/WeatherMap";
import Forecast from "./components/Forecast";
import "./styles/index.css";

function App() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("New Delhi"); // Default to an Indian city
  const { weather, loading } = useWeather(city);
  const aqi = useAQI(weather?.coord?.lat, weather?.coord?.lon);

  useEffect(() => {
    const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55"; // Replace with a valid OpenWeather API key

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&units=metric&appid=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response for", city, ":", data); // Debugging API response

        if (data.list) {
          const formattedForecast = data.list.slice(0, 7).map((item) => ({
            date: item.dt_txt.split(" ")[0],
            temp: item.main.temp,
          }));
          setForecast(formattedForecast);
          console.log("Formatted Forecast:", formattedForecast);
        } else {
          console.error("No forecast data found in response");
          setForecast(null);
        }
      })
      .catch((error) => console.error("Error fetching forecast:", error));
  }, [city]); // Fetches new forecast when city changes

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={setCity} />
      <WeatherInfo weather={weather} loading={loading} />
      {forecast && forecast.length > 0 ? (
        <Forecast forecast={forecast} />
      ) : (
        <p>Loading forecast...</p>
      )}
      <AQI aqi={aqi} />
      <WeatherMap />
    </div>
  );
}

export default App;