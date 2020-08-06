/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';

import {strEqual} from '../../utility';

function DoughnutChart (props) {
  const [chartData, setChartData] = useState ({});

  const createDoughnutChart = () => {
    var allData = [];
    var labels = [];
    props.data.forEach (cat => {
      allData.push (cat.total);
      labels.push (cat.label);
    });
    // console.log (props.data);

    setChartData ({
      labels: labels,
      datasets: [
        {
          data: allData,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#EC932F',
            '#71B37C',
            '#e63946',
            '#1d3557',
            '#3d405b',
            '#f2cc8f',
            '#e07a5f',
            '#ef476f',
            '#283618',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#EC932F',
            '#71B37C',
            '#e63946',
            '#1d3557',
            '#3d405b',
            '#f2cc8f',
            '#e07a5f',
            '#ef476f',
            '#283618',
          ],
        },
      ],
    });
  };

  useEffect (
    () => {
      createDoughnutChart ();
    },
    [props.data]
  );

  return <Doughnut data={chartData} />;
}

export default DoughnutChart;
