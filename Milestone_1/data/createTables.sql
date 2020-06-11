CREATE TABLE Crime
  ( 
    crimeID  INT NOT NULL PRIMARY KEY, 
    offence    VARCHAR(50), 
    MCI    VARCHAR(10)
  ); 

CREATE TABLE LocationTable 
  ( 
    locationID         INT NOT NULL PRIMARY KEY, 
     premisetype       VARCHAR(10), 
     division          VARCHAR(3), 
     hoodID            INT,
     neighbourhood     VARCHAR(30),  
     long              DECIMAL(9, 7), 
     lat               DECIMAL(9, 7), 
  ); 

CREATE TABLE TimeTable 
  ( 
    timeID                   INT NOT NULL PRIMARY KEY, 
     occurrenceHour          INT,
     occurrenceDay           INT,
     occurrenceMonth         VARCHAR(20), 
     occurrenceYear          INT, 
     occurrenceDayOfWeek     VARCHAR(30),  

  ); 

CREATE TABLE enrolled 
  ( 
     eventUniqueId  VARCHAR(14) NOT NULL PRIMARY KEY, 
     crimeID        INT
     locationID     INT
     timeID         INT
     FOREIGN KEY(crimeID) REFERENCES Crime(crimeID), 
     FOREIGN KEY(locationID) REFERENCES LocationTable(locationID), 
     FOREIGN KEY(timeID) REFERENCES TimeTable(timeID), 
  ); 
