import React, {useState} from 'react';
import {Header, Container, Menu} from 'semantic-ui-react';

import './App.css';

function App () {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Project Name
          </Menu.Item>
          <Menu.Item as="a">Home</Menu.Item>
        </Container>
      </Menu>
      <Container style={{marginTop: '3em'}}>
        <Header as="h1s">
          WatchDog
        </Header>
      </Container>
    </div>
  );
}

export default App;
