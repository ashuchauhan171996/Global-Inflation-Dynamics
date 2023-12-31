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
      {/* <span style={{ marginRight: '10px' }}>Year: {selectedYear}</span> */}
      <input
        type="range"
        min={1970}
        max={2022}
        value={selectedYear}
        onChange={handleYearChange}
        style={{ width: '80%' }}
      />
      </div>
      <div className='selected-year'><span style={{ marginRight: '10px' }}>Inflation for Year: {selectedYear}</span></div>
      {/* <br /> */}
      <img
        id="cartogram-image"
        alt={`Cartogram for ${selectedYear}`}
        src = {require(`../assets/images/newplot${selectedYear}.png`)}
        // alt={`Cartogram for ${selectedYear}`}
        className="cartogram-image"
      />
    </div>
  );
};

export default Cartogram;
