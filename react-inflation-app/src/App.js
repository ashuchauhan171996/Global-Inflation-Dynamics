import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/App.css';
import ParameterSelector from './components/ParameterSelector'; 
import MultiLinePlot from './components/MultiLinePlot'; 
import Cartogram from './components/Cartogram'; 
import Header from './components/Header'; 

function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  // const parameterOptions1 = [
  //   { value: 'India', label: 'India' },
  //   { value: 'China', label: 'China' },
  //   // Add options specific to this instance
  // ];

  // const parameterOptions2 = [
  //   { value: 'Fiji', label: 'Fiji' },
  //   { value: 'India', label: 'India' },
  //   // Add options specific to this instance
  // ];

  const [parameterOptions, setParameterOptions] = useState([]);
  const [topparameterOptions, settopParameterOptions] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch parameter options from the backend
    axios.get('/country_options')
      .then((response) => {
        setParameterOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching parameter options:', error);
      });
  }, []);

  useEffect(() => {
    // Make an HTTP GET request to fetch parameter options from the backend
    axios.get('/top_country_options')
      .then((response) => {
        settopParameterOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top parameter options:', error);
      });
  }, []);



  return (
    <div>
      <Header/>
      <h5>Inflation variation with time</h5>
      <Cartogram/>
      <hr />
      <h5>Inflation comparision between countries</h5>
      <ParameterSelector parameterOptions={topparameterOptions} onDataFetched={setData2} />
      <div>
      <MultiLinePlot data={data2} />
      </div>
    </div>
  );
}

export default App;
