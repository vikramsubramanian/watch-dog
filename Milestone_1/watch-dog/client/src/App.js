import React, {useState} from 'react';
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
  {
    label: 'bicycle thefts',
    value: 'bicycle thefts',
  },
];

const dateTypeOptions = ['years', 'months', 'weeks', 'days'];
const dateNumOptions = new Map ();
dateNumOptions['years'] = [1, 2, 3, 4, 5, 6, 7, 8];
dateNumOptions['months'] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
dateNumOptions['weeks'] = [1, 2, 3, 4, 5, 6];
dateNumOptions['days'] = [1, 2, 7, 30, 60, 180, 365];

function strEqual (str1, str2) {
  return str1.localeCompare (str2) == 0;
}

function App () {
  const [crimeIndicator, setCrimeIndicator] = useState ('all');
  // const [crimeType, setCrimeType] = useState ('');
  const [dateNum, setDateNum] = useState (2);
  const [dateType, setDateType] = useState ('years');

  function changeCrimeIndicator (event, data) {
    setCrimeIndicator (data.text);
  }

  function changeDateNum (event, data) {
    setDateNum (data.text);
  }
  function changeDateType (event, data) {
    setDateType (data.text);
  }

  function selectCrime (event, data) {
    console.log ('Selecting data...');
  }

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
            crimes over the past
          </Menu.Item>
          <Menu.Item style={{paddingRight: '0.5em', paddingLeft: 0}}>
            <Dropdown
              inline
              icon={null}
              text={dateNum}
              className="selectDropdowns"
            >
              <Dropdown.Menu className="selectDropdownItem">
                {dateNumOptions[dateType].map (option => {
                  return (
                    <Dropdown.Item
                      key={option}
                      text={option}
                      active={dateNum == option}
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
              text={dateType}
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
            citywide on a bar chart
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
    </div>
  );
}

export default App;
