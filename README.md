# CSE412-Airline-Tickets
## Table of Contents  
- [1. About the Project](#about-the-project)
- [2. User Manual] (#user-manual)




    - [1.1. Tools](#tools)
    - [1.2. Database Schema](#database-schema)
        - [1.2.1. ER Diagram](#er-diagram)
        - [1.2.2. ER-to-Relational](#er-to-relational)
    - [1.3. System Architechture](#system-architechture)

- [3. Getting Started](#getting-started)
    - [2.1 Using the Application](#using-the-application)
    - [2.2. Development Environment](#development-environment)  
        - [2.2.1. Push Changes to Github](#push-changes-to-github)
        - [2.2.2. Push Changes to Heroku Application](#push-changes-to-heroku-application)

            
## About the Project
<p align="center" >
    <img src="/images/logo.png" alt="logo" width="400"/> 
</p>

flyts is a mock online flight booking search service inspired by Google Flights, with emphasis on the database.  

This repository contains the full stack web application and is connected to an external PostgresSQL database server. The purpose of this project is to demonstrate an understanding of a relational database management system for CSE 412: Database Management at Arizona State Univerity. 

![landing page](/images/firstpage.png)


![landing page](/images/tab1.png)
![landing page](/images/tab2.png)
![landing page](/images/tab3.png)

### Timeline
The project was completed during the Fall 2021 semester in three phases:  
- Phase I - Selecting a topic, researching development tools, and creating the project plan. By the end of this phase, our team designed the database system using an ER diagram to visualize how the database components interact.     
- Phase II - data collection, ER diagram modification, and creating the database. During this phase, the team updated the original database design as we collected data and reconsidered the relationships of entities. By the end of this phase, we used SQL DDL to convert the ER Diagram to a relational database with tables and relationships and inserted the data to the database.  
- Phase III included setting up our team development environment and creating the application which can make queries to the database. 

### Tools
The following tools were used for the development of this project:
- Visual Studio Code
- React
- Node.js
- JavaScript
- HTML/CSS
- Heroku PostgresSQL Database
- SQL

### User Manual
flytes is supported on all popular browsers, including Chrome, Firefox, Edge, and Internet Explorer 9 and above. Users can access the site via a preferred browser at www.flytes.com. Just kidding, users can access it at [cse-412.herokuapp.com](https://cse-412.herokuapp.com/).

flytes is a single-page application with 2 main components. The outer tabs on the first row "View All Tables", "Search Flights", "Search Tickets", "Search Customers", and "Search Airports" control the contents of the inner tab. Upon opening the site link, users begin at the "View all Tabs" which contains 5 tabs, each displaying the full contents of their designated tables using the command, ''' SELECT * FROM''' [insert table name] on the backend. 

View All Tabs:
![landing page](/images/firstpage.png)


### Database Schema
#### ER Diagram
The database created for this project is a relational database model contining 5 entities. As the topic of this project is an online flight searching service, we designed the following entities which interact with each other: Flights, Airport, Customers, Tickets, Schedule.

ER (Entity-Relationship) Diagram:
![ER Diagram](/images/er-diagram.png)

#### ER-to-Relational
To create the database system in PostgresSQL, the ER Digram was transformed relational database model using the following SQL data definition language (DDL).  

Flight table
```
CREATE TABLE Flight (
    flight_number INT,
    airline CHAR(30),
    origin_airport CHAR(3),
    origin_city CHAR(30),
    origin_state CHAR(2),
    origin_country CHAR(2),
    destination_airport CHAR(3),
    destination_city CHAR(30),
    destination_state CHAR(2),
    destination_country CHAR(2),
    dep_date DATE,
    arr_date DATE,
    dep_time TIME(0),
    arr_time TIME(0),
    flight_capacity INT,
    PRIMARY KEY (customer_id));
```
Airport table
```
CREATE TABLE Airport (
    airport_code CHAR(3),
    airport_name CHAR(60),
    city CHAR(15),
    state CHAR(2),
    country CHAR(2)
    PRIMARY KEY (airport_code));
```

Customer table
```
CREATE TABLE Customers(
    customer_id INT,
    first_name CHAR(30),
    last_name CHAR(30),
    dob DATE,
    PRIMARY KEY (customer_id));
```
Tickets table
```
CREATE TABLE Tickets(
    ticket_id INT,
    flight_number INT,
    price_usd DECIMAL(6,2),
    PRIMARY KEY (flight_number, ticket_id),
    FOREIGN KEY (flight_number) REFERENCES Flight(flight_number) );
```
Schedule table
```
CREATE TABLE Schedule(
    schedule_id INT,
    ticket_id INT,
    flight_number INT,
    cust_id INT,
    PRIMARY KEY (schedule_id, ticket_id, cust_id),
    FOREIGN KEY (flight_number, ticket_id) REFERENCES Tickets(flight_number, ticket_id),
    FOREIGN KEY (cust_id) REFERENCES Customers(customer_id));
```
### Database Server


### System Architechture
System Overview of Application
![System Overview](/images/system-overview.png)

### Development Enviornment
The following steps are only necessary for the project developers or users who are looking to implement a version of the project. To view/acces the live version of the appplication, see section on [using the application](#using-the-application).

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
heroku open
```  
Web page changes on "https://cse-412.herokuapp.com/" should now be displayed.
