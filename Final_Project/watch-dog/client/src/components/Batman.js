/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import * as youdrawit from '../thirdparty/youdrawit.js';

import './Batman.css';

import {strEqual} from '../utility';
import {dateNumOptions} from '../constants';
import {SemanticToastContainer} from 'react-semantic-toasts';

var globals = {
  default: 'en',
  // subHeader: "Try to guess to right answer and see how good you are!",
  // drawAreaTitle: "Your\nguess",
  // drawLine: "drag the line\nfrom here to the end",
  // drawBar: "drag the bar\nto the estimated height",
  // resultButtonText: "Show me the result!",
  // resultButtonTooltip: "Draw your guess. Upon clicking here, you see if you're right.",
  // scoreButtonText: "Show me how good I am!",
  // scoreButtonTooltip: "Click here to see your result",
  // scoreTitle: "Your result:",
  // scoreHtml: "Next time you can do better!",
  // or scoreHtml: [{lower: 0, upper: 50, html: "<b>That wasn't much, was it??</b>"}, {lower: 50, upper: 101, html: "<b>Excellent!!</b>"}],
};

function Batman (props) {
  const [questions, setQuestions] = useState ([]);
  const [chartElement, setChartElement] = useState (null);
  const [container, setContainer] = useState (null);

  function setupQuestions (total, dateType, timeData) {
    // console.log ('Setting up questions');
    var newQuestions = [];

    var totalQuestion = {
      heading: 'What is the total number of crimes?',
      subHeading: '',
      data: total,
      resultHtml: 'The data tell the truth.',
      //   unit: '',
      // precision: 0,
      // lastPointShownAt: ,
      // yAxisMin: ,
      // yAxisMax: ,
    };
    newQuestions.push (totalQuestion);

    var data = [];
    var heading = 'How many crimes occured in each ';
    var last = '';
    if (strEqual (dateType, 'year')) {
      last = 'Jan';
      heading += 'month?';
      timeData.forEach (td => {
        var d = {};
        d[dateNumOptions['month'][td.month - 1].label] = td['total'];
        // console.log (d);
        data.push (d);
      });
    } else if (strEqual (dateType, 'month')) {
      last = '5';
      heading += 'day?';
      timeData.forEach (td => {
        var d = {};
        d[td.day] = td['total'];
        // console.log (d);
        data.push (d);
      });
    }

    var timeQuestion = {
      heading: heading,
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

    // console.log ('New questions');
    // console.log (newQuestions);
    setQuestions (newQuestions);
    return newQuestions;
  }

  useEffect (
    () => {
      // console.log ('props updated');
      var batmanData = props.batmanData;
      if (batmanData) {
        setupQuestions (
          batmanData.total,
          batmanData.dateType,
          batmanData.timeData
        );
      }
    },
    [props.batmanData]
  );

  useEffect (
    () => {
      // console.log ('Questions updated');
      // console.log (questions);
      if (questions.length > 0) {
        renderChart ();
      }
    },
    [questions]
  );

  function renderChart () {
    // console.log ('rendering chart');
    // console.log (questions);
    // var oldChart = d3.select ('.chart');
    if (chartElement != undefined) {
      // console.log ('removing');
      chartElement.selectAll ('*').remove ();
      chartElement.remove ();
    }

    if (questions.length > 0) {
      // console.log ('Calling you drawit');
      var copyQuestions = JSON.parse (JSON.stringify (questions));
      var myChart = youdrawit
        .chart ()
        .globals (globals)
        .questions (copyQuestions);
      // console.log (myChart);
      var chartEl = d3
        .select ('#batman')
        .append ('div')
        .attr ('class', 'chart')
        .call (myChart);
      // console.log ('made chart');
      // console.log (chartEl);
      setChartElement (chartEl);
    }
  }

  // console.log ('rendering batman');
  return (
    <div id="batman" ref={el => setContainer (el)}>
      <h2>Batman Mode</h2>
    </div>
  );
}

export default Batman;
