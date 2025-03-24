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
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=YOUR_API_KEY&units=metric")
      .then((res) => res.json())
      .then((data) => setForecast(data.list))
      .catch((err) => console.error("Error fetching forecast:", err));
  }, []);

  return (
    <div className="app-container">
            <h1>Weather Dashboard 2099</h1>
            <SearchBar onSearch={setCity} />
            <WeatherInfo weather={weather} loading={loading} />
      {forecast ? <Forecast forecast={forecast} /> : <p>Loading forecast...</p>}
      <AQI aqi={aqi} />
            <WeatherMap />
    </div>
  );
}

export default App;