//This file creates a web server which runs on port 3001 default
//  Heroku will set this port value to connect to the database
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const {Pool} = require('pg');
const { isBuffer, callbackify } = require('util');
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

app.get('/searchTickets', (req, res) => {
  let dataResults;
  pool.query(`SELECT ticket_id FROM Tickets`, (err, response) => {
      if (err) {
          console.log("Error - Failed to select all from Users");
          console.log(err);
      }
      else{
        dataResults = response.rows;
        console.log(dataResults);
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

//SEARCH METHODS
app.get('/searchTicketsToAirport', (req, res) => {
  //const toDate = req.query.toDate;
  const depAirport = req.query.depAirport;


  let dataResults;
  pool.query(`SELECT * FROM Tickets JOIN Flight ON Tickets.flight_number=Flight.flight_number JOIN Airport ON Flight.destination_airport=Airport.airport_code WHERE Airport.airport_code=$1;`,[depAirport],
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
    
});

app.get('/seatsLeft', (req, res) => {
  const flight_number = req.query.flight_number;

  let dataResults;
  pool.query('SELECT 25-COUNT(*) AS count FROM Schedule WHERE flight_number=$1', [flight_number],
  (err, response) => {
    if (err) {
      console.log("Error - Failed to complete query SEAT COUNT");
      console.log(err);
  }
  else{
    dataResults = response.rows[0].count;
    console.log("seat count => " +dataResults);
    res.json(dataResults);
    return dataResults;
      
  }

  });
});

app.get('/searchStateAirport', (req, res) => {
  //const toDate = req.query.toDate;
  const state = req.query.state;

  let dataResults;
  pool.query(`SELECT * FROM Airport WHERE state=$1;`,[state],
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
    
});
app.get('/searchCustomerSchedule', (req, res) => {
  //const toDate = req.query.toDate;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;

  let dataResults;
  pool.query(`SELECT * FROM Schedule JOIN Customers ON Schedule.cust_id=Customers.customer_id WHERE Customers.first_name=$1 AND Customers.last_name=$2;`,[first_name, last_name],
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
    
});

app.get('/purchaseTickets', (req,res) => {
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const dob = req.query.dob;
  const flight_number = req.query.flight_number;
  const flight_price = req.query.flight_price;

  console.log("First Name = " + first_name);
  console.log("Last Name = " + last_name);
  console.log("DOB = " + dob);
  console.log("Flight # = " + flight_number);
  console.log("Flight $ = " + flight_price);

  pool.query(`UPDATE Flight SET seats_left=seats_left-1 WHERE flight_number=$1;`,[flight_number],
   (err, response) => {
      if (err) {
          console.log("Error - Failed to complete query - UPDATE FLIGHTS");
          console.log(err);
          return;
      }
      else{
        console.log("UPDATE FLIGHTS");
        dataResults = response;
        console.log(dataResults);
        res.json(dataResults);
          
      }
    });

  pool.query(`INSERT INTO Customers (customer_id, first_name, last_name, dob) VALUES ((SELECT MAX(customer_id) FROM Customers)+1, $1, $2, $3)`,[first_name, last_name, dob],
   (err, response) => {
      if (err) {
          console.log("Error - Failed to complete query - INSERT CUSTOMER");
          console.log(err);
          return;
      }
      else{
        console.log("INSERT CUSTOMER");
        //dataResults = response;
        //console.log(dataResults);
        //res.json(dataResults);
          
      }
    });

    //not inserting anything into tickets because I have all of the tickets avaliable
    /*pool.query(`INSERT INTO Tickets (ticket_id, flight_number, price_usd) VALUES ((SELECT MAX(ticket_id)+1 FROM Tickets), $1, $2);`,[flight_number, flight_price],
   (err, response) => {
      if (err) {
          console.log("Error - Failed to complete query - INSERT TICKETS");
          console.log(err);
          return;
      }
      else{
        console.log("INSERT TICKET");
        ///dataResults = response;
        //console.log(dataResults);
        //res.json(dataResults);
          
      }
    });*/


    pool.query(`INSERT INTO Schedule (schedule_id, ticket_id, flight_number, cust_id) 
    VALUES ((SELECT MAX(schedule_id)+1 FROM Schedule), 
    (SELECT MIN(Tickets.ticket_id) FROM Tickets LEFT JOIN Schedule ON Tickets.ticket_id=Schedule.ticket_id WHERE Tickets.flight_number=$1 and schedule_id is null), 
    $1, (SELECT customer_id FROM Customers WHERE first_name=$2 AND last_name=$3 AND dob=$4)) 
    ON CONFLICT (ticket_id) DO NOTHING;`,[flight_number, first_name, last_name, dob],
   (err, response) => {
      if (err) {
          console.log("Error - Failed to complete query - INSERT SCHEDULE");
          console.log(err);
          return;
      }
      else{
        console.log("INSERT SCHEDULE");
        //dataResults = response;
        //console.log(dataResults);
        //res.json(dataResults);
          
      }
    });

    /*pool.getConnection(function (err, conn){
      if(err) return callback(err);
      
      conn.query(`UPDATE Flight SET flight_capacity= flight_capacity-1 WHERE flight_number=$1`,[flight_number],
      (err, response) => {
        if (err) {
          throw err;
        }
        else{
          console.log("UPDATE FLIGHTS");
          dataResults = response;
          console.log(dataResults);
          res.json(dataResults);

          conn.query(`INSERT INTO Customers (customer_id, first_name, last_name, dob) VALUES ((SELECT MAX(customer_id)+1 FROM Customers), $1, $2, $3) ON CONFLICT (customer_id) DO NOTHING`,[first_name, last_name, dob],
          (err, response) => {
            if (err) {
              throw err;
            }
            else{
              console.log("INSERT CUSTOMER");
              dataResults = response;
              console.log(dataResults);
              res.json(dataResults);

              conn.query(`INSERT INTO Tickets (ticket_id, flight_number, price_usd) VALUES ((SELECT MAX(ticket_id)+1 FROM Tickets), $1, $2) ON CONFLICT (ticket_id) DO NOTHING`,[flight_number, flight_price],
              (err, response) => {
                if (err) {
                  throw err;
                }
                else{
                  console.log("INSERT TICKET");
                  dataResults = response;
                  console.log(dataResults);
                  res.json(dataResults);

                  conn.query(`INSERT INTO Schedule (schedule_id, ticket_id, flight_number, cust_id) VALUES ((SELECT MAX(schedule_id)+1 FROM Schedule GROUP BY schedule_id), (SELECT ticket_id FROM Tickets WHERE flight_number=$1 and price_usd=$2), $1, (SELECT customer_id FROM Customers WHERE first_name=$3 AND last_name=$4 AND dob=$5)) ON CONFLICT (ticket_id) DO NOTHING`,[flight_number, flight_price, first_name, last_name, dob],
                  (err, response) => {
                    if (err) {
                      throw err;
                    }
                    else{
                      console.log("INSERT SCHEDULE");
                      dataResults = response;
                      console.log(dataResults);
                      res.json(dataResults);
                    }
                  });
          
                }
              });
            }
          });
        }
      });
    });*/


});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//backend is listening is front end has made a request
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


