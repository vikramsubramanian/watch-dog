# WatchDog Back End

WatchDog is a crime data application.

## Running Locally

Note: You will need to create a .env file with the database parameters.

### API Endpoints available:

- List of crime events (can filter by MCI, and/or date)
  - `/crime-events/`
- List of bike thefts (special case of crime events)
  - `/crime-events/bike-thefts/`
- List of traffic events
  - `/traffic-events/`

(UPDATE: Hardcoded - Report a Crime)

- `/report-crime/`
