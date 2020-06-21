
-- Supply dynamic content from API
-- See app.js in API/ for the query template
-- A few filled out values are shown here

SELECT *
FROM CrimeEvent JOIN IncidentTime JOIN RegularCrime JOIN Neighbourhood
WHERE year >= 2019 AND MCI='Assault';

SELECT *
FROM CrimeEvent JOIN IncidentTime JOIN RegularCrime JOIN Neighbourhood
WHERE year < 2018;

-- Modify the database
-- Report a crime feature

-- Add new neighbourhood before reporting
INSERT INTO Neighbourhood (hood_id, name, division) values (300019,"York University Heights", 12);

-- Add new crime event
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (6,754856,754856,100000,300019,-78.4501038,44.7187347,"House");