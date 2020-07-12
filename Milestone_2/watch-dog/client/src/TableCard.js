import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';

function TableCard (props) {
  const [columns, setColumns] = useState ([]);

  useEffect (
    () => {
      if (props.crimeData.length > 0) {
        var keys = Object.keys (props.crimeData[0]);
        setColumns (keys);
      }
    },
    [props.crimeData]
  );

  return (
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
  );
}

export default TableCard;
