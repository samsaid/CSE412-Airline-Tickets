# CSE412-Airline-Tickets
Final project for CSE 412

## Tools:
- VS Code
- Terminal
- Command line
- Heroku Postgres Database

## How to start database
Assuming you have access to the database and have initially logged into your Heroku account:
```
    cd CSE412-Airline-Tickets
    heroku pg : psql
```
This command will start the database server. Here you can begin to perform SQL queries such as adding tables, deleting rows, etc.

## How to start application
1. Locate to project folder and start back end server
    ```
    cd /CSE412-Airline-Tickets
    npm start
    ```
2. Locate to client folder (this is the front end) and start the server
    ```
    cd /CSE412-Airline-Tickets/client
    npm start
    ```
3. In a few seconds, a web page should open on your default browser at "http://localhost:3000"

Done! Now you can begin development. :) To begin developing on the front end, locate to client/src/App.js