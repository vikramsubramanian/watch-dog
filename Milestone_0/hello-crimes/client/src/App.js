import React, {useState} from 'react';
import './App.css';
import {Button, Container, Row, Col, Table} from 'reactstrap';

function App () {
  const [robberies, setRobberies] = useState ([]);

  function loadRobberies () {
    fetch ('/robberies/').then (response => response.json ()).then (data => {
      setRobberies (data);
    });
  }

  return (
    <Container className="container">
      <Row className="configBar">
        <Col xs="12" sm="12">
          <Button color="info" onClick={loadRobberies}>
            Load robberies
          </Button>
        </Col>
      </Row>
      <Row className="dataTable">
        <Col xs="12" sm="12">
          <Table hover>
            <thead>
              <tr>
                <th>Event Id</th>
                <th>Offence Type</th>
                <th>Neighbourhood</th>
              </tr>
            </thead>
            <tbody>
              {robberies.map (robbery => {
                return (
                  <tr key={robbery.eventId}>
                    <th>{robbery.eventId}</th>
                    <td>{robbery.offenceType}</td>
                    <td>{robbery.neighbourhood}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
