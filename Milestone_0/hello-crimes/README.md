# Hello Crimes Application

Live: https://hello-crimes.appspot.com/

## Tech Stack
    - **Frontend**:
        - React
    - **Backend**:
        - Node.js + Express.js
    - **Database**:
        - MySQL - using CloudSQL (GCP)
    - **Deployment**:
        - GCP App Engine

## Context

The `api/` folder contains the source code for interacting with the database. The `client/` folder contains the frontend code used to generate the `public/` folder under `api/`.

The platform of our choice was GCP. Therefore, we used Cloud SQL to host a MySQL database.

To load the sample database:
    - Open GCP Console and select the project you’re working on.
    - Under this project, create a new database system instance. Go to SQL under STORAGE, and click CREATE INSTANCE.
    - Choose MySQL and create a MySQL Second Generation instance.
    - To load the sample database to MySQL on Cloud SQL (GCP), run the following SQL queries from Google Cloud Shell
    - `CREATE DATABASE crimes;`
    - `USE crimes;`
    - `CREATE TABLE robberies (offenceType VARCHAR(255), neighbourhood VARCHAR(255), eventId INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(eventId));`
    - `INSERT INTO robberies (offenceType, neighbourhood) values ("Robbery - Mugging", "Yorkdale-Glen Park");`
    - `INSERT INTO robberies (offenceType, neighbourhood) values ("Robbery - Swarming", "Yorkdale-Glen Park");`
    - `INSERT INTO robberies (offenceType, neighbourhood) values ("Robbery With Weapon", "York University Heights");`
    - `INSERT INTO robberies (offenceType, neighbourhood) values ("Robbery - Business", "New Toronto");`


Make sure to update the .env file with your database parameters.

# Current Front End
- A button to load the robberies from the database and show it in a table.

# Current Back End

### API Endpoints available:
- List of robberies
    - `/robberies/`
- Get robbery by event ID
    - `/robberies/eventId`