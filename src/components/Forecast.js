import React from 'react';

const Forecast = ({ forecastData }) => {
  if (forecastData.length === 0) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="forecast">
      <h2>7-Day Forecast</h2>
      <div className="forecast-cards">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-card">
            <p><strong>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</strong></p>
            <p>Max: {day.tempMax}°</p>
            <p>Min: {day.tempMin}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;