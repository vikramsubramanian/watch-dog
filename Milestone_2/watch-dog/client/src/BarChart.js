/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

import {dateNumOptions} from './constants';
import {strEqual} from './utility';

function BarChart (props) {
  const [chartData, setChartData] = useState ({});

  const createBarChart = () => {};

  useEffect (
    () => {
      createBarChart ();
    },
    [props.crimeData]
  );

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        title: {text: '', display: true},
        scales: {
          yAxes: [
            {
              ticks: {
                autoskip: true,
                maxTicksLimits: 10,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }}
    />
  );
}

export default BarChart;
