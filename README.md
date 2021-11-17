# CSE412-Airline-Tickets
Final project for CSE 412

## Tools:
- VS Code
- Terminal
- Command line
- Heroku PostgresSQL Database
- React
- Node.js

## How to start database
Assuming you have access to the database and have initially logged into your Heroku account:
```
    cd CSE412-Airline-Tickets
    heroku pg : psql
```
This command will start the database server. Here you can begin to perform SQL queries such as adding tables, deleting rows, etc.
** Note: This database will update automatically upon any edits made. No need to manually push changes to Heroku.

## How to start application
1. In a command line window, locate to project folder and start back end server.
    ```
    cd /CSE412-Airline-Tickets
    npm start
    ```
2. In a seperate command line window, locate to client folder (this is the front end) and start the server
    ```
    cd /CSE412-Airline-Tickets/client
    npm start
    ```
3. In a few seconds, a web page should open on your default browser at "http://localhost:3000"

Done! Now you can begin development. :) To begin developing on the front end, open VS Code and locate to client/src/App.js

#### How to push changes made on the application
Once you have made changes, use these commands in the project folder /CSE412-Airline-Tickets/. These commands must be done in order to complete the entire process of saving the changes from your local environment to the desired branch.

- Add all files that were changed to staging area. Alternative: "git add < filename >" for a specific file only:
    ``` 
    git add .
    ```
- Save files in staging area with a brief message/summary of changes made:
    ```
    git commit -m "enter message here"
    ```
- Push your changes to the main branch:
    ```
    git push                        
    ```
