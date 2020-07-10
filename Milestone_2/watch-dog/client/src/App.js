import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {Header, Container, Card, Button} from 'semantic-ui-react';

import './App.css';

import {strEqual} from './utility';
import {dateNumOptions} from './constants';

import DogIcon from './dog_icon.svg';
import Question from './Question';

function App () {
  const [crimeData, setCrimeData] = useState ([]);
  const [chartData, setChartData] = useState ({});
  const [dateType, setDateType] = useState ('year');

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

  function selectCrime (crimeIndicator, dateType, dateNum) {
    var path = '/crime-events?';
    path += '&dateType=' + dateType + '&dateNum=' + dateNum.value;
    if (!strEqual (crimeIndicator, 'all')) {
      path += '&MCI=' + crimeIndicator;
    }
    fetch (path).then (response => response.json ()).then (data => {
      console.log (data);
      setDateType (dateType);
      setCrimeData (data);
    });
  }

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
      <div className="appHeader">
        <Header>
          <img src={DogIcon} alt="WachDog Icon" />
          <Header.Content>
            WatchDog - Crime Data Application
          </Header.Content>
        </Header>
      </div>
      <Question selectCrime={selectCrime} />
      <Container style={{marginTop: '3em'}}>
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Card.Header>Card Title</Card.Header>
              <Card.Meta>Subtitle</Card.Meta>
              <Card.Description>
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
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  About
                </Button>
                <Button basic color="red">
                  Close Card
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
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
