require ('dotenv').config ();

const express = require ('express');
const app = express ();
const connection = require ('./database');
var path = require ('path');

var questionQueries = require ('./questions');

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

app.route ('/police-divisions/').get (function (req, res, next) {
  connection.query (
    `SELECT division
    FROM PoliceDivision;`,
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

app.route ('/question/:questionNum').get (function (req, res, next) {
  var qNum = req.params.questionNum;

  var query = questionQueries.get (qNum);

  if (query) {
    console.log (query);
    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  } else {
    res.json ({
      error: true,
      message: 'Question number not found!',
    });
  }
});

app.route ('/crime-events/bike-thefts/table/').get (function (req, res, next) {
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude,
  BikeTheft.colour, BikeTheft.make, BikeTheft.model, BikeTheft.speed, BikeTheft.bike_type, BikeTheft.status, BikeTheft.cost, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour,
  OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
  FROM CrimeEvent
  JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app
  .route ('/crime-events/bike-thefts/summary/police-division')
  .get (function (req, res, next) {
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;

    var query = `SELECT PoliceDivision.division,PoliceDivision.address, COUNT(g.event_id) as total
    FROM PoliceDivision LEFT JOIN
      ( SELECT CrimeEvent.event_id, Neighbourhood.hood_id, Neighbourhood.division
        FROM CrimeEvent
        JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }
    query +=
      ' ) as g on PoliceDivision.division=g.division GROUP BY PoliceDivision.division ORDER BY total DESC;';
    console.log (query);
    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app
  .route ('/crime-events/bike-thefts/summary/type')
  .get (function (req, res, next) {
    let bikeType = req.query.type;
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;

    var query = `SELECT a.types as label, COUNT(b.ids) as total
    FROM
   ( SELECT BikeTheft.bike_type as types
      FROM BikeTheft
      GROUP BY BikeTheft.bike_type ) as a
    LEFT OUTER JOIN
     (
      SELECT BikeTheft.bike_type as types, CrimeEvent.event_id as ids
      FROM CrimeEvent
      JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
      JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
      JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (bikeType != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "BikeTheft.bike_type = '" + bikeType + "'";
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }
    query +=
      '  ) as b on a.types=b.types GROUP BY a.types ORDER BY total DESC;';
    console.log (query);
    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app
  .route ('/crime-events/bike-thefts/summary/status')
  .get (function (req, res, next) {
    let status = req.query.status;
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;

    var query = `SELECT a.status as label, COUNT(b.ids) as total
    FROM
   ( SELECT BikeTheft.status as status
      FROM BikeTheft
      GROUP BY BikeTheft.status ) as a
    LEFT OUTER JOIN
     (
      SELECT BikeTheft.status as status, CrimeEvent.event_id as ids
      FROM CrimeEvent
      JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
      JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
      JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (status != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "BikeTheft.status = '" + status + "'";
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }
    query +=
      '   ) as b on a.status=b.status GROUP BY a.status ORDER BY total DESC;';
    console.log (query);
    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app
  .route ('/crime-events/bike-thefts/summary/time')
  .get (function (req, res, next) {
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;
    let timeType = req.query.timeType;

    var query =
      `SELECT f.` +
      timeType +
      `, COUNT(g.time_id) as total
    FROM
    (SELECT IncidentTime.time_id, IncidentTime.` +
      timeType +
      `
    FROM IncidentTime WHERE IncidentTime.` +
      dateType +
      `=` +
      dateNum +
      `) as f LEFT JOIN
    (SELECT OccuredTime.time_id, OccuredTime.` +
      timeType +
      `
    FROM CrimeEvent
    JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
    JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }

    query += ')  as g on f.time_id=g.time_id GROUP BY f.' + timeType;
    console.log (query);

    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app
  .route ('/crime-events/bike-thefts/heatmap/year')
  .get (function (req, res, next) {
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;

    var query = `SELECT OccuredTime.month, OccuredTime.day, OccuredTime.hour, COUNT(CrimeEvent.event_id) as total
    FROM CrimeEvent
    JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
    JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }

    query += ' GROUP BY OccuredTime.month,OccuredTime.day,OccuredTime.hour';

    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app.route ('/crime-events/bike-thefts/map/').get (function (req, res, next) {
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, Neighbourhood.name
  FROM CrimeEvent
  JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/traffic-events/table/').get (function (req, res, next) {
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT TrafficEvent.accident_id, TrafficEvent.latitude, TrafficEvent.longitude,
  Neighbourhood.name, Neighbourhood.division,
  RoadCondition.classification, RoadCondition.traffic_control_type, RoadCondition.visibility, RoadCondition.surface_condition,
  OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
  FROM TrafficEvent
  JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
  JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/traffic-events/summary/road/:cat').get (function (req, res, next) {
  var cat = req.params.cat;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `(SELECT RoadCondition.${cat} as label, COUNT(TrafficEvent.accident_id) as total
    FROM TrafficEvent
    JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
    JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id
    WHERE RoadCondition.${cat} IS NULL `;

  // console.log (req.query);
  var firstWhere = false;
  var wherePart = '';
  console.log (req.query);
  if (Object.keys (req.query).length > 0) {
    // query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += 'Neighbourhood.division = ' + pdNum;
    }
  }

  query += wherePart;
  query += `) UNION ALL
    (SELECT a.class as label, COUNT(b.ids) as total
      FROM
     ( SELECT RoadCondition.${cat} as class
        FROM RoadCondition
        WHERE RoadCondition.${cat} IS NOT NULL
        GROUP BY RoadCondition.${cat}
        ) as a
      LEFT OUTER JOIN
       (
        SELECT RoadCondition.${cat} as class, TrafficEvent.accident_id as ids
        FROM TrafficEvent
        JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
        JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id
        WHERE  RoadCondition.${cat} IS NOT NULL `;
  query += wherePart;

  query += ' ) as b on a.class=b.class GROUP BY a.class) ORDER BY total DESC;';
  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/traffic-events/summary/type').get (function (req, res, next) {
  let type = req.query.type;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `(SELECT  InvolvedPerson.involvement_type as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN InvolvedPerson ON TrafficEvent.accident_id=InvolvedPerson.accident_id
  JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
  JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id
  WHERE InvolvedPerson.involvement_type IS NULL `;

  // console.log (req.query);
  var firstWhere = false;
  var wherePart = '';
  if (Object.keys (req.query).length > 0) {
    // query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (type != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += "InvolvedPerson.involvement_type = '" + type + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        wherePart += ' AND ';
      }
      firstWhere = false;
      wherePart += 'Neighbourhood.division = ' + pdNum;
    }
  }
  query += wherePart;
  query += `)
  UNION ALL
  (SELECT a.involvement_type as label, COUNT(b.ids)
      FROM
     ( SELECT InvolvedPerson.involvement_type as involvement_type
        FROM InvolvedPerson
        WHERE InvolvedPerson.involvement_type IS NOT NULL
        GROUP BY InvolvedPerson.involvement_type
        ) as a
      LEFT OUTER JOIN
       (
        SELECT InvolvedPerson.involvement_type as involvement_type, TrafficEvent.accident_id as ids
        FROM TrafficEvent
        JOIN InvolvedPerson ON TrafficEvent.accident_id=InvolvedPerson.accident_id
        JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
        JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id
        WHERE InvolvedPerson.involvement_type IS NOT NULL `;
  query += wherePart;

  query +=
    ' ) as b on a.involvement_type=b.involvement_type GROUP BY a.involvement_type) ORDER BY total DESC;';
  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app
  .route ('/traffic-events/summary/police-division')
  .get (function (req, res, next) {
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;

    var query = `SELECT PoliceDivision.division,PoliceDivision.address, COUNT(g.accident_id) as total
    FROM PoliceDivision LEFT JOIN
      ( SELECT TrafficEvent.accident_id, Neighbourhood.hood_id, Neighbourhood.division
        FROM TrafficEvent
        JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }
    query +=
      ' ) as g on PoliceDivision.division=g.division GROUP BY PoliceDivision.division ORDER BY total DESC;';
    console.log (query);
    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app.route ('/traffic-events/summary/time').get (function (req, res, next) {
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;
  let timeType = req.query.timeType;

  var query =
    `SELECT f.` +
    timeType +
    `, COUNT(g.time_id) as total
  FROM
  (SELECT IncidentTime.time_id, IncidentTime.` +
    timeType +
    `
  FROM IncidentTime WHERE IncidentTime.` +
    dateType +
    `=` +
    dateNum +
    `) as f LEFT JOIN
    (SELECT OccuredTime.time_id, OccuredTime.` +
    timeType +
    `
  FROM TrafficEvent
  JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  query += ')  as g on f.time_id=g.time_id GROUP BY f.' + timeType;

  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/traffic-events/heatmap/year').get (function (req, res, next) {
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT OccuredTime.month, OccuredTime.day, OccuredTime.hour, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  query += ' GROUP BY OccuredTime.month,OccuredTime.day,OccuredTime.hour';

  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/traffic-events/map/').get (function (req, res, next) {
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT TrafficEvent.accident_id, TrafficEvent.latitude, TrafficEvent.longitude, Neighbourhood.name
  FROM TrafficEvent
  JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/crime-events/table/').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude,CrimeEvent.premise_type,
  RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour,
  OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (MCI != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "RegularCrime.MCI = '" + MCI + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/crime-events/summary/MCI').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT a.MCI as label, COUNT(b.ids) as total
  FROM
 ( SELECT RegularCrime.MCI as MCI
    FROM RegularCrime
    GROUP BY RegularCrime.MCI ) as a
  LEFT OUTER JOIN
   (
    SELECT RegularCrime.MCI as MCI, CrimeEvent.event_id as ids
    FROM CrimeEvent
    JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
    JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (MCI != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "RegularCrime.MCI = '" + MCI + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }
  query += '  ) as b on a.MCI=b.MCI GROUP BY a.MCI ORDER BY total DESC;';
  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/crime-events/summary/premise').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT CrimeEvent.premise_type as label, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  `;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (MCI != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "RegularCrime.MCI = '" + MCI + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }
  query += '  GROUP BY CrimeEvent.premise_type;';
  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app
  .route ('/crime-events/summary/police-division')
  .get (function (req, res, next) {
    let MCI = req.query.MCI;
    let dateType = req.query.dateType;
    let dateNum = req.query.dateNum;
    let hoodName = req.query.hood;
    let pdNum = req.query.pd;

    var query = `SELECT PoliceDivision.division,PoliceDivision.address, COUNT(g.event_id) as total
    FROM PoliceDivision LEFT JOIN
      ( SELECT CrimeEvent.event_id, Neighbourhood.hood_id, Neighbourhood.division
        FROM CrimeEvent
        JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
        JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
        JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

    // console.log (req.query);
    var firstWhere = true;
    if (Object.keys (req.query).length > 0) {
      query += ' WHERE ';
      if (dateType != null && dateNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'OccuredTime.' + dateType + '=' + dateNum;
      }
      if (MCI != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "RegularCrime.MCI = '" + MCI + "'";
      }
      if (hoodName != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += "Neighbourhood.name = '" + hoodName + "'";
      }
      if (pdNum != null) {
        if (!firstWhere) {
          query += ' AND ';
        }
        firstWhere = false;
        query += 'Neighbourhood.division = ' + pdNum;
      }
    }
    query +=
      ' ) as g on PoliceDivision.division=g.division GROUP BY PoliceDivision.division ORDER BY total DESC;';
    console.log (query);
    connection.query (query, function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    });
  });

app.route ('/crime-events/summary/time').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;
  let timeType = req.query.timeType;

  var query =
    `SELECT f.` +
    timeType +
    `, COUNT(g.time_id) as total
    FROM
    (SELECT IncidentTime.time_id, IncidentTime.` +
    timeType +
    `
    FROM IncidentTime WHERE IncidentTime.` +
    dateType +
    `=` +
    dateNum +
    `) as f LEFT JOIN
      (SELECT OccuredTime.time_id, OccuredTime.` +
    timeType +
    `
    FROM CrimeEvent
    JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
    JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (MCI != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "RegularCrime.MCI = '" + MCI + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  query += ')  as g on f.time_id=g.time_id GROUP BY f.' + timeType;

  console.log (query);

  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/crime-events/heatmap/year').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT OccuredTime.month, OccuredTime.day, OccuredTime.hour, COUNT(CrimeEvent.event_id) as total
    FROM CrimeEvent
    JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
    JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
    JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (MCI != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "RegularCrime.MCI = '" + MCI + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  query += ' GROUP BY OccuredTime.month,OccuredTime.day,OccuredTime.hour';

  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/crime-events/map/').get (function (req, res, next) {
  let MCI = req.query.MCI;
  let dateType = req.query.dateType;
  let dateNum = req.query.dateNum;
  let hoodName = req.query.hood;
  let pdNum = req.query.pd;

  var query = `SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, Neighbourhood.name, RegularCrime.MCI
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id`;

  // console.log (req.query);
  var firstWhere = true;
  if (Object.keys (req.query).length > 0) {
    query += ' WHERE ';
    if (dateType != null && dateNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'OccuredTime.' + dateType + '=' + dateNum;
    }
    if (MCI != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "RegularCrime.MCI = '" + MCI + "'";
    }
    if (hoodName != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += "Neighbourhood.name = '" + hoodName + "'";
    }
    if (pdNum != null) {
      if (!firstWhere) {
        query += ' AND ';
      }
      firstWhere = false;
      query += 'Neighbourhood.division = ' + pdNum;
    }
  }

  console.log (query);
  connection.query (query, function (error, results, fields) {
    if (error) throw error;
    res.json (results);
  });
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
