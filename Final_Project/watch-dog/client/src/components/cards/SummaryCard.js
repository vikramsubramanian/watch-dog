/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';

import {strEqual} from '../../utility';

const overflowStyle = {
  height: '300px',
  overflow: 'scroll',
};

function SummaryCard (props) {
  const [totalCrimes, setTotalCrimes] = useState (0);

  useEffect (
    () => {
      var total = 0;
      props.data.forEach (eve => {
        total += eve.total;
      });
      setTotalCrimes (total);
    },
    [props.data]
  );

  return (
    <div
      className="summaryCard"
      style={props.data.length > 10 ? overflowStyle : null}
    >
      <h1>Summary</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>{totalCrimes}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.data.map (cat => {
            // console.log (cat);
            return (
              <Table.Row>
                <Table.Cell key={cat.label}>{cat.label}</Table.Cell>
                <Table.Cell>
                  {cat.total}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default SummaryCard;
