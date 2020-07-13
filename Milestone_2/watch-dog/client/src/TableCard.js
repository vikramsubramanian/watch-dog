import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';
import {Label, Button, Accordion, Icon} from 'semantic-ui-react';

import './TableCard.css';

function TableCard (props) {
  const [columns, setColumns] = useState ([]);
  const [activeIndex, setActiveIndex] = useState (-1);

  useEffect (
    () => {
      if (props.crimeData.length > 0) {
        var keys = Object.keys (props.crimeData[0]);
        setColumns (keys);
      }
    },
    [props.crimeData]
  );

  function handleClick (e, titleProps) {
    const {index} = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex (newIndex);
  }

  return (
    <div>
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <div className="tableWrapper">
            <Icon name="dropdown" />
            <h2 className="wrapperHeader">See a detailed table of these</h2>
            <Label color={'blue'} className="wrapperTotal">
              {props.crimeData.length}
            </Label>
            <h2 className="wrapperHeader">incidents</h2>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Table striped>
            <Table.Header>
              <Table.Row>
                {columns.map ((col, ind) => {
                  return <Table.HeaderCell key={ind}>{col}</Table.HeaderCell>;
                })}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.crimeData.map ((crime, ind) => {
                return (
                  <Table.Row key={ind}>
                    {columns.map (col => {
                      return <Table.Cell>{crime[col]}</Table.Cell>;
                    })}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}

export default TableCard;
