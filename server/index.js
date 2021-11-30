//This file creates a web server which runs on port 3001 default
//  Heroku will set this port value to connect to the database
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const {Pool} = require('pg');
const pool = new Pool({
 connectionString: 'postgres://evzknmwaoazpmy:649ea57a0bc5060870c6e7c40ae05afa8794492aa58ec482eb168aa4d9c1f888@ec2-34-224-239-147.compute-1.amazonaws.com:5432/dbukho2ionepct',
 ssl: {
 rejectUnauthorized: false
 }
});

const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//if react (front end) makes a GET request to this port
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/getAirports', (req, res) => {
  let dataResults;
  pool.query(`SELECT * FROM Airport;`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

app.get('/getFlights', (req, res) => {
  let dataResults;
  pool.query(`SELECT * FROM Flight;`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

app.get('/getTickets', (req, res) => {
  let dataResults;
  pool.query(`SELECT * FROM Tickets;`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

app.get('/getCustomers', (req, res) => {
  let dataResults;
  pool.query(`SELECT * FROM Customers;`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

app.get('/getSchedule', (req, res) => {
  let dataResults;
  pool.query(`SELECT * FROM Schedule;`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

app.get('/getPeopleHeadedTo', (req, res) => {
  let dataResults;
  pool.query(`SELECT * FROM Schedule;`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

app.get('/getTicketsOnFlight', (req, res) => {
  let dataResults;
  pool.query(`SELECT ticket_id, price_usd FROM Tickets JOIN Flight ON Tickets.flight_number=Flight.flight_number JOIN Airport ON Flight.destination_airport=Airport.airport_code  WHERE Airport.airport_code=``${airport}``';`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        //console.log(dataResults);
        res.json(dataResults);
          
      }
    });
});

//SEARCH METHODS
app.get('/searchFlights', (req, res) => {
  const fromDate = req.query.fromDate;
  const depAirport = req.query.depAirport;
  const arrAirport = req.query.arrAirport;

  if(fromDate != 'undefined'){
  let dataResults;
  pool.query(`SELECT DISTINCT Flight.*, Tickets.price_usd FROM Flight LEFT JOIN Tickets ON Tickets.flight_number=flight.flight_number WHERE dep_date=$1 AND origin_airport=$2 AND destination_airport=$3;`,[fromDate, depAirport, arrAirport],
   (err, response) => {
      if (err) {
          console.log("Error - Failed to complete query");
          console.log(err);
      }
      else{
        console.log("req1");
        dataResults = response.rows;
        console.log(dataResults);
        res.json(dataResults);
          
      }
    });
  }

  else{
    pool.query(`SELECT DISTINCT Flight.*, Tickets.price_usd FROM Flight LEFT JOIN Tickets ON Tickets.flight_number=flight.flight_number WHERE origin_airport=$1 AND destination_airport=$2;`,[depAirport, arrAirport],
   (err, response) => {
      if (err) {
          console.log("Error - Failed to complete query");
          console.log(err);
      }
      else{
        console.log("req1");
        dataResults = response.rows;
        console.log(dataResults);
        res.json(dataResults);
          
      }
    });
  }
    
});



// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//backend is listening is front end has made a request
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


