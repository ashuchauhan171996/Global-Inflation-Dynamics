import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/App.css';
import ParameterSelector from './components/ParameterSelector'; 
import DoubleParameterSelector from './components/DoubleParameterSelector'; 
import MultiLinePlot from './components/MultiLinePlot'; 
import DoubleMultiLinePlot from './components/DoubleMultiLinePlot'; 
import BoxPlot from './components/BoxPlot';
import ScatterPlotSingle from './components/ScatterPlotSingle';
import Cartogram from './components/Cartogram'; 
import Header from './components/Header'; 

function App() {
  const [boxplotdata, setData_boxplot] = useState([]);
  const [multilinedata, setData_multiline] = useState([]);
  const [indicatormultilinedata, setData_indicatormultiline] = useState([]);

  const [topparameterOptions, settopParameterOptions] = useState([]);
  const [boxplotOptions, setboxplotOptions] = useState([]);
  const [indicatorOptions, setIndicatorOptions] = useState([]);
 

  // useEffect(() => {
  //   // Make an HTTP GET request to fetch parameter options from the backend
  //   axios.get('/country_options')
  //     .then((response) => {
  //       setParameterOptions(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching parameter options:', error);
  //     });
  // }, []);

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
        console.error('Error fetching top parameter options for box plot:', error);
      });
  }, []);

  useEffect(() => {
    // Make an HTTP GET request to fetch parameter options from the backend
    axios.get('/indicator_options')
      .then((response) => {
        setIndicatorOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching indicator options:', error);
      });
  }, []);


  return (
    <div>
      <Header/>
      <div className='body-component-heading'>
      <h5>A. Global Inflation variation with time (1970 - 2023)</h5>
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
      <h5>C. Inflation variation in last 10 years (2012 - 2022) using Boxplot</h5>
      </div>
      <ParameterSelector parameterOptions={boxplotOptions} onDataFetched={setData_boxplot} route='/get_boxplot_data' />
      <div className='body-component'>
      <BoxPlot data={boxplotdata} />
      </div>

      <hr />
      <div className='body-component-heading'>
      <h5>D. Comparision of Inflation with other Indicators</h5>
      </div>
      <DoubleParameterSelector parameterOptions1={indicatorOptions} parameterOptions2={topparameterOptions}  onDataFetched={setData_indicatormultiline} route='/get_indicator_data' />
      <div className='body-component'>
      <DoubleMultiLinePlot data={indicatormultilinedata} />
      </div>

      <div className='body-component-heading'>
      <h5>E. Correlation of Inflation with other Indicators</h5>
      </div>
      <ScatterPlotSingle/>


    </div>
  );
}

export default App;
