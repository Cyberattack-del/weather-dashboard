import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55";

export function useWeather(city) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!city) return;
        setLoading(true);

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => setWeather(res.data))
            .catch(err => console.error("Error fetching weather:", err));

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => setForecast(res.data.list))
            .catch(err => console.error("Error fetching forecast:", err))
            .finally(() => setLoading(false));
    }, [city]);

    return { weather, forecast, loading };
}