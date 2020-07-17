LOAD DATA INFILE '/var/lib/mysql-files/incidentTime.csv'
INTO TABLE IncidentTime FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(time_id,@vhour,@vday,@vmonth,@vyear,@vday_of_week)
SET
hour = NULLIF(@vhour,''),
day = NULLIF(@vday,''),
month = NULLIF(@vmonth,''),
year = NULLIF(@vyear,''),
day_of_week = NULLIF(@vday_of_week,'')
;


LOAD DATA INFILE '/var/lib/mysql-files/RegularCrime.csv'
INTO TABLE RegularCrime FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(crime_id,@voffence,@vMCI)
SET
offence = NULLIF(@voffence,''),
MCI = NULLIF(@vMCI,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/policeDivision.csv'
INTO TABLE PoliceDivision FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS
(division,@vaddress,@varea,@vshapeLeng,@vshapeArea)
SET
address = NULLIF(@vaddress,''),
area = NULLIF(@varea,''),
shapeLeng = NULLIF(@vshapeLeng,''),
shapeArea = NULLIF(@vshapeArea,'')
;


LOAD DATA INFILE '/var/lib/mysql-files/Neighbourhood.csv'
INTO TABLE Neighbourhood FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS
(hood_id,@vname,@vdivision,@vhigh_school,@vuniversity,@vtechnical_degree,@vemployment_rate)
SET
name = NULLIF(@vname,''),
division = NULLIF(@vdivision,''),
high_school = NULLIF(@vhigh_school,''),
university = NULLIF(@vuniversity,''),
technical_degree = NULLIF(@vtechnical_degree,''),
employment_rate = NULLIF(@vemployment_rate,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/CrimeEvents_1.csv'
INTO TABLE CrimeEvent FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS
(event_id,@vlongitude,@vlatitude,@vpremise_type,@vhood_id,@voccurrence_time_id,@vreported_time_id,@vcrime_id)
SET
longitude = NULLIF(@vlongitude,''),
latitude = NULLIF(@vlatitude,''),
premise_type = NULLIF(@vpremise_type,''),
hood_id = NULLIF(@vhood_id,''),
occurrence_time_id = NULLIF(@voccurrence_time_id,''),
reported_time_id = NULLIF(@vreported_time_id,''),
crime_id = NULLIF(@vcrime_id,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/CrimeEvents_2.csv'
INTO TABLE CrimeEvent FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS
(event_id,@vlatitude, @vlongitude,@vpremise_type,@vhood_id,@voccurrence_time_id,@vreported_time_id,@vcrime_id)
SET
latitude = NULLIF(@vlatitude,''),
longitude = NULLIF(@vlongitude,''),
premise_type = NULLIF(@vpremise_type,''),
hood_id = NULLIF(@vhood_id,''),
occurrence_time_id = NULLIF(@voccurrence_time_id,''),
reported_time_id = NULLIF(@vreported_time_id,''),
crime_id = NULLIF(@vcrime_id,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/BikeThefts.csv'
INTO TABLE BikeTheft FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS
(event_id,@vmake,@vmodel,@vbike_type,@vcolour,@vspeed,@vcost,@vstatus)
SET
make = NULLIF(@vmake,''),
model = NULLIF(@vmodel,''),
bike_type = NULLIF(@vbike_type,''),
colour = NULLIF(@vcolour,''),
speed = NULLIF(@vspeed,''),
cost = NULLIF(@vcost,''),
status = NULLIF(@vstatus,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/roadCondition.csv'
INTO TABLE RoadCondition FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(road_condition_id,@vclassification,@vtraffic_control_type,@vvisibility,@vsurface_condition)
SET
classification = NULLIF(@vclassification,''),
traffic_control_type = NULLIF(@vtraffic_control_type,''),
visibility = NULLIF(@vvisibility,''),
surface_condition = NULLIF(@vsurface_condition,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/trafficEvent.csv'
INTO TABLE TrafficEvent FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS
(accident_id,@voccurrence_time_id,@vroad_condition_id,@vhood_id,@vlatitude,@vlongitude)
SET
occurrence_time_id = NULLIF(@voccurrence_time_id,''),
road_condition_id = NULLIF(@vroad_condition_id,''),
hood_id = NULLIF(@vhood_id,''),
latitude = NULLIF(@vlatitude,''),
longitude = NULLIF(@vlongitude,'')
;

LOAD DATA INFILE '/var/lib/mysql-files/InvolvedPerson.csv'
INTO TABLE InvolvedPerson FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(accident_id,person_id,@vinvolvement_type,@vage,@vinjury,@vvehicle_type,@vaction_taken)
SET
involvement_type = NULLIF(@vinvolvement_type,''),
age = NULLIF(@vage,''),
injury = NULLIF(@vinjury,''),
vehicle_type = NULLIF(@vvehicle_type,''),
action_taken = NULLIF(@vaction_taken,'')
;




