import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {
  Header,
  Container,
  Menu,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';

import './App.css';
import {strEqual} from './utility';
import {dateNumOptions} from './constants';

import Question from './Question';

const dateType = 'year';

function App () {
  const [crimeData, setCrimeData] = useState ([]);
  const [chartData, setChartData] = useState ({});

  const createLineChart = () => {
    var labels = [];
    var data = [];
    if (strEqual (dateType, 'year')) {
      for (var i = 1; i <= 12; i++) {
        var monthCount = crimeData.filter (crime => crime.OccuredMonth == i)
          .length;
        labels.push (dateNumOptions['month'][i - 1].label);
        data.push (monthCount);
      }
    } else if (strEqual (dateType, 'month')) {
      for (var i = 1; i <= 31; i++) {
        var dayCount = crimeData.filter (crime => crime.OccuredDay == i).length;
        labels.push (i);
        data.push (dayCount);
      }
    }
    setChartData ({
      labels: labels,
      datasets: [
        {
          label: 'Number of crimes reported',
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect (
    () => {
      createLineChart ();
    },
    [crimeData]
  );

  useEffect (() => {
    // chart ();
  }, []);

  return (
    <div className="container">
      <Question />
      <Container style={{marginTop: '3em'}} />
      <Container>
        <div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: {text: '', display: true},
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoskip: true,
                      maxTicksLimits: 10,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
