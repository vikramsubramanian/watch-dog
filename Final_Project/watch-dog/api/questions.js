var questionQueries = new Map ();

questionQueries.set (
  '0',
  `SELECT bike_type, COUNT(*) as theft_count
   FROM BikeTheft GROUP BY bike_type ORDER BY theft_count DESC LIMIT 3;`
);

questionQueries.set (
  '1',
  `SELECT count(*) as total FROM BikeTheft WHERE status = 'RECOVERED'`
);

questionQueries.set (
  '2',
  `SELECT  OccuredTime.hour, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY OccuredTime.hour
  ORDER BY OccuredTime.hour`
);

questionQueries.set (
  '3',
  `SELECT  OccuredTime.day_of_week, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY OccuredTime.day_of_week
  ORDER BY OccuredTime.day_of_week`
);

questionQueries.set (
  '4',
  `SELECT  OccuredTime.hour, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  WHERE RegularCrime.MCI="robbery"
  GROUP BY OccuredTime.hour
  ORDER BY OccuredTime.hour`
);

questionQueries.set (
  '5',
  `SELECT  OccuredTime.day_of_week, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY OccuredTime.day_of_week
  ORDER BY OccuredTime.day_of_week`
);

questionQueries.set (
  '6',
  `SELECT TrafficEvent.hood_id, name, Count(accident_id) as total
  FROM TrafficEvent
  JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
  GROUP BY TrafficEvent.hood_id
  ORDER BY total DESC LIMIT 1;`
);

questionQueries.set (
  '7',
  `SELECT age as label, COUNT(*) as total FROM InvolvedPerson GROUP BY age ORDER BY label`
);

questionQueries.set ('8', `SELECT AVG(cost) as avgCost FROM BikeTheft`);

questionQueries.set (
  '9',
  `SELECT BikeTheft.colour, COUNT(BikeTheft.event_id) as total FROM BikeTheft GROUP BY BikeTheft.colour ORDER BY total DESC LIMIT 3`
);

questionQueries.set (
  '10',
  `SELECT InvolvedPerson.injury as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN InvolvedPerson ON TrafficEvent.accident_id=InvolvedPerson.accident_id
  GROUP BY InvolvedPerson.injury`
);

questionQueries.set (
  '11',
  `SELECT InvolvedPerson.vehicle_type as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN InvolvedPerson ON TrafficEvent.accident_id=InvolvedPerson.accident_id
  GROUP BY InvolvedPerson.vehicle_type
  ORDER BY total
  DESC`
);

questionQueries.set (
  '12',
  `SELECT InvolvedPerson.action_taken as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent JOIN InvolvedPerson ON TrafficEvent.accident_id=InvolvedPerson.accident_id
  GROUP BY InvolvedPerson.action_taken
  ORDER BY TOTAL
  DESC`
);

questionQueries.set (
  '13',
  `SELECT Neighbourhood.hood_id, Neighbourhood.employment_rate, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY Neighbourhood.hood_id
  ORDER BY Neighbourhood.employment_rate`
);

questionQueries.set (
  '14',
  `SELECT Neighbourhood.hood_id, Neighbourhood.high_school, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY Neighbourhood.hood_id
  ORDER BY Neighbourhood.high_school;

  SELECT Neighbourhood.hood_id, Neighbourhood.university, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY Neighbourhood.hood_id
  ORDER BY Neighbourhood.university;

  SELECT Neighbourhood.hood_id, Neighbourhood.technical_degree, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  GROUP BY Neighbourhood.hood_id
  ORDER BY Neighbourhood.technical_degree;
  `
);

questionQueries.set (
  '15',
  `SELECT BikeTheft.speed, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  WHERE BikeTheft.speed IS NOT NULL AND BikeTheft.speed > 0
  GROUP BY BikeTheft.speed
  ORDER BY BikeTheft.speed;`
);

questionQueries.set (
  '16',
  `SELECT BikeTheft.cost, COUNT(CrimeEvent.event_id) as total
  FROM CrimeEvent
  JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
  JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
  JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
  WHERE BikeTheft.cost IS NOT NULL AND BikeTheft.cost > 0
  GROUP BY BikeTheft.cost
  ORDER BY BikeTheft.cost;`
);

questionQueries.set (
  '17',
  `SELECT RoadCondition.surface_condition as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
  GROUP BY RoadCondition.surface_condition
  ORDER BY total`
);

questionQueries.set (
  '18',
  `SELECT RoadCondition.visibility as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
  GROUP BY RoadCondition.visibility
  ORDER BY total`
);

questionQueries.set (
  '19',
  `SELECT RoadCondition.classification as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
  GROUP BY RoadCondition.classification
  ORDER BY total`
);

questionQueries.set (
  '20',
  `SELECT RoadCondition.traffic_control_type as label, COUNT(TrafficEvent.accident_id) as total
  FROM TrafficEvent
  JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
  GROUP BY RoadCondition.traffic_control_type
  ORDER BY total`
);

module.exports = questionQueries;
