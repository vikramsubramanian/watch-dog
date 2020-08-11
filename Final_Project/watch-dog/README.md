# WatchDog Application

Live: https://watch-dog.azurewebsites.net/

## Tech Stack

- **Frontend**:
  - React
    - Notalable NPM packages used include:
      - Semantic UI React library for UI components
      - Mapbox API for the maps
      - ChartJS and D3.js for the data presentation
      - ag-grid for the table
- **Backend**:
  - Node.js + Express.js
- **Database**:
  - MySQL - using SQL (Azure)
- **Deployment**:
  - Azure AppServices

## Context

The `api/` folder contains the source code for interacting with the database. The `client/` folder contains the frontend code used to generate the `public/` folder under `api/`.

The platform of our choice was Azure. Therefore, we used Azure SQL to host a MySQL database.

## Features Available

- Filter crime/bike thefts/traffic accidents and show results on a table
  - Front end: `client/src/components/cards/TableCard.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data in a bar chart
  - Front end:
    - `client/src/components/cards/BarChart.js`
    - `client/src/components/cards/VerticalBarChart.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data in a line chart
  - Front end: `client/src/components/cards/LineChart.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data in a pie chart
  - Front end: `client/src/components/cards/PieChart.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data in a summary card
  - Front end: `client/src/components/cards/SummaryCard.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data in a doughnut chart
  - Front end: `client/src/components/cards/DoughnutChart.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data on a heat map
  - Front end: `client/src/components/cards/HeatMap.js`
  - Back end: `api/app.js`
- Display crime/bike thefts/traffic accidents data on a map (clustered)
  - Front end: `client/src/components/cards/MapCard.js`
  - Back end: `api/app.js`
- Predefined complex queries in the form of question and answer
  - User can select a question from a dropdown of questions (currently 21 questions)
    - Front end:
      - `client/src/components/cards/Question.js`
      - `client/src/components/cards/PolarChart.js`
      - `client/src/components/cards/ScatterChart.js`
      - `client/src/components/cards/SingleTextCard.js`
      - `client/src/components/cards/StatisticCard.js`
    - Back end: `api/app.js`
- Provide users with information on the closest police division based on the address they provide us with
  - User can view a map and enter an address to get the closest police division
    - Front end: `client/src/components/cards/PDCard.js`
    - Back end: `api/app.js`
- Report a Crime Feature
  - User can report a crime using the bottom right report crime button
    - Front end: `client/src/components/ReportCrime.js`
    - Back end: `api/app.js`
- "How well do you know your city" feature - aka Batman mode
  - User can guess the total number of crimes and crimes per month/day
    - Front end: `client/src/components/Batman.js`
    - Back end: `api/app.js`

* Show users basic information
  - Front end:
    - `client/src/components/cards/TextCard.js`
    - `client/src/components/cards/WelcomeCard.js`
* Main page routing and setup
  - Front end:
    - `client/src/App.js`
    - `client/src/index.js`
    - `client/src/constants.js`

## Creating and loading the sample database:

- Connect to the SQL Server:
  - `mysql --host watchdog348.mysql.database.azure.com --user warrior@watchdog348 -p`
- Create the database by running the commands from createDatabase.sql.
- Create the tables by running the commands from createTables.sql.
- Load the sample database by running the commands from populateSample.sql

## Creating and loading the production database:

- The production dataset has already been generated and the corresponding .csv files can be found in the `data/` folder.
- To regenerate the data, you may use various versions (as needed) of the Jupyter Notebooks and Python scripts which are located in the `data/scripts` folder. The scripts can be run on the raw data which can be found under the `data/source_data` folder and more instructions can be found in the notebooks.
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

- During tests on the production dataset, we have so far come up with 5 indexes that have sped up our queries. The timing mechanism that was used was the time returned by SQL.
  - To create the indexes, run the commands from createIndexes.sql
- Make sure to update the .env file with your database parameters and add the Mapbox API key!
