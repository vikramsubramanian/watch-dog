/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

import {dateNumOptions} from '../../constants';
import {strEqual} from '../../utility';

function LineChart (props) {
  const [chartData, setChartData] = useState ({});

  const createLineChart = () => {
    var labels = [];
    var data = [];
    if (strEqual (props.dateType, 'year')) {
      props.data.forEach (month => {
        labels.push (dateNumOptions['month'][month.month - 1].label);
        data.push (month.total);
      });
    } else if (strEqual (props.dateType, 'month')) {
      props.data.forEach (day => {
        labels.push (day.day);
        data.push (day.total);
      });
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
    [props.data]
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
