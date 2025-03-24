import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55";

export function useAQI(lat, lon) {
    const [aqi, setAqi] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            .then(res => setAqi(res.data.list[0].main.aqi))
            .catch(err => console.error("Error fetching AQI:", err));
    }, [lat, lon]);

    return aqi;
}