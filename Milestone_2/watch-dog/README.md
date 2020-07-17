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

## Features Available So Far

- Filter crime and show results on a table
  - Front end: `client/src/TableCard.js`
  - Back end: `api/app.js`
- Display crime data in a bar chart
  - Front end: `client/src/BarChart.js`
  - Back end: `api/app.js`
- Display crime data in a line chart
  - Front end: `client/src/LineChart.js`
  - Back end: `api/app.js`
- Display crime data in a pie chart
  - Front end: `client/src/DoughnutChart.js`
  - Back end: `api/app.js`
- Display crime data in a summary card
  - Front end: `client/src/SummaryCard.js`
  - Back end: `api/app.js`
- Report a Crime Feature
  - User can report a crime using the bottom right report crime button
    - Front end: `client/src/ReportCrime.js`
    - Back end: `api/app.js`

Note: we have implemented the Map, but we had to switch from Google Maps to Mapbox due to API pricing and limit issues. Then, rendering is much different and is causing performance issues with over 10,000 points. Thus, it is currently disabled (as it needs a speed up). However, the code can be found under

- Display crime data in a map card
  - Front end: `client/src/MapCard.js`
  - Back end: `api/app.js`

## Creating and loading the sample database:\

- Connect to the SQL Server:
  - `mysql --host watchdog348.mysql.database.azure.com --user warrior@watchdog348 -p`
- Create the database by running the commands from createDatabase.sql.
- Create the tables by running the commands from createTables.sql.
- Load the sample database by running the commands from populateSample.sql

## Creating and loading the production database:

- The production dataset has already been generated and the corresponding .csv files can be found in the `data/` folder.
- To regenerate the data, you may use various versions (as needed) of the Jupyter Notebooks and Python scripts which are located in the `data/scripts` folder. THe scripts can be run on the raw data which can be found under the `data/source_data` folder.
- To load the production data, do the following (assuming you have already created the tables):
  - Connect to the SQL Server:
    - `mysql --host watchdog348.mysql.database.azure.com --user warrior@watchdog348 -p`
  - Load the csv by running the commands from populateProduction.sql.
    - NOTE: The path in the LOAD INFILE command may need to be changed according to where you place the CSVs.
- It should be noted, that there is also a filed called dump.sql provided in the `data/` folder which is a backup of the production data. In the case where you need to reset the DB, it can be easily done as follows:
  - Connect to the SQL Server:
    - `mysql --host watchdog348.mysql.database.azure.com --user warrior@watchdog348 -p`
  - Drop the tables by running the commands from dropTables.sql
  - Create new tables by running the commands from createTables.sql
  - Then, exit the SQL connection and run:
  - `mysql --host watchdog348.mysql.database.azure.com --user warrior@watchdog348 -p < dump.sql`

## Other notes:

- During tests on the production dataset, we have so far come up with 2 indexes that have sped up our queries. The timing mechanism that was used was the time returned by SQL.
  - To create the indexes, run the commands from createIndexes.sql
- Make sure to update the .env file with your database parameters and add the Mapbox API key!
