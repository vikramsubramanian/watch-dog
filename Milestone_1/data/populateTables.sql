-- INSERT INTO IncidentTime;
-- INSERT INTO PoliceDivision;
-- INSERT INTO Neighbourhood;
-- INSERT INTO BikeTheft;
-- INSERT INTO RegularCrime;
-- INSERT INTO CrimeEvent;
-- INSERT INTO InvolvedPerson;
-- INSERT INTO RoadCondition;
-- INSERT INTO TrafficEvent;

INSERT INTO PoliceDivision (division, address) values (11, "2054 Davenport Rd");
INSERT INTO PoliceDivision (division, address) values (12, "200 Trethewey Dr");
INSERT INTO PoliceDivision (division, address) values (31, "40 Norfinch Dr");

INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (1,754856,754856,100000,300011,-79.4501038,43.7187347,"House");
INSERT INTO RegularCrime (crime_id, offence, MCI) values (100000,"Assault","Assault");

INSERT INTO Neighbourhood (hood_id, name, division) values (300011,"Yorkdale-Glen Park,D32", 31);

INSERT INTO IncidentTime (time_id, hour, day, month, year, day_of_week) values (754856,22,5,9,2019,1);