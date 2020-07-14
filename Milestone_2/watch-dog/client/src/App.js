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

import {strEqual, successToast, errorToast} from './utility';

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

  function fetchCrimes (crimeIndicator, dateType, dateNum) {
    setDateType (dateType);
    var tablePath = '/crime-events/table?';
    var summaryPath = '/crime-events/summary?';
    var mapPath = '/crime-events/map?';

    var plusPart = '&dateType=' + dateType + '&dateNum=' + dateNum.value;
    if (!strEqual (crimeIndicator, 'all')) {
      plusPart += '&MCI=' + crimeIndicator;
    }
    summaryPath += plusPart;
    tablePath += plusPart;
    mapPath += plusPart;

    Promise.all ([
      fetch (tablePath).then (response => response.json ()),
      fetch (summaryPath).then (response => response.json ()),
      fetch (mapPath).then (response => response.json ()),
    ])
      .then (allResponses => {
        // console.log (allResponses);
        const tableData = allResponses[0];
        const summaryData = allResponses[1];
        const mapData = allResponses[2];

        successToast ();
        var allCards = [];

        allCards.push ({
          src: <TableCard data={tableData || []} />,
          group: 0,
          width: null,
        });

        allCards.push ({
          src: (
            <SummaryCard
              data={summaryData || []}
              crimeIndicator={crimeIndicator}
            />
          ),
          group: 1,
          width: 6,
        });

        allCards.push ({
          src: <MapCard markers={mapData} />,
          group: 1,
          width: 6,
        });

        allCards.push ({
          src: <LineChart crimeData={tableData} dateType={dateType} />,
          group: 2,
          width: null,
        });

        allCards.push ({
          src: (
            <TextCard
              header="The fine print:"
              height={'300px'}
              body={FINE_PRINT}
            />
          ),
          group: 2,
          width: 4,
        });

        allCards.push ({
          src: (
            <BarChart
              data={summaryData || []}
              crimeIndicator={crimeIndicator}
              title={dateNum.label}
            />
          ),
          group: 3,
          width: null,
        });

        allCards.push ({
          src: (
            <DoughnutChart
              data={summaryData || []}
              crimeIndicator={crimeIndicator}
              title={dateNum.label}
            />
          ),
          group: 3,
          width: null,
        });

        allCards.push ({
          src: <TextCard header="About" body={ABOUT_DESC} />,
          group: 3,
          width: 3,
        });

        setCards (allCards);
      })
      .catch (err => {
        console.log (err);
        errorToast ();
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
      <Question fetchCrimes={fetchCrimes} />
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
