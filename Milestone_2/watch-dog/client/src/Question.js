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

import {
  crimeTypeOptions,
  crimeIndicatorOptions,
  dateTypeOptions,
  dateNumOptions,
} from './constants';
import {strEqual} from './utility';

function Question (props) {
  const [crimeIndicator, setCrimeIndicator] = useState ('all');
  const [crimeType, setCrimeType] = useState ('crimes');
  const [dateNum, setDateNum] = useState (dateNumOptions['year'][5]);
  const [dateType, setDateType] = useState ('year');

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

  return (
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
            onClick={() =>
              props.selectCrime (crimeIndicator, dateType, dateNum)}
          >
            <Icon name="arrow down" />
            OK
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Question;
