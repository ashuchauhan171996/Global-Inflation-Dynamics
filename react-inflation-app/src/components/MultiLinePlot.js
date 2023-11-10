import React from 'react';
import ReactApexChart from 'react-apexcharts';

function MultiLinePlot({ data }) {
  const countries = Object.keys(data);
  const chartData = countries.map((country) => {
    const values = [];
    for (let year = 1970; year < 2023; year++) {
      // values.push(data[country][`year${year}`]);
      const cappedValue = Math.min(data[country][`year${year}`], 40);
      values.push(cappedValue);
    }
    return {
      name: country,
      data: values,
    };
  });

  const options = {
    chart: {
      id: 'multi-line-plot',
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: Array.from({ length: 54 }, (_, i) => 1970 + i),
      labels: {
        style: {
          colors: 'white', // X-axis label color
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white', // Y-axis label color
        },
      },
      // max: 20,
      // min: -2,
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
      <ReactApexChart options={options} series={chartData} type="line" height={350} />
    </div>
  );
}

export default MultiLinePlot;
