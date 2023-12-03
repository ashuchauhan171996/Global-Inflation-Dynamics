import React, { useState } from 'react';
import '../assets/css/Cartogram.css';

const Cartogram = () => {
  const [selectedYear, setSelectedYear] = useState(1970); // Initial year

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  
  return (
    <div>
      <div className='scroll'>
      <span style={{ marginRight: '10px' }}>Year: {selectedYear}</span>
      <input
        type="range"
        min={1970}
        max={1980}
        value={selectedYear}
        onChange={handleYearChange}
        style={{ width: '80%' }}
      />
      </div>
      <br />
      <img
        id="cartogram-image"
        alt={`Cartogram for ${selectedYear}`}
        src = {require(`../assets/images/${selectedYear}.png`)}
        // alt={`Cartogram for ${selectedYear}`}
        className="cartogram-image"
      />
    </div>
  );
};

export default Cartogram;
