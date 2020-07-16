import React, {useState, useEffect} from 'react';
import {
  Container,
  Menu,
  Dropdown,
  Button,
  Icon,
  Visibility,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

import {
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

  const [stickTopMenu, setStickTopMenu] = useState (false);

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

  // TODO: Make question resize

  return (
    <Visibility
      onBottomPassed={() => setStickTopMenu (true)}
      onBottomVisible={() => setStickTopMenu (false)}
      once={false}
    >
      <Menu
        fixed={stickTopMenu ? 'top' : undefined}
        text
        className="selectHeader"
      >
        <Menu.Item className="selectText" style={{marginLeft: '15px'}}>
          I want to explore
        </Menu.Item>
        <Menu.Item style={{padding: 0}}>
          <Dropdown
            inline
            icon={null}
            text={crimeIndicator}
            className="selectDropdowns"
          >
            <Dropdown.Menu
              className="selectDropdownItem"
              style={{height: '300px', 'overflow-y': 'scroll'}}
            >
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
            <Dropdown.Menu
              className="selectDropdownItem"
              style={{height: '300px', 'overflow-y': 'scroll'}}
            >
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
          citywide
        </Menu.Item>
        <Menu.Item className="selectButton">
          <Button
            icon
            labelPosition="right"
            primary
            loading={props.loading}
            disabled={props.loading}
            size="mini"
            onClick={() =>
              props.fetchCrimes (crimeIndicator, dateType, dateNum)}
          >
            <Icon name="arrow down" />
            OK
          </Button>
        </Menu.Item>
      </Menu>
    </Visibility>
  );
}

export default Question;
