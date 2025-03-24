import "../styles/AQI.css";

export default function AQI({ aqi }) {
    if (aqi === null) return <p>Loading AQI...</p>;

    const getAQIStatus = (value) => {
        if (value === 1) return { status: "Good", color: "green" };
        if (value === 2) return { status: "Fair", color: "yellow" };
        if (value === 3) return { status: "Moderate", color: "orange" };
        if (value === 4) return { status: "Poor", color: "red" };
        if (value === 5) return { status: "Very Poor", color: "purple" };
        return { status: "Unknown", color: "gray" };
    };

    const { status, color } = getAQIStatus(aqi);

    return (
        <div className="aqi-container" style={{ borderColor: color }}>
            <h3>Air Quality Index</h3>
            <p className="aqi-value" style={{ color }}>{status} ({aqi})</p>
        </div>
    );
}