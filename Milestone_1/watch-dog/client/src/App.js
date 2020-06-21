import React, {useState} from 'react';
import {Header, Container, Menu, Dropdown} from 'semantic-ui-react';

import './App.css';

function App () {
  return (
    <div className="container">
      <Menu fixed="top" text className="selectHeader">
        <Container>
          <Menu.Item className="selectText">
            I want to explore
          </Menu.Item>
          <Menu.Item style={{padding: 0}}>
            <Dropdown inline icon={null} text="all" className="selectDropdowns">
              <Dropdown.Menu className="selectDropdownItem">
                <Dropdown.Item text="All" active />
                <Dropdown.Item text="Assault" />
                <Dropdown.Item text="Auto Theft" />
                <Dropdown.Item text="Break & Enter" />
                <Dropdown.Item text="Homicide" />
                <Dropdown.Item text="Robbery" />
                <Dropdown.Item text="Theft Over" />
                <Dropdown.Item text="Bicycle Thefts" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item className="selectText">
            crimes over the past
          </Menu.Item>
          <Menu.Item style={{paddingRight: '0.5em', paddingLeft: 0}}>
            <Dropdown inline icon={null} text="2" className="selectDropdowns">
              <Dropdown.Menu className="selectDropdownItem">
                <Dropdown.Item text="1" />
                <Dropdown.Item text="2" active />
                <Dropdown.Item text="3" />
                <Dropdown.Item text="4" />
                <Dropdown.Item text="5" />
                <Dropdown.Item text="6" />
                <Dropdown.Item text="7" />
                <Dropdown.Item text="8" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item style={{padding: 0}}>
            <Dropdown
              inline
              icon={null}
              text="years"
              className="selectDropdowns"
            >
              <Dropdown.Menu className="selectDropdownItem">
                <Dropdown.Item text="years" active />
                <Dropdown.Item text="months" />
                <Dropdown.Item text="weeks" />
                <Dropdown.Item text="days" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item className="selectText">
            citywide on a bar chart
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{marginTop: '3em'}} />
    </div>
  );
}

export default App;
