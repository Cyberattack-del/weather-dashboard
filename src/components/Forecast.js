async function fetchWeatherData(city) {
  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // Update state with weather data
  } catch (error) {
      console.error("Failed to fetch weather data:", error);
      // Update state to reflect the error
  }
}