import React, { useState } from 'react';

function CitySearch({ onCityChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onCityChange(inputValue);
    }
    setInputValue('');
  };

  return (
    <div className="city-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search city..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default CitySearch;