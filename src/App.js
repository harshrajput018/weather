import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import './App.css';

const DEFAULT_CITY = 'New York';

const fetchCityCoordinates = async (city) => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const { latitude, longitude } = data.results[0];
    return { latitude, longitude };
  } else {
    throw new Error('City not found');
  }
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [unit, setUnit] = useState('C');
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const { latitude, longitude } = await fetchCityCoordinates(city);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=${unit === 'C' ? 'celsius' : 'fahrenheit'}`
      );
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }
      const data = await response.json();
      setWeatherData(data.current_weather);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError(error.message);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const { latitude, longitude } = await fetchCityCoordinates(city);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${unit === 'C' ? 'celsius' : 'fahrenheit'}`
      );
      if (!response.ok) {
        throw new Error('Error fetching forecast data');
      }
      const data = await response.json();
      const forecast = data.daily.time.map((date, index) => ({
        date,
        tempMax: data.daily.temperature_2m_max[index],
        tempMin: data.daily.temperature_2m_min[index],
      }));

      setForecastData(forecast);
      setError(null);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setForecastData([]);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, [city, unit]);

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="app">
      <h1>Weather Forecast Application</h1>
      {error && <div className="error-message">{error}</div>}
      
      <div className="city-display">
        <h2>{city}</h2>
      </div>

      <CitySearch onCityChange={handleCityChange} />
      <WeatherDisplay weatherData={weatherData} unit={unit} toggleUnit={toggleUnit} />
      <Forecast forecastData={forecastData} />
    </div>
  );
}

export default App;