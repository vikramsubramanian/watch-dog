/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import * as youdrawit from '../thirdparty/youdrawit.js';

import './Batman.css';

import {strEqual} from '../utility';
import {dateNumOptions} from '../constants';

var globals = {
  default: 'en',
};

function Batman (props) {
  const [questions, setQuestions] = useState ([]);

  useEffect (
    () => {
      // console.log (props.timeData);
      var newQuestions = [];
      if (props.timeData.length > 0) {
        var totalQuestion = {
          heading: 'What is the total number of crimes?',
          subHeading: '',
          data: props.total,
          resultHtml: 'The data tell the truth.',
          //   unit: '',
          // precision: 0,
          // lastPointShownAt: ,
          // yAxisMin: ,
          // yAxisMax: ,
        };
        newQuestions.push (totalQuestion);

        var data = [];
        var last = '';
        if (strEqual (props.timeType, 'year')) {
          last = 'Jan';
          props.timeData.forEach (td => {
            var d = {};
            d[dateNumOptions['month'][td.month - 1].label] = td['total'];
            console.log (d);
            data.push (d);
          });
        }

        var timeQuestion = {
          heading: 'How many crimes occured in each month?',
          subHeading: '',
          data: data,
          resultHtml: "Wasn't that <b>too</b> easy? How could you not know this?",
          // unit: "Pts",
          precision: 0,
          lastPointShownAt: last,
          // yAxisMin: ,
          // yAxisMax: 50000,
        };
        newQuestions.push (timeQuestion);

        setQuestions (newQuestions);
      }
    },
    [props.total, props.timeData, props.timeType]
  );

  useEffect (
    () => {
      // console.log (questions);
      if (questions.length > 0) {
        var myChart = youdrawit
          .chart ()
          .globals (globals)
          .questions (questions);
        d3
          .select ('#batman')
          .append ('div')
          .attr ('class', 'chart')
          .call (myChart);
      }
    },
    [questions]
  );

  return (
    <div id="batman">
      <h2>Batman Mode</h2>

    </div>
  );
}

export default Batman;
