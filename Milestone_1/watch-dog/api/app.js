require ('dotenv').config ();

const express = require ('express');
const app = express ();
const connection = require ('./database');
var path = require ('path');

app.route ('/report-crime/').get (function (req, res, next) {
  // Hard coded update (new crime);
  connection.query (
    `INSERT INTO CrimeEvent
    (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type)
    values (6,754856,754856,100000,300071,-78.4501038,44.7187347,"House");`,
    function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    }
  );
});

app.route ('/crime-events/bike-thefts/').get (function (req, res, next) {
  connection.query (
    `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, CrimeEvent.premise_type, BikeTheft.make, BikeTheft.colour, BikeTheft.model, BikeTheft.speed, BikeTheft.bike_type, BikeTheft.status, BikeTheft.cost, Neighbourhood.name, Neighbourhood.division, OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
    FROM CrimeEvent
    JOIN BikeTheft ON CrimeEvent.bike_theft_id = BikeTheft.bike_theft_id
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

app.route ('/crime-events/').get (function (req, res, next) {
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
