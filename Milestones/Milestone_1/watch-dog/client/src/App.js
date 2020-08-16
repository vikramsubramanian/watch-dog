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

const crimeTypeOptions = [
  {
    label: 'crimes',
    value: 'crimes',
  },
  {
    label: 'traffic incidents',
    value: 'traffic incidents',
  },
];

const crimeIndicatorOptions = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'assault',
    value: 'assault',
  },
  {
    label: 'auto theft',
    value: 'auto theft',
  },
  {
    label: 'break & enter',
    value: 'break & enter',
  },
  {
    label: 'homicide',
    value: 'homicide',
  },
  {
    label: 'robbery',
    value: 'robbery',
  },
  {
    label: 'theft over',
    value: 'theft over',
  },
];

const dateTypeOptions = ['year', 'month'];
const dateNumOptions = new Map ();
dateNumOptions['year'] = [
  {
    value: 2014,
    label: '2014',
  },
  {
    value: 2015,
    label: '2015',
  },
  {
    value: 2016,
    label: '2016',
  },
  {
    value: 2017,
    label: '2017',
  },
  {
    value: 2018,
    label: '2018',
  },
  {
    value: 2019,
    label: '2019',
  },
];
dateNumOptions['month'] = [
  {
    value: 1,
    label: 'Jan',
  },
  {
    value: 2,
    label: 'Feb',
  },
  {
    value: 3,
    label: 'Mar',
  },
  {
    value: 4,
    label: 'Apr',
  },
  {
    value: 5,
    label: 'May',
  },
  {
    value: 6,
    label: 'Jun',
  },
  {
    value: 7,
    label: 'Jul',
  },
  {
    value: 8,
    label: 'Aug',
  },
  {
    value: 9,
    label: 'Sep',
  },
  {
    value: 10,
    label: 'Oct',
  },
  {
    value: 11,
    label: 'Nov',
  },
  {
    value: 12,
    label: 'Dec',
  },
];
// dateNumOptions['week'] = [1, 2, 3, 4, 5, 6];
// dateNumOptions['day'] = [1, 2, 7, 30, 60, 180, 365];

function strEqual (str1, str2) {
  return str1.localeCompare (str2) == 0;
}

function App () {
  const [crimeIndicator, setCrimeIndicator] = useState ('all');
  const [crimeType, setCrimeType] = useState ('crimes');
  const [dateNum, setDateNum] = useState (dateNumOptions['year'][5]);
  const [dateType, setDateType] = useState ('year');
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

  function changeCrimeType (event, data) {
    setCrimeType (data.text);
  }

  function changeCrimeIndicator (event, data) {
    setCrimeIndicator (data.text);
  }

  function changeDateNum (event, data) {
    setDateNum (
      dateNumOptions[dateType].find (option => option.value == data.value)
    );
  }
  function changeDateType (event, data) {
    setDateType (data.text);
    setDateNum (dateNumOptions[data.text][0]);
  }

  function selectCrime (event, data) {
    var path = '/crime-events?';
    path += '&dateType=' + dateType + '&dateNum=' + dateNum.value;
    if (!strEqual (crimeIndicator, 'all')) {
      path += '&MCI=' + crimeIndicator;
    }
    fetch (path).then (response => response.json ()).then (data => {
      console.log (data);
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
      <Menu fixed="top" text className="selectHeader">
        <Container>
          <Menu.Item className="selectText">
            I want to explore
          </Menu.Item>
          <Menu.Item style={{padding: 0}}>
            <Dropdown
              inline
              icon={null}
              text={crimeIndicator}
              className="selectDropdowns"
            >
              <Dropdown.Menu className="selectDropdownItem">
                {crimeIndicatorOptions.map (option => {
                  return (
                    <Dropdown.Item
                      key={option.value}
                      text={option.label}
                      active={strEqual (crimeIndicator, option.value)}
                      onClick={changeCrimeIndicator}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item className="selectText">
            crimes that happened in
          </Menu.Item>
          <Menu.Item style={{paddingRight: '0.5em', paddingLeft: 0}}>
            <Dropdown
              inline
              icon={null}
              text={dateNum.label}
              className="selectDropdowns"
            >
              <Dropdown.Menu className="selectDropdownItem">
                {dateNumOptions[dateType].map (option => {
                  return (
                    <Dropdown.Item
                      key={option.value}
                      text={option.label}
                      value={option.value}
                      active={dateNum.value == option.value}
                      onClick={changeDateNum}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item style={{padding: 0}}>
            <Dropdown
              inline
              icon={null}
              text={'(' + dateType + ')'}
              className="selectDropdowns"
            >
              <Dropdown.Menu className="selectDropdownItem">
                {dateTypeOptions.map (option => {
                  return (
                    <Dropdown.Item
                      key={option}
                      text={option}
                      active={strEqual (dateType, option)}
                      onClick={changeDateType}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item className="selectText">
            citywide on a line chart
          </Menu.Item>
          <Menu.Item className="selectButton">
            <Button
              icon
              labelPosition="right"
              primary
              size="mini"
              onClick={selectCrime}
            >
              <Icon name="arrow down" />
              OK
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
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
