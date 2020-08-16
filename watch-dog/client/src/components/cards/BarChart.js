/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

function BarChart (props) {
  const [chartData, setChartData] = useState ({});

  const createBarChart = () => {
    var allData = [];
    var labels = [];
    props.data.forEach (cat => {
      allData.push (cat.total);
      labels.push (cat.label);
    });

    setChartData ({
      labels: labels,
      datasets: [
        {
          label: props.title,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: allData,
        },
      ],
    });
  };

  useEffect (
    () => {
      createBarChart ();
    },
    [props.data]
  );

  return <HorizontalBar data={chartData} />;
}

export default BarChart;
