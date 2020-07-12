/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Header,
  Container,
  Card,
  Button,
  Segment,
  Grid,
} from 'semantic-ui-react';

import './App.css';

import {strEqual} from './utility';

import DogIcon from './dog_icon.svg';
import Question from './Question';
import TableCard from './TableCard';
import LineChart from './LineChart';

function App () {
  const [crimeData, setCrimeData] = useState ([]);
  const [dateType, setDateType] = useState ('year');
  const [cards, setCards] = useState ([]);

  function selectCrime (crimeIndicator, dateType, dateNum) {
    var path = '/crime-events?';
    path += '&dateType=' + dateType + '&dateNum=' + dateNum.value;
    if (!strEqual (crimeIndicator, 'all')) {
      path += '&MCI=' + crimeIndicator;
    }
    fetch (path).then (response => response.json ()).then (data => {
      console.log (data);
      setDateType (dateType);
      setCrimeData (data);
      setCards ([
        ...cards,
        <TableCard />,
        <LineChart crimeData={data} dateType={dateType} />,
      ]);
    });
  }

  useEffect (() => {
    // chart ()
  }, []);

  console.log (cards);
  return (
    <div className="container">
      <div className="appHeader">
        <Header>
          <img src={DogIcon} alt="WachDog Icon" />
          <Header.Content>
            WatchDog - Crime Data Application
          </Header.Content>
        </Header>
      </div>
      <Question selectCrime={selectCrime} />
      <Container style={{marginTop: '3em'}}>
        <Grid columns="equal">
          <Grid.Row columns="equal">
            {cards.map ((card, ind) => {
              return (
                <Grid.Column>
                  <Segment>
                    {card}
                  </Segment>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
