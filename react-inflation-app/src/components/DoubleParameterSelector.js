import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../assets/css/DoubleParameterSelector.css';

function DoubleParameterSelector({ parameterOptions1, parameterOptions2, onDataFetched , route}) {
  const [selectedParameters1, setSelectedParameters1] = useState([]);
  const [selectedParameters2, setSelectedParameters2] = useState([]);

  const handleParameterChange1 = (selectedOptions) => {
    setSelectedParameters1(selectedOptions);
  };

  const handleParameterChange2 = (selectedOptions) => {
    setSelectedParameters2(selectedOptions);
  };

  const handleSelectAll = () => {
    setSelectedParameters1(parameterOptions1);
  };


  const fetchData = () => {
    const selectedParameterValues1 = selectedParameters1.map((param) => param.value);
    const selectedParameterValues2 = selectedParameters2.map((param) => param.value);
    axios.post(route, { selectedParameters1: selectedParameterValues1 , selectedParameters2: selectedParameterValues2 })
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
      {/* <button className="fetch-button" onClick={handleSelectAll}>Select All</button> */}
      <div>
      <Select
        options={parameterOptions1}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleParameterChange1}
        value={selectedParameters1}
        className="fixed-width-select1"
        placeholder= 'Select Indicators to compare'
      />
      </div>
      <div>
      <Select
        options={parameterOptions2}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleParameterChange2}
        value={selectedParameters2}
        className="fixed-width-select2"
        placeholder= 'Select country'
      />
      </div>
      <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
      
      </div>
      </div>
  );
}

export default DoubleParameterSelector;