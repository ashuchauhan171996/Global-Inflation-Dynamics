import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Plot  from 'react-plotly.js';

function BoxPlot({ data }) {
  const countries = Object.keys(data);
  
  let lis = countries.map((country) => ({
    x: country,
    y: data[country], // Each data point should be an array
  }));

  const series = [{}]
  series[0]['data'] = lis
  // console.log(series)

  
  const options = {
    chart: {
      type: 'boxPlot',
      height: 400,
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#5E63B6',
          lower: '#FF6768',
        },
      },
    },
    xaxis: {
      categories: countries,
      title: {
        text: 'Countries',
      },
      labels: {
        style: {
          colors: 'white', // X-axis label color
        },
      },
    },
    yaxis: {
      title: {
        text: 'Inflation',
      },
      labels: {
        style: {
          colors: 'white', // Y-axis label color
        },
      },
      max: 20,
      min: -1,
    },
    legend: {
      position: "bottom",
      verticalAlign: "top",
      labels: {
          colors: 'white', // Legend text color
        },
      containerMargin: {
        left: 35,
        right: 60
      }
  },
  tooltip: {
      theme: 'dark', // Use the 'light' theme for tooltips
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="boxPlot" height={400} />
    </div>
  );
}

export default BoxPlot;
