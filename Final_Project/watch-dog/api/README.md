# WatchDog API

# WatchDog Back End

WatchDog is an interactive, crime data web application.

## Running Locally

Note: You will need to create a .env file with the database parameters.

### API Endpoints available:

## GET Requests

### General

- List of neighbourhoods
  - `/neighbourhoods/`
- List of Police Divisions
  - `/police-divisions/`
- List of crime indicators
  - `/regular-crimes/`

Can filter the following by date, neighbourhood, and/or police division

### Crimes

Can also filter all of these by MCI

- List of crime events
  - `/crime-events/table/`
- Summary of number of crime events per MCI
  - `/crime-events/summary/MCI`
- Summary of number of crime events per premise type
  - `/crime-events/summary/premise`
- List of crime locations (lat and long)
  - `/crime-events/map/`
- Summary of number of crime events by police division
  - `/crime-events/summary/police-division`
- Summary of crime events per month (if year supplied as timeType) or per day (if month supplied as timeType)
  - `/crime-events/summary/time`
- Summary of crime events per date (month, day, and hour)
  - `/crime-events/heatmap/year`

### Bike Thefts

- List of bike thefts
  - `/crime-events/bike-thefts/table/`
- Summary of number of bike thefts per bike type (can filter by bike type)
  - `/crime-events/bike-thefts/summary/type`
- Summary of number of bike thefts per bike status (can filter by bike status)
  - `/crime-events/bike-thefts/summary/status`
- List of bike theft locations (lat and long)
  - `/crime-events/bike-thefts/map/`
- Summary of number of bike thefts by police division
  - `/crime-events/bike-thefts/summary/police-division`
- Summary of bike thefts per month (if year supplied as timeType) or per day (if month supplied as timeType)
  - `/crime-events/bike-thefts/summary/time`
- Summary of bike thefts per date (month, day, and hour)
  - `/crime-events/bike-thefts/heatmap/year`

### Traffic Accidents

- List of traffic accidents
  - `/traffic-events/table/`
- Summary of number of traffic accidents per RoadCondition column (classification, visibility, surface_condition)
  - `/traffic-events/summary/road/:cat`
- Summary of number of traffic accidents per InvolvedPerson involvement_type
  - `/traffic-events/summary/type`
- List of traffic accidents locations (lat and long)
  - `/traffic-events/map/`
- Summary of number of traffic accidents by police division
  - `/traffic-events/summary/police-division`
- Summary of traffic accidents per month (if year supplied as timeType) or per day (if month supplied as timeType)
  - `/traffic-events/summary/time`
- Summary of traffic accidents per date (month, day, and hour)
  - `/traffic-events/heatmap/year`

### Predefined Question

- Predefined question & answer queries (see `questions.js`)
  - `/question/:questionNum`

## POST Requests

- Report a crime
  - Expects a JSON object with each column of CrimeEvent and, the columns for IncidentTime
  - `/report-crime/`
