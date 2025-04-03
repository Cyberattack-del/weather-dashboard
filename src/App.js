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
  const [city, setCity] = useState("New Delhi");
  const [error, setError] = useState(""); // Error state for invalid cities
  const { weather, loading, weatherError } = useWeather(city);
  
  const aqi = useAQI(weather?.coord?.lat,weather?.coord?.lon);

  useEffect(() => {
    const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55"; 

    setError(""); 

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&units=metric&appid=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found. Please enter a valid city.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.list) {
          const formattedForecast = data.list.slice(0, 7).map((item) => ({
            date: item.dt_txt.split(" ")[0],
            temp: item.main.temp,
          }));
          setForecast(formattedForecast);
        } else {
          setError("No forecast data available.");
          setForecast(null);
        }
      })
      .catch((err) => {
        setError(err.message);
        setForecast(null);
      });
  }, [city]);

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={setCity} error={error || weatherError} />

      {error ? <p className="error-message">{error}</p> : <WeatherInfo weather={weather} loading={loading} />}

      {forecast ? <Forecast forecast={forecast} /> : <p>Loading forecast...</p>}

      {aqi !== null ? <AQI aqi={aqi} /> : <p>Loading AQI...</p>}

      <WeatherMap />
    </div>
  );
}

export default App;
