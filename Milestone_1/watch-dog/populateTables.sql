-- Insert sample incident times
INSERT INTO IncidentTime (time_id, hour, day, month, year, day_of_week) values (754856,22,5,9,2019,1);
INSERT INTO IncidentTime (time_id, hour, day, month, year, day_of_week) values (600008,0,1,1,2014,3);

-- Insert sample police divisions
INSERT INTO PoliceDivision (division, address) values (11, "2054 Davenport Rd");
INSERT INTO PoliceDivision (division, address) values (12, "200 Trethewey Dr");
INSERT INTO PoliceDivision (division, address) values (31, "40 Norfinch Dr");

-- Insert sample neighbourhoods
INSERT INTO Neighbourhood (hood_id, name, division) values (300011,"Yorkdale-Glen Park", 31);
INSERT INTO Neighbourhood (hood_id, name, division) values (300033,"Rosedale-Moore Park", 11);
INSERT INTO Neighbourhood (hood_id, name, division) values (300071,"Thorncliffe Park", 12);

-- Insert sample crimes
INSERT INTO RegularCrime (crime_id, offence, MCI) values (100000,"Assault","Assault");
INSERT INTO RegularCrime (crime_id, offence, MCI) values (100009,"Robbery - Mugging","Robbery");
INSERT INTO RegularCrime (crime_id, offence, MCI) values (157000,"Theft Of Motor Vehicle","Auto Theft");


-- Insert sample bike theft events
INSERT INTO BikeTheft (bike_theft_id, colour, make, model, speed, bike_type, status, cost) values (100001,"ONG","SUPERCYCLE", "10", "5", "mt", "STOLEN", 1600);

-- Create sample crime events
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (1,754856,754856,100000,300011,-79.4501038,43.7187347,"House");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (2,600008,600008,100009,300033,-79.3867874,43.6702271, "Other");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (3,600008,600008,157000,300071,-79.3436279,43.7074776, "Commercial");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (4,600008,600008,157000,300071,-79.3436279,43.7074776, "Commercial");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, bike_theft_id, hood_id, latitude, longitude, premise_type) values (5,600008,600008,100001,300071,-79.3436279,43.7074776, "Other");

-- Insert sample road conditions
INSERT INTO RoadCondition (road_condition_id, classification, traffic_control_type, visibility, surface_condition) values (800001,"Local","Traffic Signal", "Clear", "dry");
INSERT INTO RoadCondition (road_condition_id, classification, traffic_control_type, visibility, surface_condition) values (800002,"Laneway","Stop sign", "Rain", "wet");
INSERT INTO RoadCondition (road_condition_id, classification, traffic_control_type, visibility, surface_condition) values (800003,"Major Arterial","Traffic Signal", "Snow", "loose snow");

-- Create sample traffic events
INSERT INTO TrafficEvent (accident_id, occurrence_time_id, road_condition_id, hood_id, latitude, longitude) values (700001, 754856, 800001, 300011, -79.4501038, 43.7187347);
INSERT INTO TrafficEvent (accident_id, occurrence_time_id, road_condition_id, hood_id, latitude, longitude) values (700002, 754856, 800002, 300011, -79.3645859, 43.7035179);
INSERT INTO TrafficEvent (accident_id, occurrence_time_id, road_condition_id, hood_id, latitude, longitude) values (700003, 754856, 800003, 300011, -79.4501048, 43.7187377);

-- Insert sample involved person
INSERT INTO InvolvedPerson (accident_id, person_id, involvement_type, age, injury, vehicle_type, action_taken) values (700001, 500001,"Cyclist", 21, "minimal", "car", "none");
INSERT INTO InvolvedPerson (accident_id, person_id, involvement_type, age, injury, vehicle_type, action_taken) values (700002, 500002,"Driver", 34, "major", "car", "none");
INSERT INTO InvolvedPerson (accident_id, person_id, involvement_type, age, injury, vehicle_type, action_taken) values (700003, 500003,"Vehicle Owner", 55, "none", "car", "none");
