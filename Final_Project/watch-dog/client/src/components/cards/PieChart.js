/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Pie} from 'react-chartjs-2';

function PieChart (props) {
  const [data, setData] = useState (null);

  useEffect (() => {
    var dataPoints = [];
    var labels = [];
    props.data.forEach (d => {
      labels.push (d[props.labelKey]);
      dataPoints.push (d[props.dataKey]);
    });
    setData ({
      datasets: [
        {
          data: dataPoints,
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
          label: props.title, // for legend
        },
      ],
      labels: labels,
    });
  }, props.data);

  return (
    <div>
      <h2 style={{marginTop: 0}}>{props.title}</h2>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
