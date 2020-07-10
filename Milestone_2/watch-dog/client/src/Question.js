import React, {useState, useEffect} from 'react';
import {Container, Menu, Dropdown, Button, Icon} from 'semantic-ui-react';

import {
  crimeIndicatorOptions,
  dateTypeOptions,
  dateNumOptions,
} from './constants';
import {strEqual} from './utility';

export const useScrollHandler = () => {
  // setting initial value to true
  const [scroll, setScroll] = useState (1);

  // running on mount
  useEffect (
    () => {
      const onScroll = () => {
        const scrollCheck = window.scrollY < 72;
        if (scrollCheck !== scroll) {
          setScroll (scrollCheck);
        }
      };

      // setting the event handler from web API
      document.addEventListener ('scroll', onScroll);

      // cleaning up from the web API
      return () => {
        document.removeEventListener ('scroll', onScroll);
      };
    },
    [scroll, setScroll]
  );

  return scroll;
};

function Question (props) {
  const [crimeIndicator, setCrimeIndicator] = useState ('all');
  const [crimeType, setCrimeType] = useState ('crimes');
  const [dateNum, setDateNum] = useState (dateNumOptions['year'][5]);
  const [dateType, setDateType] = useState ('year');

  const scroll = useScrollHandler ();

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
    <Menu fixed={scroll ? false : 'top'} text className="selectHeader">
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
        citywide
      </Menu.Item>
      <Menu.Item className="selectButton">
        <Button
          icon
          labelPosition="right"
          primary
          size="mini"
          onClick={() => props.selectCrime (crimeIndicator, dateType, dateNum)}
        >
          <Icon name="arrow down" />
          OK
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default Question;
