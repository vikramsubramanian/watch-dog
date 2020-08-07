/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import * as youdrawit from '../thirdparty/youdrawit.js';

import './Batman.css';

var globals = {
  default: 'en',
};

function Batman (props) {
  const [questions, setQuestions] = useState ([]);

  useEffect (() => {
    var newQuestions = [...questions];

    var totalQuestion = {
      heading: 'What is the total number of crimes?',
      subHeading: '',
      data: 34049,
      resultHtml: 'The data tell the truth.',
      //   unit: '',
      // precision: 0,
      // lastPointShownAt: ,
      // yAxisMin: ,
      // yAxisMax: ,
    };
    newQuestions.push (totalQuestion);

    var timeQuestion = {
      heading: 'How many crimes occured in each month?',
      subHeading: '',
      data: [
        {'1998': 32000},
        {'2002': 22000},
        {'2006': 18000},
        {'2010': 18500},
        {'2014': 25000},
        {'2018': 22400},
      ],
      resultHtml: "Wasn't that <b>too</b> easy? How could you not know this?",
      // unit: "Pts",
      precision: 0,
      lastPointShownAt: '2002',
      // yAxisMin: ,
      yAxisMax: 50000,
    };
    newQuestions.push (timeQuestion);

    setQuestions (newQuestions);
  }, []);

  useEffect (
    () => {
      console.log (questions);
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
