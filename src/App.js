import React, { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { useAQI } from "./hooks/useAQI";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import AQI from "./components/AQI";
import WeatherMap from "./components/WeatherMap";
import "./styles/index.css";

import Forecast from "./components/Forecast";

function App() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("New Delhi"); // Default city
  const { weather, loading } = useWeather(city);
  const aqi = useAQI(weather?.coord?.lat, weather?.coord?.lon);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=YOUR_API_KEY")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Check API response
  
        if (data.list) {
          const formattedForecast = data.list.slice(0, 7).map((item) => ({
            date: item.dt_txt.split(" ")[0],
            temp: item.main.temp
          }));
          setForecast(formattedForecast); // Update state
          console.log("forecast", formattedForecast); // Log formatted forecast
        } else {
          console.error("No forecast data found in response");
        }
      })
      .catch((error) => console.error("Error fetching forecast:", error));
  }, []);

 

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
console.log("forecast",forecast);

      <AQI aqi={aqi} />
            <WeatherMap />
    </div>
  );
}

export default App;