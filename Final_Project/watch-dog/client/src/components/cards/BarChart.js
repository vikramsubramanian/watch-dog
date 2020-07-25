/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

import {crimeIndicatorOptions} from '../../constants';
import {strEqual} from '../../utility';

function BarChart (props) {
  const [chartData, setChartData] = useState ({});

  const createBarChart = () => {
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
