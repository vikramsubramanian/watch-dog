create TABLE IncidentTime (
  time_id INT NOT NULL PRIMARY KEY,
  hour INT,
  day INT,
  month INT,
  year INT,
  day_of_week INT
);

create TABLE PoliceDivision (
  division INT NOT NULL PRIMARY KEY,
  address VARCHAR(50)
);

create TABLE Neighbourhood (
  hood_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  division INT,
  FOREIGN KEY(division) REFERENCES PoliceDivision(division)
);

create TABLE BikeTheft(
  bike_theft_id INT NOT NULL PRIMARY KEY,
  colour VARCHAR(15),
  make VARCHAR(15),
  model VARCHAR(15),
  speed VARCHAR(15),
  bike_type VARCHAR(15),
  status VARCHAR(15),
  cost FLOAT
);

create TABLE RegularCrime(
  crime_id INT NOT NULL PRIMARY KEY,
  offence VARCHAR(10),
  MCI VARCHAR(10),
);

create TABLE CrimeEvent (
  event_id INT NOT NULL PRIMARY KEY,
  occurrence_time_id INT,
  reported_time_id INT,
  bike_theft_id INT,
  crime_id INT,
  hood_id INT,
  latitude FLOAT,
  longitude FLOAT,
  premise_type VARCHAR(50),
  FOREIGN KEY(occurrence_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(reported_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(crime_id) REFERENCES RegularCrime(crime_id),
  FOREIGN KEY(hood_id) REFERENCES Neighbourhood(hood_id)
  FOREIGN KEY(bike_theft_id) REFERENCES BikeTheft(bike_theft_id)
);

create TABLE InvolvedPerson(
  accident_id INT NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY(accident_id, person_id),
  involvement_type VARCHAR(50),
  age INT,
  injury VARCHAR(50),
  vehicle_type VARCHAR(10),
  action_taken VARCHAR(50)
  FOREIGN KEY(accident_id) REFERENCES TrafficEvent(accident_id),
);

create TABLE RoadCondition(
  road_condition_id INT NOT NULL PRIMARY KEY,
  classification VARCHAR(10),
  traffic_control_type VARCHAR(10),
  visibility VARCHAR(10),
  surface_condition VARCHAR(10)
);

create TABLE TrafficEvent(
  accident_id INT NOT NULL PRIMARY KEY,
  occurrence_time_id INT,
  road_condition_id INT,
  hood_id INT,
  latitude FLOAT,
  longitude FLOAT,
  FOREIGN KEY(occurrence_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(road_condition_id) REFERENCES RoadCondition(road_condition_id),
  FOREIGN KEY(hood_id) REFERENCES Neighbourhood(hood_id)
);
