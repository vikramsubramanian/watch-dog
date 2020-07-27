/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import {Statistic} from 'semantic-ui-react';

function StatisticCard (props) {
  return (
    <Statistic horizontal>
      <Statistic.Value>{props.data}</Statistic.Value>
      <Statistic.Label>{props.label}</Statistic.Label>
    </Statistic>
  );
}

export default StatisticCard;
