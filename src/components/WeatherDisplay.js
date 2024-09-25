import React from 'react';

const WeatherDisplay = ({ weatherData, unit, toggleUnit }) => {
  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="weather-display">
      <h2>Current Weather</h2>
      <div className="temperature">
        {weatherData.temperature}°{unit}
      </div>
      <div className="weather-condition">
        {weatherData.weathercode === 0 ? 'Clear Sky' : 'Partly Cloudy'}
      </div>
      <button className="unit-toggle" onClick={toggleUnit}>
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDisplay;