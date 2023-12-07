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
      <h5>General Obervations:</h5>
      <p>* <b className='bold-color'>1973-1974 Oil Crisis:</b> The OPEC oil embargo led to a spike in oil prices, causing a surge in inflation globally. We see most of the countries in yellow, especially the Americas and Africa. This means high inflation throughout the world except parts of Asia like Russia which are rich in Oil themselves. </p>
      <p>* <b className='bold-color'>1980-1981 Volcker Shock</b> The U.S. Federal Reserve, led by Paul Volcker, raised interest rates sharply to combat inflation, contributing to a global recession. We can see a peak for all countries in the line graph below, suggesting surge in global inflation in 1980. The cartogram is also mostly yellow green for this year.</p>
      <p>* <b className='bold-color'>1991 Dissolution of the Soviet Union:</b> The Soviet Union collapses, leading to the emergence of new independent states and significant geopolitical changes. The line graph clearly indicates a bad time for Russia in the 1990s following this crisis. </p>
      <p>* <b className='bold-color'>1997-1998 Asian Financial Crisis:</b> Several Asian economies experienced severe economic downturns, affecting global inflation. We see from the cartogram below, that most of the Asian continent is yellow, suggesting high inflation in 1997. Similar results are observed for 1998 as well, indicating high inflation, as confirmed by the real facts.</p>
      <p>* <b className='bold-color'>2007-2008 Global Financial Crisis:</b>The collapse of major financial institutions led to a worldwide economic downturn, prompting central banks to implement unconventional monetary policies.</p>
      <p>* <b className='bold-color'>2020 COVID-19 Pandemic:</b>The global pandemic disrupted economies worldwide, leading to both supply and demand shocks, with varying effects on inflation. In the line graph below, we see a rise in inflation from 2020-2022, and the cause of this as we all know is the Covid Pandemic that struck us.</p>

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
      <h5>C. Inflation variation in countries (1970 - 2022) using Boxplot</h5>
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
      <p>* Correlation between Inflation, Consumer Price Index, GDP and FDI netinflows</p>
      
      <ScatterPlotSingle/>


    </div>
  );
}

export default App;
