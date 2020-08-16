/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Scatter} from 'react-chartjs-2';

function ScatterChart (props) {
  const [data, setData] = useState (null);

  useEffect (() => {
    var dataPoints = [];
    var labels = [];
    props.data.forEach (d => {
      labels.push (d[props.labelKey]);
      dataPoints.push ({
        x: d[props.xKey],
        y: d[props.yKey],
      });
    });

    setData ({
      datasets: [
        {
          label: props.title,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          data: dataPoints,
        },
      ],
      labels: labels,
    });
  }, props.data);

  return (
    <div>
      <h2>{props.title}</h2>
      <Scatter
        data={data}
        options={{
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: props.yLabel,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: props.xLabel,
                },
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default ScatterChart;
