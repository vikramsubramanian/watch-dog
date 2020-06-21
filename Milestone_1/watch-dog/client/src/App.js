import React, {useState} from 'react';
import {Header, Container, Menu, Dropdown} from 'semantic-ui-react';

import './App.css';

function App () {
  return (
    <div className="container">
      <Menu fixed="top" text className="selectHeader">
        <Container>
          <Menu.Item>
            I want to explore
          </Menu.Item>
          <Menu.Item style={{padding: 0}}>
            <Dropdown inline icon={null} text="all" className="selectDropdowns">
              <Dropdown.Menu className="selectDropdownItem">
                <Dropdown.Item text="assaults" />
                <Dropdown.Item text="robberies" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item>
            crimes over the past 3 years citywide on a heat map
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{marginTop: '3em'}} />
    </div>
  );
}

export default App;
