import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/App.css';
import ParameterSelector from './components/ParameterSelector'; 
import MultiLinePlot from './components/MultiLinePlot'; 
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

  const [parameterOptions1, setParameterOptions1] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch parameter options from the backend
    axios.get('/country_options')
      .then((response) => {
        setParameterOptions1(response.data);
      })
      .catch((error) => {
        console.error('Error fetching parameter options:', error);
      });
  }, []);

  return (
    <div>
      <Header/>
      <ParameterSelector parameterOptions={parameterOptions1} onDataFetched={setData1} />
      {/* <pre>{JSON.stringify(data1, null, 2)}</pre> */}
      <div>
      <MultiLinePlot data={data1} />
      </div>
      <hr />
      {/* <ParameterSelector parameterOptions={parameterOptions2} onDataFetched={setData2} />
      <div>
      <MultiLinePlot data={data2} />
      </div> */}
    </div>
  );
}

export default App;
