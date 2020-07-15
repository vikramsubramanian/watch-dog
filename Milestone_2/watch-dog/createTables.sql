create TABLE IncidentTime
(
  time_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  hour INT CHECK (hour >= 0 AND hour <= 12),
  day INT CHECK (day >= 1 AND day <= 31),
  month INT CHECK(month >= 1 AND month <= 12),
  year INT CHECK (year >= 2014 AND year <= YEAR(CURDATE())),
  day_of_week INT CHECK(day_of_week IS NULL OR day_of_week >= 1 AND day_of_week <= 7)
);


create TABLE PoliceDivision
(
  division INT NOT NULL PRIMARY KEY,
  address VARCHAR(50),
  area FLOAT CHECK(area >= 0),
  shapeLeng FLOAT CHECK(shapeLeng >= 0),
  shapeArea FLOAT CHECK(shapeArea >= 0)
);

create TABLE Neighbourhood
(
  hood_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  employement_rate FLOAT CHECK(employement_rate >= 0),
  high_school FLOAT CHECK(high_school >= 0),
  university FLOAT CHECK(university >= 0),
  technical_degree FLOAT CHECK(technical_degree >= 0),
  division INT,
  FOREIGN KEY(division) REFERENCES PoliceDivision(division)
);

create TABLE RegularCrime
(
  crime_id INT NOT NULL PRIMARY KEY,
  offence VARCHAR(50),
  MCI VARCHAR(50)
);

create TABLE CrimeEvent
(
  event_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  occurrence_time_id INT,
  reported_time_id INT,
  crime_id INT,
  hood_id INT,
  latitude FLOAT CHECK (latitude >= -90.0 AND latitude <= 90.0),
  longitude FLOAT CHECK (longitude >= -180.0 AND longitude <= 180.0),
  premise_type VARCHAR(50),
  FOREIGN KEY(occurrence_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(reported_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(crime_id) REFERENCES RegularCrime(crime_id),
  FOREIGN KEY(hood_id) REFERENCES Neighbourhood(hood_id)
);

create TABLE BikeTheft
(
  event_id INT NOT NULL PRIMARY KEY,
  colour VARCHAR(15),
  make VARCHAR(15),
  model VARCHAR(15),
  speed VARCHAR(15),
  bike_type VARCHAR(15),
  status VARCHAR(15),
  cost FLOAT CHECK (cost >= 0),
  FOREIGN KEY(event_id) REFERENCES CrimeEvent(event_id)
);

create TABLE RoadCondition
(
  road_condition_id INT NOT NULL PRIMARY KEY,
  classification VARCHAR(50),
  traffic_control_type VARCHAR(50),
  visibility VARCHAR(50),
  surface_condition VARCHAR(50)
);

create TABLE TrafficEvent
(
  accident_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  occurrence_time_id INT,
  road_condition_id INT,
  hood_id INT,
  latitude FLOAT CHECK (latitude >= -90.0 AND latitude <= 90.0),
  longitude FLOAT CHECK (longitude >= -180.0 AND longitude <= 180.0),
  FOREIGN KEY(occurrence_time_id) REFERENCES IncidentTime(time_id),
  FOREIGN KEY(road_condition_id) REFERENCES RoadCondition(road_condition_id),
  FOREIGN KEY(hood_id) REFERENCES Neighbourhood(hood_id)
);

create TABLE InvolvedPerson
(
  accident_id INT NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY(accident_id, person_id),
  involvement_type VARCHAR(50),
  age INT,
  injury VARCHAR(50),
  vehicle_type VARCHAR(50),
  action_taken VARCHAR(50),
  FOREIGN KEY(accident_id) REFERENCES TrafficEvent(accident_id)
);

CREATE INDEX YearMonth ON IncidentTime(year, month);

CREATE INDEX InvolvedPersonAge ON InvolvedPerson(age);
