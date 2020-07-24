/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';

import {crimeIndicatorOptions} from '../../constants';
import {strEqual} from '../../utility';

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
    <div className="summaryCard">
      <h1>Totals</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Total Crime</Table.HeaderCell>
            <Table.HeaderCell>{totalCrimes}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {crimeIndicatorOptions
            .filter (opt => {
              if (strEqual (props.crimeIndicator, 'all')) {
                return !strEqual (opt.value, 'all');
              } else {
                return strEqual (opt.value, props.crimeIndicator);
              }
            })
            .map ((opt, ind) => {
              const MCI = props.data.find (eve =>
                strEqual (eve.MCI.toLowerCase (), opt.label)
              );
              return (
                <Table.Row>
                  <Table.Cell key={ind}>{opt.label}</Table.Cell>
                  <Table.Cell>
                    {MCI ? MCI['total'] : 0}
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
