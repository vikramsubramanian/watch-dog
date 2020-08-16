require ('dotenv').config ();

const express = require ('express');
const app = express ();
const connection = require ('./database');
var path = require ('path');
const {deflateSync} = require ('zlib');

app.use (express.json ());

app.route ('/neighbourhoods/').get (function (req, res, next) {
  connection.query (
    `SELECT hood_id, name
    FROM Neighbourhood;`,
    function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    }
  );
});

app.route ('/regular-crimes/').get (function (req, res, next) {
  connection.query (
    `SELECT *
    FROM RegularCrime;`,
    function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    }
  );
});

function insertDate (dates, callBack, data, type, res) {
  // Add to DB
  // console.log ('inserting date');
  var queryString = '';
  var queryParams = [];
  dates.forEach (date => {
    queryString +=
      'INSERT INTO IncidentTime(hour, day, month, year, day_of_week) values (?, ?, ?, ?, ?);';
    queryParams.push (date.hour);
    queryParams.push (date.day);
    queryParams.push (date.month);
    queryParams.push (date.year);
    queryParams.push (date.day_of_week);
  });
  connection.query (queryString, queryParams, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    if (type == '') {
      data['occurrence_time_id'] = results[0].insertId;
      data['reported_time_id'] = results[1].insertId;
    } else if (type == 'o') {
      data['occurrence_time_id'] = results.insertId;
    } else if (type == 'r') {
      data['reported_time_id'] = results.insertId;
    }
    callBack (data, res);
  });
}

function insertCrime (data, res) {
  // console.log ('inserting crime');
  // console.log (data);
  connection.query (
    `INSERT INTO CrimeEvent
    (occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type)
    values (?, ?, ?, ?, ?, ?, ?);`,
    [
      data.occurrence_time_id,
      data.reported_time_id,
      data.crime_id,
      data.hood_id,
      data.latitude,
      data.longitude,
      data.premise_type,
    ],
    function (error, results, fields) {
      if (error) throw error;
      // console.log (results.insertId);
      res.status (200).json ({
        error: false,
        message: 'Added new crime!',
        id: results.insertId,
      });
    }
  );
}

app.route ('/report-crime/').post (function (req, res, next) {
  // console.log (req.body);
  if (req.body) {
    // First check if time rows exist;
    // Check incident time;
    const data = req.body;
    const o_date = data.o_date;
    const r_date = data.r_date;
    // console.log (o_date);
    connection.query (
      `SELECT time_id FROM IncidentTime
      WHERE hour = ? AND day = ? AND month = ? AND year = ? AND day_of_week = ?;
      SELECT time_id FROM IncidentTime
      WHERE hour = ? AND day = ? AND month = ? AND year = ? AND day_of_week = ?;`,
      [
        o_date.hour,
        o_date.day,
        o_date.month,
        o_date.year,
        o_date.day_of_week,
        r_date.hour,
        r_date.day,
        r_date.month,
        r_date.year,
        r_date.day_of_week,
      ],
      function (error, results, fields) {
        if (error) throw error;
        // console.log (results);
        var o_date_results = results[0];
        var r_date_results = results[1];
        if (o_date_results.length > 0 && r_date_results.length > 0) {
          // Have both time ids
          var o_time_id = o_date_results[0].time_id;
          var r_time_id = r_date_results[0].time_id;
          data['reported_time_id'] = r_time_id;
          data['occurrence_time_id'] = o_time_id;
          insertCrime (data, res);
        } else {
          if (o_date_results.length == 0 && o_date_results.length == 0) {
            insertDate ([o_date, r_date], insertCrime, data, '', res);
          } else if (o_date_results.length == 0) {
            var r_time_id = r_date_results[0].time_id;
            data['reported_time_id'] = r_time_id;
            insertDate ([o_date], insertCrime, data, 'o', res);
          } else if (r_date_results.length == 0) {
            var o_time_id = o_date_results[0].time_id;
            data['occurrence_time_id'] = o_time_id;
            insertDate ([r_date], insertCrime, data, 'r', res);
          }
        }
      }
    );
  } else {
    res.status (404).json ({
      error: true,
      message: 'Data not passed',
    });
  }
});

app.route ('/crime-events/bike-thefts/').get (function (req, res, next) {
  connection.query (
    `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, CrimeEvent.premise_type, BikeTheft.make, BikeTheft.colour, BikeTheft.model, BikeTheft.speed, BikeTheft.bike_type, BikeTheft.status, BikeTheft.cost, Neighbourhood.name, Neighbourhood.division, OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
    FROM CrimeEvent
    JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
    JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id;`,
    function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    }
  );
});

app.route ('/traffic-events/').get (function (req, res, next) {
  connection.query (
    `SELECT TrafficEvent.accident_id, TrafficEvent.latitude, TrafficEvent.longitude, Neighbourhood.name, Neighbourhood.division, RoadCondition.classification, RoadCondition.traffic_control_type, RoadCondition.visibility, RoadCondition.surface_condition,  OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
    FROM TrafficEvent
    JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
    JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id;`,
    function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    }
  );
});

app.route ('/crime-events/table/').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  // console.log (req.query);
  if (Object.keys (req.query).length === 0) {
    connection.query (
      `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude,CrimeEvent.premise_type,
      RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour,
      OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
      FROM CrimeEvent
      JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
      JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
      JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`,
      function (error, results, fields) {
        if (error) throw error;
        res.json (results);
      }
    );
  } else {
    if (MCI == null) {
      connection.query (
        `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude,CrimeEvent.premise_type,
        RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour,
        OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
        WHERE OccuredTime.` +
          dateType +
          ' = ?',
        dateNum,
        function (error, results, fields) {
          if (error) throw error;
          res.json (results);
        }
      );
    } else {
      connection.query (
        `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude,CrimeEvent.premise_type,
        RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour,
        OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
        WHERE OccuredTime.` +
          dateType +
          ' = ? AND RegularCrime.MCI = ?',
        [dateNum, MCI],
        function (error, results, fields) {
          if (error) throw error;
          res.json (results);
        }
      );
    }
  }
});

app.route ('/crime-events/summary/').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  // console.log (req.query);
  if (Object.keys (req.query).length === 0) {
    connection.query (
      `SELECT RegularCrime.MCI, COUNT(CrimeEvent.crime_id) as total
      FROM CrimeEvent
      JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
      JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
      JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
      GROUP BY RegularCrime.MCI`,
      function (error, results, fields) {
        if (error) throw error;
        res.json (results);
      }
    );
  } else {
    if (MCI == null) {
      connection.query (
        `SELECT RegularCrime.MCI, COUNT(CrimeEvent.crime_id) as total
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
        WHERE OccuredTime.` +
          dateType +
          ' = ?' +
          ' GROUP BY RegularCrime.MCI',
        dateNum,
        function (error, results, fields) {
          if (error) throw error;
          res.json (results);
        }
      );
    } else {
      connection.query (
        `SELECT RegularCrime.MCI, COUNT(CrimeEvent.crime_id) as total
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
        WHERE OccuredTime.` +
          dateType +
          ' = ? AND RegularCrime.MCI = ?' +
          ' GROUP BY RegularCrime.MCI',
        [dateNum, MCI],
        function (error, results, fields) {
          if (error) throw error;
          res.json (results);
        }
      );
    }
  }
});

app.route ('/crime-events/map/').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  // console.log (req.query);
  if (Object.keys (req.query).length === 0) {
    connection.query (
      `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude
      FROM CrimeEvent
      JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
      JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
      JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`,
      function (error, results, fields) {
        if (error) throw error;
        res.json (results);
      }
    );
  } else {
    if (MCI == null) {
      connection.query (
        `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
        WHERE OccuredTime.` +
          dateType +
          ' = ?',
        dateNum,
        function (error, results, fields) {
          if (error) throw error;
          res.json (results);
        }
      );
    } else {
      connection.query (
        `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
        WHERE OccuredTime.` +
          dateType +
          ' = ? AND RegularCrime.MCI = ?',
        [dateNum, MCI],
        function (error, results, fields) {
          if (error) throw error;
          res.json (results);
        }
      );
    }
  }
});

app.get ('/status', (req, res) => res.send ('Working!'));

app.get ('/', (req, res) => {
  // res.send ('In development!!');
  res.sendFile (path.join (__dirname + '/public/index.html'));
});

app.use (express.static ('public'));

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
  console.log (`App listening on port ${PORT}`);
  console.log ('Press Ctrl+C to quit.');
});
