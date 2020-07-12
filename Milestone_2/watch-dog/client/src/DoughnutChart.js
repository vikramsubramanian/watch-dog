/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';

import {crimeIndicatorOptions} from './constants';
import {strEqual} from './utility';

function DoughnutChart (props) {
  const labels = crimeIndicatorOptions.map (opt => {
    return opt.label;
  });

  const [chartData, setChartData] = useState ({
    labels: labels,
    datasets: [
      {
        data: [300, 50, 100, 200, 230, 50, 90, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  const createBarChart = () => {};

  useEffect (
    () => {
      createBarChart ();
    },
    [props.crimeData]
  );

  return <Doughnut data={chartData} />;
}

export default DoughnutChart;
