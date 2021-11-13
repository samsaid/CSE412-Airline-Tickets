//This file creates a web server which runs on port 3001 default
//  Heroku will set this port value to connect to the database

const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

//if react (front end) makes a GET request to this port
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//backend is listening is front end has made a request
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
