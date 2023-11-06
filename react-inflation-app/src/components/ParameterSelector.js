import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../assets/css/ParameterSelector.css';

function ParameterSelector({ parameterOptions, onDataFetched }) {
  const [selectedParameters, setSelectedParameters] = useState([]);

  const handleParameterChange = (selectedOptions) => {
    setSelectedParameters(selectedOptions);
  };

  const fetchData = () => {
    const selectedParameterValues = selectedParameters.map((param) => param.value);
    axios.post('/get_inflation_data', { selectedParameters: selectedParameterValues })
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
      <Select
        options={parameterOptions}
        isMulti
        onChange={handleParameterChange}
        value={selectedParameters}
        className="fixed-width-select"
      />
      <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
      </div>
      </div>
  );
}

export default ParameterSelector;