import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Forecast({ forecast }) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Ensure forecast data is available and properly structured
  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return <p>Loading forecast...</p>;
  }

  // Generate chart data from forecast
  const data = {
    labels: forecast.map((day) => day.date || "Unknown"),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.map((day) => day.temp || 0),
        borderColor: "cyan",
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="forecast-container" ref={containerRef}>
      <h3>7-Day Forecast</h3>
      <div style={{ height: "300px" }}>
        {isMounted && <Line ref={chartRef} data={data} options={options} />}
      </div>
    </div>
  );
}