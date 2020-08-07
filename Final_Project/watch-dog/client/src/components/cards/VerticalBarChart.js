/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';

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
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dataPoints,
        },
      ],
      labels: labels,
    });
  }, props.data);

  return (
    <div>
      <h2 style={{marginTop: 0}}>{props.title}</h2>
      <Bar data={data} />
    </div>
  );
}

export default PieChart;
