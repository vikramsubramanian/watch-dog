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

import {dateTypeOptions, dateNumOptions} from './constants';
import {strEqual} from './utility';

function Question (props) {
  const [crimeIndicator, setCrimeIndicator] = useState ('all');
  const [crimeType, setCrimeType] = useState ('crimes');
  const [locationType, setLocationType] = useState ('citywide');
  const [locationIndicator, setLocationIndicator] = useState ('neighbourhood');
  const [dateNum, setDateNum] = useState (dateNumOptions['year'][5]);
  const [dateType, setDateType] = useState ('year');
  const [crimeIndicatorOptions, setCrimeIndicatorOptions] = useState ([]);
  const [locationOptions, setLocationOptions] = useState ([
    {
      value: 'citywide',
      label: 'citywide',
    },
    {
      value: 'in',
      label: 'in',
    },
  ]);
  const [locationIndicatorOptions, seLocationIndicatorOptions] = useState ([
    {
      value: 'neighbourhood',
      label: 'neighbourhood',
    },
    {
      value: 'police division',
      label: 'police division',
    },
  ]);
  const [locationNum, setLocationNum] = useState ('1');
  const [locationNumOptions, setLocationNumOptions] = useState ([
    {
    value: "1",
    label: "1",
    },
  ]);

  const [stickTopMenu, setStickTopMenu] = useState (false);

  function changeCrimeType (event, data) {
    setCrimeType (data.text);
  }

  function changeCrimeIndicator (event, data) {
    setCrimeIndicator (data.text);
  }

  function changeLocationType (event, data) {
    setLocationType (data.text);
  }

  function changeLocationIndicator (event, data) {
    setLocationIndicator (data.text);
  }

  function changeLocationNum (event, data) {
    setLocationNum (data.text);
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

  useEffect (
    () => {
      var indiOptions = [
        {
          label: 'all',
          value: 'all',
        },
      ];
      props.crimeOptions.forEach (opt => {
        indiOptions.push ({
          label: opt['text'].toLowerCase (),
          value: opt['value'].toLowerCase (),
        });
      });
      setCrimeIndicatorOptions (indiOptions);
      console.log (indiOptions);
    },
    [props.crimeOptions]
  );

  useEffect (
    () => {
      var hoodOptions = [];
      props.hoodOptions.forEach (opt => {
        hoodOptions.push ({
          label: opt['text'].toLowerCase (),
          value: opt['value'].toLowerCase (),
        });
      });
      setLocationNumOptions (hoodOptions);
      if(hoodOptions.length > 0){
        setLocationNum(hoodOptions[0].value)
      }
      console.log (hoodOptions);
    },
    [props.hoodOptions]
  );

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
          crimes
        </Menu.Item>
        <Menu.Item style={{padding: 0}}>
          <Dropdown
            inline
            icon={null}
            text={locationType}
            className="selectDropdowns"
          >
            <Dropdown.Menu className="selectDropdownItem">
              {locationOptions.map (option => {
                return (
                  <Dropdown.Item
                    key={option.value}
                    text={option.label}
                    active={strEqual (locationType, option.value)}
                    onClick={changeLocationType}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          {strEqual (locationType, 'in') &&
            <>
            <Dropdown
              inline
              icon={null}
              text={locationIndicator}
              className="selectDropdowns"
              style={{marginLeft: '10px'}}
            >
              <Dropdown.Menu className="selectDropdownItem">
                {locationIndicatorOptions.map (option => {
                  return (
                    <Dropdown.Item
                      key={option.value}
                      text={option.label}
                      active={strEqual (locationIndicator, option.value)}
                      onClick={changeLocationIndicator}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              inline
              icon={null}
              text={locationNum}
              className="selectDropdowns"
              style={{marginLeft: '10px'}}
            >
              <Dropdown.Menu className="selectDropdownItem">
                {locationNumOptions.map (option => {
                  return (
                    <Dropdown.Item
                      key={option.value}
                      text={option.label}
                      active={strEqual (locationNum, option.value)}
                      onClick={changeLocationNum}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            </>}
        </Menu.Item>
        <Menu.Item className="selectText">
          from
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
