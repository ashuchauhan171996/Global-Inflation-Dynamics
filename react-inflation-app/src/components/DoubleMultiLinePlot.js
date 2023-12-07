import React from 'react';
import ReactApexChart from 'react-apexcharts';

function DoubleMultiLinePlot({ data }) {
  const indicators = Object.keys(data);
  const chartData = indicators.map((indicator) => {
    const values = [];
    for (let year = 1970; year < 2023; year++) {
      values.push(data[indicator][`year${year}`]);
      // const cappedValue = Math.min(data[indicator][`year${year}`], 200);
      // values.push(cappedValue);
    }
    return {
      name: indicator,
      data: values,
    };
  });
  console.log(chartData)
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
          colors: 'white',
        },
      },
    },
    yaxis: indicators.map((indicator, index) => ({
      seriesName: indicator,
      opposite: index % 2 === 0, // Position every other y-axis on the right side
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: 'white',
      },
      labels: {
        // show: false,
        style: {
          colors: 'white',
        },
      },
      title: {
        text: indicator,
        style: {
          color: 'white',
        },
      },
    })),
    legend: {
      position: 'bottom',
      verticalAlign: 'top',
      labels: {
        colors: 'white',
      },
      containerMargin: {
        left: 35,
        right: 60,
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={chartData} type="line" height={350} />
    </div>
  );
}

export default DoubleMultiLinePlot;
