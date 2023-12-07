import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../assets/css/ParameterSelector.css';

function ParameterSelector({ parameterOptions, onDataFetched , route}) {
  const [selectedParameters, setSelectedParameters] = useState([]);

  const handleParameterChange = (selectedOptions) => {
    setSelectedParameters(selectedOptions);
  };

  const handleSelectAll = () => {
    setSelectedParameters(parameterOptions);
  };

  const fetchData = () => {
    const selectedParameterValues = selectedParameters.map((param) => param.value);
    axios.post(route, { selectedParameters: selectedParameterValues })
      .then((response) => {
        // setData(response.data);
        onDataFetched(response.data); // Pass data to the parent component
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, []); // Empty dependency array to run once

  return (
    <div className='body-text-black'>
    <div className="inline-container">
      <button className="fetch-button" onClick={handleSelectAll}>Select All</button>
      <Select
        options={parameterOptions}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleParameterChange}
        value={selectedParameters}
        className="fixed-width-select"
        placeholder= 'Select countries'
      />
      <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
      
      </div>
      </div>
  );
}

export default ParameterSelector;