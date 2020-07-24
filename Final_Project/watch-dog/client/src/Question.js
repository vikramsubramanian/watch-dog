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
  const [hoodName, setHoodName] = useState ('');
  const [pdNum, setPDNum] = useState ('');

  const [dateNum, setDateNum] = useState (dateNumOptions['year'][5]);
  const [dateType, setDateType] = useState ('year');
  const [crimeIndicatorOptions, setCrimeIndicatorOptions] = useState ([]);
  const [locationOptions, setLocationOptions] = useState ([
    {
      value: 'citywide',
      label: 'citywide',
    },
    {
      value: 'in neighbourhood',
      label: 'in',
    },
    {
      value: 'in police division',
      label: 'in',
    },
  ]);
  const [hoodNameOptions, setHoodNameOptions] = useState ([]);
  const [pdNumOptions, setPDNumOptions] = useState ([]);

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

  function changeHoodName (event, data) {
    setHoodName (data.text);
  }

  function changePDNum (event, data) {
    setPDNum (data.text);
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
      setHoodNameOptions (hoodOptions);
      if (hoodOptions.length > 0) {
        setHoodName (hoodOptions[0].value);
      }
    },
    [props.hoodOptions]
  );

  useEffect (
    () => {
      var pdOptions = [];
      props.pdOptions.forEach (opt => {
        pdOptions.push ({
          label: 'PD ' + opt['text'].toString (),
          value: 'PD ' + opt['value'].toString (),
        });
      });
      setPDNumOptions (pdOptions);
      if (pdOptions.length > 0) {
        setPDNum (pdOptions[0].value);
      }
    },
    [props.pdOptions]
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
            text={
              locationOptions.find (opt => strEqual (opt.value, locationType))
                .label
            }
            className="selectDropdowns"
          >
            <Dropdown.Menu className="selectDropdownItem">
              {locationOptions.map (option => {
                return (
                  <Dropdown.Item
                    key={option.value}
                    text={option.value}
                    active={strEqual (locationType, option.value)}
                    onClick={changeLocationType}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          {strEqual (locationType, 'in neighbourhood') &&
            <Dropdown
              inline
              icon={null}
              text={hoodName}
              className="selectDropdowns"
              style={{marginLeft: '10px'}}
            >
              <Dropdown.Menu
                className="selectDropdownItem"
                style={{height: '300px', 'overflow-y': 'scroll'}}
              >
                {hoodNameOptions.map (option => {
                  return (
                    <Dropdown.Item
                      key={option.value}
                      text={option.label}
                      active={strEqual (hoodName, option.value)}
                      onClick={changeHoodName}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>}
          {strEqual (locationType, 'in police division') &&
            <Dropdown
              inline
              icon={null}
              text={pdNum}
              className="selectDropdowns"
              style={{marginLeft: '10px'}}
            >
              <Dropdown.Menu
                className="selectDropdownItem"
                style={{height: '300px', 'overflow-y': 'scroll'}}
              >
                {pdNumOptions.map (option => {
                  return (
                    <Dropdown.Item
                      key={option.value}
                      text={option.label}
                      active={strEqual (pdNum, option.value)}
                      onClick={changePDNum}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>}
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
            style={{marginLeft: '10px'}}
            onClick={() =>
              props.fetchCrimes (
                crimeIndicator,
                dateType,
                dateNum,
                locationType,
                hoodName,
                pdNum
              )}
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
