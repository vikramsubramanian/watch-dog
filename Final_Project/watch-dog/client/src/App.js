/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  Header,
  Container,
  Button,
  Segment,
  Grid,
  Transition,
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
import ReportCrime from './ReportCrime';

import {FINE_PRINT, ABOUT_DESC} from './constants';

function App () {
  const [dateType, setDateType] = useState ('year');
  const [cards, setCards] = useState ([]);
  const [loadingData, setLoadingData] = useState (false);
  const [hoodOptions, setHoodOptions] = useState ([]);
  const [crimeOptions, setCrimeOptions] = useState ([]);
  const [pdOptions, setPDOptions] = useState ([]);
  const [offenceOptions, setOffenceOptions] = useState (new Map ());

  useEffect (() => {
    var allHoods = [];
    fetch ('/neighbourhoods')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (hood => {
          allHoods.push ({
            key: hood['hood_id'],
            text: hood['name'],
            value: hood['name'],
          });
        });
        setHoodOptions (allHoods);
        successToast ('Fetched neighbourhoods!');
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch neighbourhoods');
      });

    var policeDivisions = [];
    fetch ('/police-divisions')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (pd => {
          policeDivisions.push ({
            key: pd['division'],
            text: pd['division'],
            value: pd['division'],
          });
        });
        setPDOptions (policeDivisions);
        successToast ('Fetched police divisions!');
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch police divisions');
      });

    var allCrimeTypes = [];
    var offence = new Map ();
    fetch ('/regular-crimes')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (crime => {
          if (!allCrimeTypes.find (ct => strEqual (ct.value, crime['MCI']))) {
            allCrimeTypes.push ({
              key: crime['crime_id'],
              text: crime['MCI'],
              value: crime['MCI'],
            });
          }
          var offenceOption = {
            key: crime['offence'],
            text: crime['offence'],
            value: crime['offence'],
            db_key: crime['crime_id'],
            indicator: crime['MCI'],
          };
          if (offence[crime['MCI']]) {
            offence[crime['MCI']].push (offenceOption);
          } else {
            offence[crime['MCI']] = [offenceOption];
          }
        });
        setCrimeOptions (allCrimeTypes);
        setOffenceOptions (offence);
        successToast ('Fetched crime types!');
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch crime indicators');
      });
  }, []);

  function fetchCrimes (crimeIndicator, dateType, dateNum) {
    setDateType (dateType);
    setLoadingData (true);
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
          width: null,
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
        setLoadingData (false);
      })
      .catch (err => {
        console.log (err);
        errorToast ();
        setLoadingData (false);
      });
  }

  useEffect (() => {
    // chart ()
  }, []);

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
      <Question
        fetchCrimes={fetchCrimes}
        loading={loadingData}
        hoodOptions={hoodOptions}
        crimeOptions={crimeOptions}
        pdOptions={pdOptions}
      />
      <Container style={{marginTop: '3em'}}>
        <Grid columns="equal">
          {/* <Grid.Row columns="equal">
            <Grid.Column width={9}>
              <MapCard />
            </Grid.Column>
          </Grid.Row> */}
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
        <ReportCrime
          hoodOptions={hoodOptions}
          crimeOptions={crimeOptions}
          offenceOptions={offenceOptions}
        />
      </Container>
      <SemanticToastContainer />
    </div>
  );
}

export default App;
