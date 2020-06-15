# Description of the database


## Crime
    crimeID : Primary Key, int

    offence: string (involves some description as well)

    MCI: string (the overall class of crime. Note: Bike theft and homicide not included)
#
## Neighbourhood
    neighbourhoodID : Primary Key, int

    hoodID: int (every neighbiourhood as an ID)

    neighbourhood: String (name of ngbrhood and corresponds to Hood_ID)

    division: String (Police division) Foreign Key to table tablePoliceDivision

#
## Time

    timeID: Primary Key, int

    hour: int

    day: int

    month: String

    year: int

    dayOfWeek string


#
## tablePoliceDivision

    division: Primary Key, String

    address: String
    
    area: Some decimal, in sq km
    
    shapeLeng:  Some decimal, idk what this is, might be useful?

    shapeArea:  Some decimal, idk what this is, might be useful?




#
## Event

    eventUniqueId: Primary Key, String

    crimeID: Foreign Key to table Crime
    
    neighbourhoodID: Foreign Key to table Location
    
    timeID: Foreign Key to table Time

    reportedTimeID: Foreign Key to table Time
    
    long: float (Longitude)

    lat: float  (Latitude)

    premiseType: String (Commercial, house, outside, apartment etc)