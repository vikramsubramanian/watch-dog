/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';

import {crimeIndicatorOptions} from './constants';
import {strEqual} from './utility';

function DoughnutChart (props) {
  const [chartData, setChartData] = useState ({});

  const createDoughnutChart = () => {
    var allData = [];
    var labels = [];
    crimeIndicatorOptions
      .filter (opt => {
        if (strEqual (props.crimeIndicator, 'all')) {
          return !strEqual (opt.value, 'all');
        } else {
          return strEqual (opt.value, props.crimeIndicator);
        }
      })
      .forEach (opt => {
        var MCI = props.data.find (eve =>
          strEqual (eve.MCI.toLowerCase (), opt.label)
        );
        if (MCI) {
          allData.push (MCI.total);
        } else {
          allData.push (0);
        }
        labels.push (opt.label);
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
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#EC932F',
            '#71B37C',
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
