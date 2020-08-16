/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

import {dateNumOptions} from './constants';
import {strEqual} from './utility';

function LineChart (props) {
  const [chartData, setChartData] = useState ({});

  const createLineChart = () => {
    var labels = [];
    var data = [];
    if (strEqual (props.dateType, 'year')) {
      for (var i = 1; i <= 12; i++) {
        var monthCount = props.crimeData.filter (
          crime => crime.OccuredMonth == i
        ).length;
        labels.push (dateNumOptions['month'][i - 1].label);
        data.push (monthCount);
      }
    } else if (strEqual (props.dateType, 'month')) {
      for (var i = 1; i <= 31; i++) {
        var dayCount = props.crimeData.filter (crime => crime.OccuredDay == i)
          .length;
        labels.push (i);
        data.push (dayCount);
      }
    }
    setChartData ({
      labels: labels,
      datasets: [
        {
          label: 'Number of crimes reported',
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect (
    () => {
      createLineChart ();
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

export default LineChart;
