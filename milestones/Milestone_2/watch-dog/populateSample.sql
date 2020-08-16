-- Insert sample incident times
INSERT INTO IncidentTime (time_id, hour, day, month, year, day_of_week) values (754856,22,5,9,2019,1);
INSERT INTO IncidentTime (time_id, hour, day, month, year, day_of_week) values (600008,0,1,1,2014,3);

-- Insert sample police divisions
INSERT INTO PoliceDivision (division,address,area,shapeLeng,shapeArea) values (11,"2054 Davenport Rd",18.65186473,20407.68933,18679508.75);
INSERT INTO PoliceDivision (division,address,area,shapeLeng,shapeArea) values (12,"200 Trethewey Dr",24.73460211,23875.50886,24771165.6);
INSERT INTO PoliceDivision (division,address,area,shapeLeng,shapeArea) values (31,"40 Norfinch Dr",42.57854261,32091.10443,42641462.6);

-- Insert sample neighbourhoods
INSERT INTO Neighbourhood (hood_id,name,division,high_school,university,technical_degree,employment_rate) values (31,"Yorkdale-Glen Park",32,25.49,35.35,13.22,55.45);
INSERT INTO Neighbourhood (hood_id,name,division,high_school,university,technical_degree,employment_rate) values (98,"Rosedale-Moore Park",53,11.19,77.73,7,60.65);
INSERT INTO Neighbourhood (hood_id,name,division,high_school,university,technical_degree,employment_rate) values (55,"Thorncliffe Park",53,21.63,50,11.15,49.05);

-- Insert sample crimes
INSERT INTO RegularCrime (crime_id, offence, MCI) values (1,"Assault","Assault");
INSERT INTO RegularCrime (crime_id, offence, MCI) values (6,"Robbery - Mugging","Robbery");
INSERT INTO RegularCrime (crime_id, offence, MCI) values (45,"Theft Of Motor Vehicle","Auto Theft");


-- Insert sample bike theft events
INSERT INTO BikeTheft (event_id, colour, make, model, speed, bike_type, status, cost) values (100001,"ONG","SUPERCYCLE", "10", "5", "mt", "STOLEN", 1600);

-- Create sample crime events
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (1,754856,754856,1,31,-79.4501038,43.7187347,"House");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (2,600008,600008,6,98,-79.3867874,43.6702271, "Other");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (3,600008,600008,45,55,-79.3436279,43.7074776, "Commercial");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, crime_id, hood_id, latitude, longitude, premise_type) values (4,600008,600008,45,55,-79.3436279,43.7074776, "Commercial");
INSERT INTO CrimeEvent (event_id, occurrence_time_id, reported_time_id, bike_theft_id, hood_id, latitude, longitude, premise_type) values (5,600008,600008,100001,55,-79.3436279,43.7074776, "Other");

-- Insert sample road conditions
INSERT INTO RoadCondition (road_condition_id, classification, traffic_control_type, visibility, surface_condition) values (800001,"Local","Traffic Signal", "Clear", "dry");
INSERT INTO RoadCondition (road_condition_id, classification, traffic_control_type, visibility, surface_condition) values (800002,"Laneway","Stop sign", "Rain", "wet");
INSERT INTO RoadCondition (road_condition_id, classification, traffic_control_type, visibility, surface_condition) values (800003,"Major Arterial","Traffic Signal", "Snow", "loose snow");

-- Create sample traffic events
INSERT INTO TrafficEvent (accident_id, occurrence_time_id, road_condition_id, hood_id, latitude, longitude) values (700001, 754856, 800001, 31, -79.4501038, 43.7187347);
INSERT INTO TrafficEvent (accident_id, occurrence_time_id, road_condition_id, hood_id, latitude, longitude) values (700002, 754856, 800002, 98, -79.3645859, 43.7035179);
INSERT INTO TrafficEvent (accident_id, occurrence_time_id, road_condition_id, hood_id, latitude, longitude) values (700003, 754856, 800003, 55, -79.4501048, 43.7187377);

-- Insert sample involved person
INSERT INTO InvolvedPerson (accident_id, person_id, involvement_type, age, injury, vehicle_type, action_taken) values (700001, 500001,"Cyclist", 21, "minimal", "car", "none");
INSERT INTO InvolvedPerson (accident_id, person_id, involvement_type, age, injury, vehicle_type, action_taken) values (700002, 500002,"Driver", 34, "major", "car", "none");
INSERT INTO InvolvedPerson (accident_id, person_id, involvement_type, age, injury, vehicle_type, action_taken) values (700003, 500003,"Vehicle Owner", 55, "none", "car", "none");
