-- connect to CS348;
create TABLE IncidentTime (
  time_id INT NOT NULL PRIMARY KEY,
  hour INT NOT NULL,
  day INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  day_of_week INT NOT NULL
);
create TABLE Neighbourhood (
  hood_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  division INT NOT NULL
);
create TABLE RegularCrime(
  crime_id INT NOT NULL PRIMARY KEY,
  offence VARCHAR(10) NOT NULL,
  MCI VARCHAR(10) NOT NULL
);
create TABLE BikeTheft(
  bike_theft_id INT NOT NULL PRIMARY KEY,
  colour VARCHAR(15) NOT NULL,
  make VARCHAR(15) NOT NULL,
  model VARCHAR(15) NOT NULL,
  speed VARCHAR(15) NOT NULL,
  bike_type VARCHAR(15) NOT NULL,
  status VARCHAR(15) NOT NULL,
  cost FLOAT NOT NULL
);
create TABLE CrimeEvent (
  event_id INT NOT NULL PRIMARY KEY,
  occurrence_time_id INT NOT NULL,
  reported_time_id INT,
  crime_id INT,
  bike_theft_id INT,
  hood_id INT NOT NULL,
  lat FLOAT NOT NULL,
  long FLOAT NOT NULL,
  premise_type VARCHAR(50),
  FOREIGN KEY(occurrence_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(reported_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(crime_id) REFERENCES RegularCrime(crime_id),
  FOREIGN KEY(bike_theft_id) REFERENCES BikeTheft(bike_theft_id),
  FOREIGN KEY(hood_id) REFERENCES Neighbourhood(hood_id)
);
create TABLE InvolvedPerson(
  accident_id INT NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY(accident_id, person_id),
  involvement_type VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  injury VARCHAR(50) NOT NULL,
  vehicle_type VARCHAR(10),
  action_taken VARCHAR(50)
);
create TABLE RoadCondition(
  road_condition_id INT NOT NULL PRIMARY KEY,
  classification VARCHAR(10) NOT NULL,
  traffic_control_type VARCHAR(10),
  visibility VARCHAR(10) NOT NULL,
  surface_condition VARCHAR(10) NOT NULL
);
create TABLE TrafficEvent(
  accident_id INT NOT NULL PRIMARY KEY,
  occurrence_time_id INT NOT NULL,
  road_condition_id INT NOT NULL,
  hood_id INT NOT NULL,
  lat FLOAT NOT NULL,
  long FLOAT NOT NULL,
  FOREIGN KEY(occurrence_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(road_condition_id) REFERENCES RoadCondition(road_condition_id),
  FOREIGN KEY(hood_id) REFERENCES Neighbourhood(hood_id)
);