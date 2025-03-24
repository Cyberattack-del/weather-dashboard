import "../styles/WeatherInfo.css";

export default function WeatherInfo({ weather, loading }) {
    if (loading) return <p>Loading...</p>;
    if (!weather || !weather.weather || weather.weather.length === 0) {
        return <p>No weather data available.</p>;
    }

    const { name, weather: weatherDetails, main } = weather;
    const { description, icon } = weatherDetails[0];

    return (
        <div className="weather-info">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Temperature: {main.temp}°C</p>
            <p>Humidity: {main.humidity}%</p>
            {icon && (
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="Weather Icon"
                    onError={(e) => (e.target.style.display = "none")}
                />
            )}
        </div>
    );
}