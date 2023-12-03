import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/App.css';
import ParameterSelector from './components/ParameterSelector'; 
import MultiLinePlot from './components/MultiLinePlot'; 
import BoxPlot from './components/BoxPlot';
import Cartogram from './components/Cartogram'; 
import Header from './components/Header'; 

function App() {
  const [boxplotdata, setData_boxplot] = useState([]);
  const [multilinedata, setData_multiline] = useState([]);

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
  const [boxplotOptions, setboxplotOptions] = useState([]);

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

  useEffect(() => {
    // Make an HTTP GET request to fetch parameter options from the backend
    axios.get('/top_country_options')
      .then((response) => {
        setboxplotOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top parameter options:', error);
      });
  }, []);



  return (
    <div>
      <Header/>
      <div className='body-component-heading'>
      <h5>A. Inflation variation with time</h5>
      </div>
      <Cartogram/>
      <hr />
      <div className='body-component-heading'>
      <h5>B. Inflation comparision between countries</h5>
      </div>
      <ParameterSelector parameterOptions={topparameterOptions} onDataFetched={setData_multiline} route='/get_multiline_data' />
      
      <div className='body-component'>
      <MultiLinePlot data={multilinedata} />
      </div>

      <hr />
      <div className='body-component-heading'>
      <h5>C. Inflation variation in last 10 years (2012 - 2022)</h5>
      </div>
      <ParameterSelector parameterOptions={boxplotOptions} onDataFetched={setData_boxplot} route='/get_boxplot_data' />
      
      <div className='body-component'>
      <BoxPlot data={boxplotdata} />
      </div>

    </div>
  );
}

export default App;
