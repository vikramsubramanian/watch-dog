/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import CalendarHeatmap from './thirdparty/calendar-heatmap.component';

import {strEqual} from './utility';

var data = [
  {
    date: '2019-01-01',
    total: 17164,
    details: [
      {
        name: 'Project 1',
        date: '2019-01-01',
        value: 9192,
      },
    ],
  },
];

function HeatMap (props) {
  const [startDate, setStartDate] = useState ('');
  const [endDate, setEndDate] = useState ('');
  const [heatData, setHeatData] = useState (null);

  useEffect (
    () => {
      console.log (props);
      if (strEqual (props.dateType, 'year')) {
        setStartDate (props.start + '-01-01');
        setEndDate (props.start + '-12-31');

        var heatValues = [];

        var dateCompare = '';
        var dateData = null;
        var dateDetails = [];
        var first = true;
        var dateTotal = 0;
        props.data.forEach (date => {
          var month = date.month.toString ();
          month = month.length < 2 ? '0' + month : month;

          var day = date.day.toString ();
          day = day.length < 2 ? '0' + day : day;

          var hour = date.hour.toString ();
          hour = hour.length < 2 ? '0' + hour : hour;

          var rawDate = props.start + '-' + month + '-' + day;
          if (first || strEqual (dateCompare, rawDate)) {
            dateCompare = rawDate;
            first = false;
            dateDetails.push ({
              name: '',
              date: rawDate + ' ' + hour + ':00:00',
              value: date.total,
            });
            dateTotal += date.total;
          } else {
            dateData = {
              date: dateCompare,
              total: dateTotal,
              details: dateDetails,
            };
            heatValues.push (dateData);

            // new date
            dateCompare = rawDate;
            dateData = null;
            dateTotal = 0;
            dateDetails = [];
          }
        });
        // last date
        dateData = {
          date: dateCompare,
          total: dateTotal,
          details: dateDetails,
        };
        heatValues.push (dateData);

        setHeatData (heatValues);
      }
    },
    props.data,
    props.dateType,
    props.start
  );

  console.log ('Heat data:');
  console.log (heatData);
  return (
    <div>
      {heatData != null &&
        <CalendarHeatmap data={heatData} color={'#cd2327'} />}
    </div>
  );
}

export default HeatMap;
