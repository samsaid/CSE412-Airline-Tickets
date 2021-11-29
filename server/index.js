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

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//backend is listening is front end has made a request
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

pool.query(`SELECT * FROM Airport;`, (err, res) => {
  if (err) {
      console.log("Error - Failed to select all from Users");
      console.log(err);
  }
  else{
      console.log(res.rows);
      console.log(process.env.DATABASE_URL);
  }
});

app.get('/getAirports', (req, res) => {
  try{
    let results = pool.query(`SELECT * FROM Airport;`);
    return results.rows;
  }
  catch(error){
    console.log(error);
  }
})
