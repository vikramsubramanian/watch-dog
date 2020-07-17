# WatchDog Back End

WatchDog is a crime data application.

## Running Locally

Note: You will need to create a .env file with the database parameters.

### API Endpoints available:

## GET Requests

- List of crime events (can filter by MCI, and/or date)
  - `/crime-events/table/`
- Total number of crime events for each crime indicator (can filter by MCI, and/or date)
  - `/crime-events/summary`
- List of crime locations (lat and long) (can filter by MCI, and/or date)
  - `/crime-events/map/`
- List of bike thefts (special case of crime events)
  - `/crime-events/bike-thefts/`
- List of traffic events
  - `/traffic-events/`
- List of neighbourhoods
  - `/neighbourhoods/`
- List of crime indicators
  - `/regular-crimes/`

## POST Requests

- Report a crime
  - Expects a JSON object with each column of CrimeEvent and, the columns for IncidentTime
  - `/report-crime/`
