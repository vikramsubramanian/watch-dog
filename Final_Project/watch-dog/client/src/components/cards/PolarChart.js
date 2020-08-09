/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Polar} from 'react-chartjs-2';

function PolarChart (props) {
  const [data, setData] = useState (null);

  useEffect (() => {
    var dataPoints = [];
    var labels = [];
    props.data.forEach (d => {
      labels.push (d[props.labelKey]);
      dataPoints.push (d[props.dataKey]);
    });
    var colors = ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'];
    if (props.customColors) {
      colors = props.customColors;
    }
    setData ({
      datasets: [
        {
          data: dataPoints,
          backgroundColor: colors,
          label: props.title, // for legend
        },
      ],
      labels: labels,
    });
  }, props.data);

  return (
    <div>
      <h2>{props.title}</h2>
      <Polar data={data} />
    </div>
  );
}

export default PolarChart;
