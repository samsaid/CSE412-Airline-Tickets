# CSE412-Airline-Tickets
## Table of Contents  
- [1. About the Project](#about-the-project)
    - [1.1. ER Diagram](#er-diagram)
    - [1.2. System Architechture](#system-architechture)
- [2. Tools](#tools)
- [3. Getting Started](#getting-started)
    - [3.1. Development Environment](#development-environment)  
        - [3.1.1. Push Changes to Github](#push-changes-to-github)
        - [3.1.2. Push Changes to Heroku Application](#push-changes-to-heroku-application)  
            
## About the Project
Airline Tickets is supported on Linux, macOS, and Windows. This application

### ER Diagram
Database Entity-Relationship Diagram
![System Overview](/images/er-diagram.png)

### System Architechture
System Overview of Application
![System Overview](/images/system-overview.png)

## Tools
- Visual Studio Code
- React
- Node.js
- Heroku PostgresSQL Database
- Languages: JavaScript, HTML, SQL

## Getting Started  
### Development Enviornment
**1.** Clone the project repository 
```
git clone https://github.com/samsaid/CSE412-Airline-Tickets.git
```
**2.** Enter project repository and access database with Heroku
```
cd CSE412-Airline-Tickets
heroku login
heroku pg : psql
```
The last command will start the database server. Here you can begin to perform SQL queries such as adding tables, deleting rows, etc.

***Note:*** The database settings are set to update automatically upon any edits made. No need to manually push changes to Heroku for database changes.  

**3.** Exit database server and start running the application. In a command line window, locate to project folder and start back end server.
```
\q
cd /CSE412-Airline-Tickets
npm start
```
**4.** In a seperate command line window, locate to client folder (this is the front end) and start the server
```
cd /CSE412-Airline-Tickets/client
npm start
```
**5.** In a few seconds, a web page should open on your default browser at "http://localhost:3000"  
**6.** Now you can begin development. To begin developing on the front end, open VS Code and locate to client/src/App.js
#### Push Changes to Github
Once you have made changes, use these commands in the project folder /CSE412-Airline-Tickets/. These commands must be done in order to complete the entire process of saving the changes from your local environment to the main branch.

The following commands will update the project on all files changed. Alternative: "git add < filename >" for a specific file only:
``` 
git add .
git commit -m "enter message here"
git push                        
```
#### Push Changes to Heroku Application  
Application is currently deployed with Heroku. In order to reflect changes on web link:  
**1.** Verify the branch you're on:
```
git branch
```
**2.** Switch to Heroku application branch and push changes to the deployed app.
```
git checkout masterbranch
git push heroku main
```  
Web page should now be updated. 