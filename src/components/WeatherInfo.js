import "../styles/WeatherInfo.css";

export default function WeatherInfo({ weather, loading }) {
    if (loading) return <p>Loading...</p>;
    if (!weather || !weather.weather || weather.weather.length === 0) {
        return <p>No weather data available.</p>;
    }

    return (
        <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>

            {/* Weather Icon */}
            {weather.weather[0].icon && (
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    onError={(e) => (e.target.style.display = "none")} // Hide broken images
                />
            )}
        </div>
    );
}