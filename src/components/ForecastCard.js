import React from 'react';

function ForecastCard({ dayData }) {
  const { dt_txt, main, weather } = dayData;
  const date = new Date(dt_txt);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  return (
    <div className="forecast-card">
      <h3>{dayOfWeek}</h3>
      <img src={weatherIcon} alt={weather[0].description} />
      <p>High: {main.temp_max}°</p>
      <p>Low: {main.temp_min}°</p>
    </div>
  );
}

export default ForecastCard;