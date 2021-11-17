//This file creates a web server which runs on port 3001 default
//  Heroku will set this port value to connect to the database
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;

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
