/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';

function PieChart (props) {
  const [data, setData] = useState (null);

  useEffect (() => {
    var dataPoints = [];
    var labels = [];
    var colours = [];
    var hoverColours = [];
    var borderColors = [];
    var maxValue = -1;
    var maxInd = -1;
    props.data.forEach ((d, ind) => {
      labels.push (d[props.labelKey]);
      if (d[props.dataKey] > maxValue) {
        maxValue = d[props.dataKey];
        maxInd = ind;
      }
      dataPoints.push (d[props.dataKey]);
      colours.push ('rgba(255,99,132,0.2)');
      hoverColours.push ('rgba(255,99,132,0.4)');
      borderColors.push ('rgba(255,99,132,1)');
    });

    colours[maxInd] = 'rgba(75, 192, 192, 0.2)';
    hoverColours[maxInd] = 'rgba(75, 192, 192, 0.4)';
    borderColors[maxInd] = 'rgba(75, 192, 192, 1)';

    setData ({
      datasets: [
        {
          label: props.chartLabel,
          backgroundColor: colours,
          borderColor: borderColors,
          borderWidth: 1,
          hoverBackgroundColor: hoverColours,
          hoverBorderColor: borderColors,
          data: dataPoints,
        },
      ],
      labels: labels,
    });
  }, props.data);

  return (
    <div>
      {props.title && <h2 style={{marginTop: 0}}>{props.title}</h2>}
      <Bar data={data} />
    </div>
  );
}

export default PieChart;
