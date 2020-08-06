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
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB',
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
