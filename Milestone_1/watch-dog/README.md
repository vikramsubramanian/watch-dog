# WatchDog Application

Live: https://watch-dog.azurewebsites.net/

## Tech Stack

- **Frontend**:
  - React
- **Backend**:
  - Node.js + Express.js
- **Database**:
  - MySQL - using SQL (Azure)
- **Deployment**:
  - Azure AppServices

## Context

The `api/` folder contains the source code for interacting with the database. The `client/` folder contains the frontend code used to generate the `public/` folder under `api/`.

The platform of our choice was Azure. Therefore, we used Azure SQL to host a MySQL database.

## Creating and loading the sample database:\*\*

- Connect to the SQL Server:
  - mysql --host watchdog348.mysql.database.azure.com --user warrior@watchdog348 -p
- Create the database by running the commands from createDatabase.sql.
- Load the sample database by running the commands from populateTables.sql

Make sure to update the .env file with your database parameters!

# Current Front End

- A question to query crime event data. Dropdowns for MCI and date year and month.
- The # of crime events are shown on a simple line chart.

# Current Back End

### API Endpoints available:

- List of crime events (can filter by MCI, and/or date)
  - `/crime-events/`
- List of bike thefts (special case of crime events)
  - `/crime-events/bike-thefts/`
- List of traffic events
  - `/traffic-events/`

(UPDATE: Hardcoded - Report a Crime)

- `/report-crime/`
