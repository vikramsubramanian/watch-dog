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
import {SemanticToastContainer, toast} from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import './App.css';

import {strEqual} from './utility';

import DogIcon from './dog_icon.svg';
import Question from './Question';
import TableCard from './TableCard';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import TextCard from './TextCard';
import SummaryCard from './SummaryCard';

import MapCard from './MapCard';

import {FINE_PRINT, ABOUT_DESC} from './constants';

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
    fetch (path)
      .then (response => response.json ())
      .then (data => {
        toast (
          {
            title: 'Success',
            description: <p>Fetched data!</p>,
            type: 'success',
            time: 2500,
            animation: 'fade left',
          },
          () => console.log ('toast closed'),
          () => console.log ('toast clicked'),
          () => console.log ('toast dismissed')
        );
        console.log (data);
        setDateType (dateType);
        setCrimeData (data);
        setCards ([
          {
            src: <TableCard crimeData={data} dateType={dateType} />,
            group: 0,
            width: null,
          },
          {
            src: <MapCard header="About" body={ABOUT_DESC} />,
            group: 1,
            width: 6,
          },
          {
            src: <LineChart crimeData={data} dateType={dateType} />,
            group: 2,
            width: null,
          },
          {
            src: (
              <TextCard
                header="The fine print:"
                height={'300px'}
                body={FINE_PRINT}
              />
            ),
            group: 2,
            width: 4,
          },
          {
            src: <SummaryCard crimeData={data} dateType={dateType} />,
            group: 3,
            width: 4,
          },
          {
            src: <BarChart crimeData={data} dateType={dateType} />,
            group: 3,
            width: null,
          },
          {
            src: <DoughnutChart crimeData={data} dateType={dateType} />,
            group: 4,
            width: null,
          },
          {
            src: <TextCard header="About" body={ABOUT_DESC} />,
            group: 4,
            width: 3,
          },
        ]);
      })
      .catch (error => {
        console.error ('Error:', error);
        toast (
          {
            title: 'Error: DB',
            description: <p>Could not connect to DB.</p>,
            type: 'error',
            time: 2500,
            animation: 'fade left',
          },
          () => console.log ('toast closed'),
          () => console.log ('toast clicked'),
          () => console.log ('toast dismissed')
        );
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
          {[0, 1, 2, 3, 4].map (gnum => {
            return (
              <Grid.Row columns="equal">
                {cards
                  .filter (card => card.group === gnum)
                  .map ((card, ind) => {
                    return (
                      <Grid.Column width={card.width}>
                        <Segment className="cardSegment">
                          {card.src}
                        </Segment>
                      </Grid.Column>
                    );
                  })}
              </Grid.Row>
            );
          })}
        </Grid>
      </Container>
      <SemanticToastContainer />
    </div>
  );
}

export default App;
