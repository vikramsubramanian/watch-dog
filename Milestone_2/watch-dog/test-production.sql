
-- Supply dynamic content from API

-- See app.js in API/ for the query template
-- A few filled out values are shown here

-- Regular Crimes
SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, CrimeEvent.premise_type, RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
FROM CrimeEvent
JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
LIMIT 10;

-- Crimes in Year:
SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, CrimeEvent.premise_type, RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
FROM CrimeEvent
JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
WHERE OccuredTime.year=2019
LIMIT 10;

-- Crimes in Year & MCI:
SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, CrimeEvent.premise_type, RegularCrime.MCI, RegularCrime.offence, Neighbourhood.name, Neighbourhood.division,OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
FROM CrimeEvent
JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
WHERE OccuredTime.year=2014 AND RegularCrime.MCI='Robbery'
LIMIT 10;

-- Crime Summary Card for 2019
SELECT RegularCrime.MCI, COUNT(CrimeEvent.crime_id) as total
FROM CrimeEvent
JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
WHERE OccuredTime.year=2019
GROUP BY RegularCrime.MCI;

-- Map Summary Card for 2019
SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude
FROM CrimeEvent
JOIN RegularCrime ON CrimeEvent.crime_id = RegularCrime.crime_id
JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
WHERE OccuredTime.year=2019
LIMIT 10;

-- Bike Thefts
SELECT CrimeEvent.event_id, CrimeEvent.latitude, CrimeEvent.longitude, CrimeEvent.premise_type, BikeTheft.make, BikeTheft.colour, BikeTheft.model, BikeTheft.speed, BikeTheft.bike_type, BikeTheft.status, BikeTheft.cost, Neighbourhood.name, Neighbourhood.division, OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
FROM CrimeEvent
JOIN BikeTheft ON CrimeEvent.event_id = BikeTheft.event_id
JOIN Neighbourhood ON CrimeEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON CrimeEvent.occurrence_time_id = OccuredTime.time_id
LIMIT 10;

-- Traffic Events
SELECT TrafficEvent.accident_id, TrafficEvent.latitude, TrafficEvent.longitude, Neighbourhood.name, Neighbourhood.division, RoadCondition.classification, RoadCondition.traffic_control_type, RoadCondition.visibility, RoadCondition.surface_condition,  OccuredTime.hour as OccuredHour, OccuredTime.day as OccuredDay, OccuredTime.month as OccuredMonth, OccuredTime.year as OccuredYear, OccuredTime.day_of_week as OccuredDayOfWeek
FROM TrafficEvent
JOIN RoadCondition ON TrafficEvent.road_condition_id = RoadCondition.road_condition_id
JOIN Neighbourhood ON TrafficEvent.hood_id = Neighbourhood.hood_id
JOIN IncidentTime as OccuredTime ON TrafficEvent.occurrence_time_id = OccuredTime.time_id
LIMIT 10;

-- Neighbourhoods
SELECT hood_id, name
FROM Neighbourhood
LIMIT 10;

-- Crime Types
SELECT *
FROM RegularCrime
LIMIT 10;

-- Modify the database
-- Report a crime feature

-- Add new time
INSERT INTO IncidentTime(hour, day, month, year, day_of_week) values (3, 2, 2, 2022, 1);

-- -- Add new crime event
INSERT INTO CrimeEvent
    (occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type)
    values (42034,52034,2,31,-78.4501038,44.7187347,"House");