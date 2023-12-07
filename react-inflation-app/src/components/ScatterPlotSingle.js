import React, { useState } from 'react';
import Select from 'react-select';
import '../assets/css/ScatterPlotSingle.css';

const ScatterPlotSingle = () => {
  const [selectedCountry, setSelectedCountry] = useState({ label: 'India', value: 'India' });
  const countriesList = [
    { label: 'India', value: 'India' },
    { label: 'United States', value: 'United States' },
    { label: 'France', value: 'France' },
    { label: 'Germany', value: 'Germany' },
    { label: 'China', value: 'China' },
    { label: 'Japan', value: 'Japan' },
  ];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black', // Set the text color to black
    }),
  };

  return (
    <div>
    <div className='scroll1'>
      <Select
        options={countriesList}
        onChange={handleCountryChange}
        value={selectedCountry}
        className="fixed-width-select3"
        placeholder='India'
        styles={customStyles}
      />
    </div>
      <div className='selected-year'>
        <span style={{ marginRight: '10px' }}>Inflation for Year: {selectedCountry.label}</span>
      </div>
      <img
        id="cartogram-image"
        alt={`Cartogram for ${selectedCountry.label}`}
        src={require(`../assets/images/${selectedCountry.value}.png`)}
        className="scatter-image"
      />
    </div>
  );
};

export default ScatterPlotSingle;
