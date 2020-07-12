/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';

import {crimeIndicatorOptions} from './constants';
import {strEqual} from './utility';

function SummaryCard (props) {
  return (
    <div className="summaryCard">
      <h1>Totals</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Total Crime</Table.HeaderCell>
            <Table.HeaderCell>0</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {crimeIndicatorOptions
            .filter (opt => !strEqual (opt.value, 'all'))
            .map ((opt, ind) => {
              return (
                <Table.Row>
                  <Table.Cell key={ind}>{opt.label}</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default SummaryCard;
