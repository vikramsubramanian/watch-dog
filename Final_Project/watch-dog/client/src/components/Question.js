import React, {useState, useEffect} from 'react';
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  Visibility,
  Checkbox,
} from 'semantic-ui-react';

import {
  dateTypeOptions,
  dateNumOptions,
  questionOptions,
  locationOptions,
  crimeIndicatorOptions,
  crimeTypeOptions,
} from '../constants';
import {strEqual} from '../utility';

import './Question.css';

function Question (props) {
  const [defaultQuestion, setDefaultQuestion] = useState (true);
  const [crimeIndicator, setCrimeIndicator] = useState ('all');
  const [crimeType, setCrimeType] = useState ('crimes');
  const [locationType, setLocationType] = useState ('citywide');
  const [hoodName, setHoodName] = useState ('');
  const [pdNum, setPDNum] = useState ('');

  const [dateNum, setDateNum] = useState (dateNumOptions['year'][5]);
  const [dateType, setDateType] = useState ('year');

  const [hoodNameOptions, setHoodNameOptions] = useState ([]);
  const [pdNumOptions, setPDNumOptions] = useState ([]);

  const [stickTopMenu, setStickTopMenu] = useState (false);
  const [selectedQuestion, setSelectedQuestion] = useState (null);

  function changeQuestion (e, {value}) {
    setSelectedQuestion (value);
  }

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

  function toggleQuestion () {
    setDefaultQuestion (!defaultQuestion);
    props.defaultQuestionChanged (!defaultQuestion);
  }

  function renderQuestion () {
    var menuItems = [];
    if (defaultQuestion) {
      menuItems.push (
        <Menu.Item key={'m1'} className="selectText">
          I want to explore
        </Menu.Item>
      );
      var crimeTypeStyles = {
        paddingRight: '0.5em',
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '0',
      };
      if (strEqual (crimeType, 'crimes')) {
        crimeTypeStyles['paddingLeft'] = '0.5em';

        menuItems.push (
          <Menu.Item key={'m2'} style={{padding: 0}}>
            <Dropdown
              inline
              icon={null}
              text={crimeIndicator}
              className="selectDropdowns"
            >
              <Dropdown.Menu
                className="selectDropdownItem"
                style={{height: '300px', overflowY: 'scroll'}}
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
        );
      }
      menuItems.push (
        <Menu.Item key={'m3'} style={crimeTypeStyles}>
          <Dropdown
            inline
            icon={null}
            text={crimeType}
            className="selectDropdowns"
          >
            <Dropdown.Menu className="selectDropdownItem">
              {crimeTypeOptions.map (option => {
                return (
                  <Dropdown.Item
                    key={option.value}
                    text={option.label}
                    active={strEqual (crimeType, option.value)}
                    onClick={changeCrimeType}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
      menuItems.push (
        <Menu.Item key={'m4'} style={{padding: 0}}>
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
                style={{height: '300px', overflowY: 'scroll'}}
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
                style={{height: '300px', overflowY: 'scroll'}}
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
      );
      menuItems.push (
        <Menu.Item key={'m5'} className="selectText">
          from
        </Menu.Item>
      );
      menuItems.push (
        <Menu.Item key={'m6'} style={{paddingRight: '0.5em', paddingLeft: 0}}>
          <Dropdown
            inline
            icon={null}
            text={dateNum.label}
            className="selectDropdowns"
          >
            <Dropdown.Menu
              className="selectDropdownItem"
              style={{height: '300px', overflowY: 'scroll'}}
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
      );
      menuItems.push (
        <Menu.Item key={'m7'} style={{padding: 0}}>
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
      );
      menuItems.push (
        <Menu.Item key={'m8'} className="selectButton">
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
                crimeType,
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
      );
    } else {
      menuItems.push (
        <Menu.Item key={'m9'} style={{width: '80%'}}>
          <Dropdown
            placeholder="Select a question"
            fluid
            selection
            options={questionOptions}
            inline
            className="queryDropdown"
            onChange={changeQuestion}
            value={selectedQuestion}
          />
        </Menu.Item>
      );
      menuItems.push (
        <Menu.Item key={'m10'} className="selectButton">
          <Button
            icon
            labelPosition="right"
            primary
            loading={props.loading}
            disabled={props.loading || selectedQuestion == null}
            size="mini"
            onClick={() => props.fetchQuestion (selectedQuestion)}
          >
            <Icon name="arrow down" />
            OK
          </Button>
        </Menu.Item>
      );
    }
    return menuItems;
  }

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
        <Menu.Item className="questionItem">
          <Checkbox
            className="questionToggle"
            toggle
            onClick={toggleQuestion}
          />
        </Menu.Item>
        {renderQuestion ().map (item => {
          return item;
        })}
      </Menu>
    </Visibility>
  );
}

export default Question;
