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
    setIsMounted(true); // Ensures the chart only renders after mounting
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!forecast || forecast.length === 0) return <p>Loading forecast...</p>;

  const data = {
    labels: forecast.map((day) => day.date),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.map((day) => day.temp),
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
      {isMounted && containerRef.current && (
        <div style={{ height: "300px" }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>
      )}
    </div>
  );
}