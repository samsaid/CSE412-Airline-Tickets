import React from 'react'
import Paper from "@material-ui/core/Paper";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import dateFormat from "dateformat";
import Image from "./logo.png"


const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }
 var flight_number_purchase; 
 var flight_capacity_purchase;
 var flight_price_purchased;


function App() {

  
  const [formData, setFormData] = React.useReducer(formReducer, {});
  const [submitting, setSubmitting] = React.useState(false);
  const [value, setValue] = React.useState(2);

  const [data, setData] = React.useState(null);
  //HTTP request from react to Node..if data is not read yet then Loading will display
  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [airports, setAirports] = React.useState([]);
  React.useEffect(() => {
    fetch('/getAirports')
      .then((res) => res.json())
      .then((airports) => setAirports(airports))
      .then(console.log(airports));
  }, []);

  const [flights, setFlights] = React.useState([]);
  React.useEffect(() => {
    fetch('/getFlights')
      .then((res) => res.json())
      .then((flights) => setFlights(flights))
      .then(console.log(flights));
  }, []);

  const [tickets, setTickets] = React.useState([]);
  React.useEffect(() => {
    fetch('/getTickets')
      .then((res) => res.json())
      .then((tickets) => setTickets(tickets))
      .then(console.log(tickets));
  }, []);

  const [customers, setCustomers] = React.useState([]);
  React.useEffect(() => {
    fetch('/getCustomers')
      .then((res) => res.json())
      .then((customers) => setCustomers(customers))
      .then(console.log(customers));
  }, []);

  const [schedule, setSchedule] = React.useState([]);
  React.useEffect(() => {
    fetch('/getSchedule')
      .then((res) => res.json())
      .then((schedule) => setSchedule(schedule))
      .then(console.log(schedule));
  }, []);
/*
  const [airportcode, setAirportCode] = React.useState([]);
  const searchTicketsGoingTo = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  }
*/
  /*React.useEffect(() => {
    fetch('/getTicketsToAirport', input)
      .then((res) => res.json())
      .then((airportcode) => setSchedule(airportcode))
      .then(console.log(airportcode));
  }, []);
*/
//TICKETS
//const [searchTicketsResults, setSearchTicketsResults] = React.useState([]);
/*
const searchTicketsToAirport = event => {
  event.preventDefault();
  setSubmitting(true);

  setTimeout(() => {
    setSubmitting(false);
  }, 3000)
  
  fetch('/searchTicketsToAirport')
      .then((res) => res.json())
      .then((searchTicketsResults) => setSearchTicketsResults(searchTicketsResults))
      .then(console.log(searchTicketsResults));

}
*/
//TICKETS GOING TO
const [searchStateAirportResults, setSearchStateAirportResults] = React.useState([]);

const searchStateAirport = event => {
  event.preventDefault();
  setSubmitting(true);

  setTimeout(() => {
    setSubmitting(false);
  }, 3000)
  
  fetch('/searchStateAirport?&state='+formData.state)
      .then((res) => res.json())
      .then((searchStateAirportResults) => setSearchStateAirportResults(searchStateAirportResults))
      .then(console.log(searchStateAirportResults));

      //resetInputFields();
}

//TICKETS GOING TO
  const [searchTicketsGoingToResults, setSearchTicketsGoingToResults] = React.useState([]);

  const searchTicketsGoingTo = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
    
    fetch('/searchTicketsToAirport?&depAirport='+formData.depAirport)
        .then((res) => res.json())
        .then((searchTicketsGoingToResults) => setSearchTicketsGoingToResults(searchTicketsGoingToResults))
        .then(console.log(searchTicketsGoingToResults));
    
        //resetInputFields();
  }

//SEARCH CUSTOMERS SCHEDULE
const [searchCustomerResults, setSearchCustomerResults] = React.useState([]);

const searchCustomerSchedule = event => {
  event.preventDefault();
  setSubmitting(true);

  setTimeout(() => {
    setSubmitting(false);
  }, 3000)
  
  fetch('/searchCustomerSchedule?&first_name='+formData.first_name+'&last_name='+formData.last_name)
      .then((res) => res.json())
      .then((searchCustomerResults) => setSearchCustomerResults(searchCustomerResults))
      .then(console.log(searchCustomerResults));

  //resetInputFields();
}


//FLIGHTS
  const [searchFlightResults, setSearchFlightResults] = React.useState([]);

  const searchFlights = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
    
    fetch('/searchFlights?&fromDate='+formData.fromDate+'&depAirport='+formData.depAirport+'&arrAirport='+formData.arrAirport)
        .then((res) => res.json())
        .then((searchFlightResults) => setSearchFlightResults(searchFlightResults))
        .then(console.log(searchFlightResults));

    //resetInputFields();
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    console.log(formData);
  }


  
  function showPurchaseModal(airline, flight_number, dep_date, dep_time, arr_date, arr_time, price_usd, flight_capacity){
    document.getElementById("id01").style.display="block";
    document.getElementById("flightInfo").innerHTML = flight_number;
    document.getElementById("airlineInfo").innerHTML = airline;
    document.getElementById("fromInfo").innerHTML = formData.depAirport;
    document.getElementById("depInfo").innerHTML = dateFormat(dep_date, "fullDate");
    document.getElementById("arrInfo").innerHTML = dateFormat(arr_date, "fullDate");
    document.getElementById("depTime").innerHTML = dep_time;
    document.getElementById("arrTime").innerHTML = arr_time;
    document.getElementById("toInfo").innerHTML = formData.arrAirport;
    document.getElementById("priceInfo").innerHTML = "$"+price_usd;
    flight_number_purchase = flight_number;
    flight_capacity_purchase = flight_capacity;
    flight_price_purchased = price_usd;
    console.log("1stFlight # = " + flight_number_purchase);
  console.log("1stFlight $ = " + flight_price_purchased);
  }


  const [submitPurchaseResults, setSubmitPurchaseResults] = React.useState();
  function submitPurchase(){
    console.log("2ndFlight # = " + flight_number_purchase);
  console.log("2ndFlight $ = " + flight_price_purchased);
    fetch('/purchaseTickets?&first_name='+formData.first_namePurchaser+'&last_name='+formData.last_namePurchaser+
    '&dob='+formData.dob_Purchaser+"&flight_number="+flight_number_purchase+"&flight_capacity="+flight_capacity_purchase+
    "&flight_price="+flight_price_purchased)
      .then((res) => res.json())
      .then((submitPurchaseResults) => setSubmitPurchaseResults(submitPurchaseResults))
      .then(console.log(submitPurchaseResults));

      //resetInputFields();

  }

  function purchaseTicket(seatsLeft, airline, flight_number, dep_date, dep_time, arr_date, arr_time, price_usd, flight_capacity){
    if(seatsLeft > 0){
      return(<button class="purchaseButton" id="purchaseButton" onClick={showPurchaseModal.bind(this,airline, flight_number, dep_date, dep_time, arr_date, arr_time, price_usd, flight_capacity)}>Purchase Ticket</button>);
    }
    else{
      return(<button disabled class="purchaseButton">Purchase Ticket</button>);
    }
  }

  function closeModal(){
    document.getElementById("id01").style.display="none";
  }

 

  let airportsToRender;
  if (airports) {
    airportsToRender = airports.map(item => {
      return (
        <tr key={item.airport_code}>
          <td>{ item.airport_code }</td>
          <td>{ item.airport_name }</td>
          <td>{ item.city}</td>
          <td>{ item.state }</td>
        </tr>
      );
    });
  }

  let flightsToRender;
  if (flights) {
    flightsToRender = [];
    flightsToRender = flights.map(item => {
      return (
        <tr>
          <td>{ item.flight_number }</td>
          <td>{ item.airline}</td>
          <td>{ item.origin_airport}</td>
          <td>{ item.origin_city }</td>
          <td>{ item.origin_state}</td>
          <td>{ item.origin_country}</td>
          <td>{ item.destination_airport}</td>
          <td>{ item.destination_city}</td>
          <td>{ item.destination_state}</td>
          <td>{ item.destination_country}</td>
          <td>{ dateFormat(item.dep_date, "fullDate")}</td>
          <td>{ item.dep_time}</td>
          <td>{ dateFormat(item.arr_date, "fullDate")}</td>
          <td>{ item.arr_time}</td>
          <td>{item.flight_capacity}</td>
          <td>{ item.seats_left }</td>
        </tr>
      );
    });
  }


  let customersToRender;
  if (customers) {
    customersToRender = customers.map(item => {
      return (
        <tr key={item.customer_id}>
          <td>{item.customer_id}</td>
          <td>{ item.first_name}</td>
          <td>{ item.last_name }</td>
          <td>{ item.dob}</td>
        </tr>
      );
    });
  }


  let ticketsToRender;
  if (tickets) {
    ticketsToRender = tickets.map(item => {
      return (
        <tr key={item.ticket_id}>
          <td>{ item.ticket_id }</td>
          <td>{ item.flight_number}</td>
          <td>${ item.price_usd}</td>
        </tr>
      );
    });
  }


  let scheduleToRender;
  if (schedule) {
    scheduleToRender = schedule.map(item => {
      return (
        <tr key={item.schedule_id}>
          <td>{item.schedule_id}</td>
          <td>{ item.ticket_id}</td>
          <td>{ item.flight_number}</td>
          <td>{ item.cust_id}</td>
        </tr>
      );
    });
  }

  return (

    <div className="App">
     
      <div style={{ height: 800, fontSize: 20, backgroundColor: 'white' }}>

        <div className="container">

          {/*Purchase Ticket Modal*/}
          <div id="id01" className="modal" style={{display:'none'}}>
            <span onClick={closeModal} className="close" title="Close Modal">&times;</span>
            <form className="modal-content" onSubmit={submitPurchase}>
              <div className="container">
                <h1>Purchase Ticket</h1>
                <h2>Flight Information</h2>
                <strong>Flight #: </strong><p id="flightInfo" name="flightNumber">blah</p>
                <strong>Airline: </strong><p id="airlineInfo">blah</p>
                <strong>From: </strong><p id="fromInfo">blah</p>
                <strong>To: </strong><p id="toInfo">blah</p>
                <strong>Departure: </strong><p id="depInfo">blah</p><p id="depTime"></p>
                <strong>Arrival: </strong><p id="arrInfo">blah</p><p id="arrTime"></p>
                <strong>Cost: </strong><p id="priceInfo">$blah</p>
                <label>
                  <b>First Name:  </b>
                  <input type="text" name="first_namePurchaser" onChange={handleChange} required/>
                </label> <p></p>
                <label>
                  <b>Last Name:  </b>
                  <input type="text" name="last_namePurchaser" onChange={handleChange} required/>
                </label>
                <label>
                  <b>Date of Birth:  </b>
                  <input type="date" name="dob_Purchaser" onChange={handleChange} required/>
                </label>
                <div class="clearfix">
                  <button type="button" class="cancelbtn" onClick={closeModal}>Cancel</button>
                  <button type="submit" class="deletebtn">Purchase Ticket</button>
                </div>
              </div>
            </form>
          </div>

        <div class="header">
        <img src={Image} alt="app logo"/>
        <h2>Flight Bookings - Group 25</h2>
        <h5>Anjali Singh, Christine Pascua, Kaitlyn Allen, Samira Said</h5>
        </div>
      <Paper square>
        <Tabs>
          <TabList>
          <Tab>View All Tables</Tab>
          <Tab>Search Flights</Tab>
          <Tab>Search Tickets</Tab>
          <Tab>Search Customers</Tab>
          <Tab>Search Airports</Tab>
          </TabList>
          
          <TabPanel>
            <h3>View All Tables</h3>
            <p>SQL Query: <code>SELECT * FROM [Flights/Airport/Customers/Schedule/Tickets]</code></p>
            <Tabs>
            <TabList>
              <Tab>Flights</Tab>
              <Tab>Airport</Tab>
              <Tab>Customers</Tab>
              <Tab>Schedule</Tab>
              <Tab>Tickets</Tab>
            </TabList>

            <TabPanel>
              <h5>Flights</h5>
              <table class="center">
      <thead>
        <tr>
          <th>Flight #</th>
          <th>Airline</th>
          <th>Origin Airport</th>
          <th>Origin City</th>
          <th>Origin State</th>
          <th>Origin Country</th>
          <th>Destination Airport</th>
          <th>Destination City</th>
          <th>Destination State</th>
          <th>Destination Country</th>
          <th>Departure Date</th>
          <th>Departure Time</th>
          <th>Arrival Date</th>
          <th>Arrival Time</th>
          <th>Flight Capacity</th>
          <th>Seats Left</th>
        </tr>
      </thead>
      <tbody>{flightsToRender}</tbody>
      </table>
            </TabPanel>


            <TabPanel>
              <h5>Airports</h5>
              <table class="center">
      <thead>
        <tr>
          <th>Airport Code</th>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>{airportsToRender}</tbody>
      </table>
            </TabPanel>


            <TabPanel>
              <h5>Customers</h5>
              <table class="center">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>D.O.B</th>
        </tr>
      </thead>
      <tbody>{customersToRender}</tbody>
      </table>
            </TabPanel>


            <TabPanel>
              <h5>Schedule</h5>
              <table class="center">
      <thead>
        <tr>
          <th>Schedule ID</th>
          <th>Ticket ID</th>
          <th>Flight #</th>
          <th>Customer ID</th>
        </tr>
      </thead>
      <tbody>{scheduleToRender}</tbody>
      </table>
            </TabPanel>


            <TabPanel>
              <h5>Tickets</h5>
              <table class="center">
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Flight #</th>
          <th>Price ($USD)</th>
        </tr>
      </thead>
      <tbody>{ticketsToRender}</tbody>
      </table>
            </TabPanel>

</Tabs>
        </TabPanel>


        <TabPanel>
          <h3>Search Flights</h3>
          <p>SQL Query: <code>SELECT DISTINCT Flight.*, Tickets.price_usd FROM Flight LEFT JOIN Tickets ON Tickets.flight_number=flight.flight_number WHERE dep_date='user input' AND origin_airport='user input' AND destination_airport='user input';</code></p>

         <form class="form-inline" onSubmit={searchFlights}>
      <fieldset class="form-inline">
        <legend>Enter Travel Information:</legend>
        <p>Use data from Flights table. For example, try: PHX to DEN on 1/7/2022</p>
         <label>
           <p>From</p>
           <input type="date" name="fromDate" min="2022-01-01" max="2025-21-01" onChange={handleChange}/>
         </label>
         <label>
           <p>Leaving</p>
           <select name="depAirport" onChange={handleChange} required>
             <option value="">--Please select an Airport--</option>
             <option value="ATL">ATL - Hartsfield-Jackson Atlanta International</option>
             <option value="AUS">AUS - Austin-Bergstrom International</option>
             <option value="BOS">BOS - Boston Logan International</option>
             <option value="BWI">BWI - Baltimore/Washington International Thrugood Marshall</option>
             <option value="DEN">DEN - Denver International</option>
             <option value="HNL">HNL - Daniel K. Inouye International</option>
             <option value="IAH">IAH - George Bush Intercontinental</option>
             <option value="JFK">JFK - John F. Kennedy International</option>
             <option value="LAX">LAX - Los Angeles International</option>
             <option value="MSP">MSP - Minneapolis-Saint Paul International</option>
             <option value="ORD">ORD - O'Hare International</option>
             <option value="PDX">PDX - Portaln International</option>
             <option value="PHI">PHI - Philadelphia International</option>
             <option value="PHX">PHX - Phoenix Sky Harbor International</option>
             <option value="SEA">SEA - Seattle-Tacoma International</option>
             <option value="SFO">SFO - San Francisco International</option>
             <option value="STL">STL - St. Louis Lambert International</option>
           </select>
         </label>
         <label>
           <p>Headed To</p>
           <select name="arrAirport" onChange={handleChange} required>
            <option value="">--Please choose an option--</option>
             <option value="ATL">ATL - Hartsfield-Jackson Atlanta International</option>
             <option value="AUS">AUS - Austin-Bergstrom International</option>
             <option value="BOS">BOS - Boston Logan International</option>
             <option value="BWI">BWI - Baltimore/Washington International Thrugood Marshall</option>
             <option value="DEN">DEN - Denver International</option>
             <option value="HNL">HNL - Daniel K. Inouye International</option>
             <option value="IAH">IAH - George Bush Intercontinental</option>
             <option value="JFK">JFK - John F. Kennedy International</option>
             <option value="LAX">LAX - Los Angeles International</option>
             <option value="MSP">MSP - Minneapolis-Saint Paul International</option>
             <option value="ORD">ORD - O'Hare International</option>
             <option value="PDX">PDX - Portaln International</option>
             <option value="PHI">PHI - Philadelphia International</option>
             <option value="PHX">PHX - Phoenix Sky Harbor International</option>
             <option value="SEA">SEA - Seattle-Tacoma International</option>
             <option value="SFO">SFO - San Francisco International</option>
             <option value="STL">STL - St. Louis Lambert International</option>
           </select>
         </label>
         <button type="submit">Search Flights</button>
       </fieldset>
       
       
      </form>

      <br/>
        {searchFlightResults.length===0 ? <h3>Sorry we don't have any flights avaliable for the information you selected. <br/>Please alter your search criteria.</h3>  :
        <div>
        <table class="center">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Trip</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Seats Left </th>
            <th>Price</th>
            <th>Purchase Ticket</th>
          </tr>
        </thead>
        <tbody> {searchFlightResults.map(item => {
      return (
        <tr>
          <td>{ item.airline}</td>
          <td><strong>{ item.origin_airport}</strong> to <strong>{ item.destination_airport}</strong> </td>
          <td>{ dateFormat(item.dep_date, "fullDate")}</td>
          <td>{ item.dep_time}</td>
          <td>{ dateFormat(item.arr_date, "fullDate")}</td>
          <td>{ item.arr_time}</td>
          <td> { item.seats_left}</td>
          <td>${ item.price_usd }</td>
          <td>{purchaseTicket(item.flight_capacity, item.airline, item.flight_number, item.dep_date,
            item.dep_time, item.arr_date, item.arr_time, item.price_usd, item.flight_capacity)}</td>
        </tr>
      );})}</tbody>
        </table>
        </div>}
        </TabPanel>


        <TabPanel>
           <h3>Search Tickets Arriving At an Airport</h3>
           <p>SQL Query: <code>SELECT * FROM Tickets JOIN Flight ON Tickets.flight_number = Flight.flight_number JOIN Airport ON Flight.destination_airport=Airport.airport_code WHERE Airport.airport_code='user input'</code></p>
          <form class="form-inline" onSubmit={searchTicketsGoingTo}> 
      <fieldset class="form-inline">
         <label>
         <p>Select an Airport</p>
           <select name="depAirport" onChange={handleChange}>
            <option value="">--Please choose an option--</option>
             <option value="ATL">ATL - Hartsfield-Jackson Atlanta International</option>
             <option value="AUS">AUS - Austin-Bergstrom International</option>
             <option value="BOS">BOS - Boston Logan International</option>
             <option value="BWI">BWI - Baltimore/Washington International Thrugood Marshall</option>
             <option value="DEN">DEN - Denver International</option>
             <option value="HNL">HNL - Daniel K. Inouye International</option>
             <option value="IAH">IAH - George Bush Intercontinental</option>
             <option value="JFK">JFK - John F. Kennedy International</option>
             <option value="LAX">LAX - Los Angeles International</option>
             <option value="MSP">MSP - Minneapolis-Saint Paul International</option>
             <option value="ORD">ORD - O'Hare International</option>
             <option value="PDX">PDX - Portaln International</option>
             <option value="PHI">PHI - Philadelphia International</option>
             <option value="PHX">PHX - Phoenix Sky Harbor International</option>
             <option value="SEA">SEA - Seattle-Tacoma International</option>
             <option value="SFO">SFO - San Francisco International</option>
             <option value="STL">STL - St. Louis Lambert International</option>
           </select>
         </label>
        </fieldset>
       <button type="submit">Search Tickets</button>
       
      </form>

      <br/>
        {!searchTicketsGoingToResults ? <p>No data found on your search criteria. Please try different values</p> :
        <div>
        <table class="center">
        <thead>
          <tr>
          <th>Ticket ID</th>
            <th>Airport Code</th>
            <th>Airport Name</th>
            <th>City</th>
            <th>State</th>
            <th>Flight Number</th>
            <th>Price USD</th>
          </tr>
        </thead>
        <tbody>{searchTicketsGoingToResults.map(item => {
      return (
        <tr>
           <td>{ item.ticket_id}</td>
          <td>{ item.airport_code}</td>
          <td>{ item.airport_name}</td>
          <td>{ item.destination_city}</td>
          <td>{ item.destination_state}</td>
          <td>{ item.flight_number}</td>
          <td>${ item.price_usd }</td>
        </tr>
      );})}</tbody>
        </table>
        </div>}
        </TabPanel>


        <TabPanel>
        <h3>Search a Customer's Schedule</h3> 
        <p>SQL Query: <code>SELECT * FROM Schedule JOIN Customers ON Schedule.cust_id=Customers.customer_id WHERE Customers.first_name='user input' AND Customers.last_name='user input';</code></p>
          <form class="form-inline" onSubmit={searchCustomerSchedule}> 
      <fieldset class="form-ineline">
         <label>
         <p><b>Enter a Customer's Name</b></p> <p>Use data from Customers table. For example, try: 'Eugene Sullivan' or 'Brian Bryant'. </p>
         <p>**Note: In the results, 2 tickets = round trip, 1 ticket = one way trip.</p>
         <label>
    <b>First Name:  </b>
    <input type="text" name="first_name" onChange={handleChange}/>
  </label> <p></p>
  <label>
    <b>Last Name:  </b>
    <input type="text" name="last_name" onChange={handleChange}/>
  </label>
         </label>
        </fieldset>
       <button type="submit">Search Customer</button>
      </form>

      <br/>
        {!searchCustomerResults ? <p>No data found on your search criteria. Please try different values</p> :
        <div>
        <table class="center">
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Ticket ID</th>
            <th>Flight Number</th>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>{searchCustomerResults.map(item => {
      return (
        <tr>
          <td>{ item.schedule_id}</td>
          <td>{ item.ticket_id}</td>
          <td>{ item.flight_number}</td>
          <td>{ item.customer_id}</td>
          <td>{ item.first_name}</td>
          <td>{ item.last_name}</td>
        </tr>
      );})}</tbody>
        </table>
        </div>}
        </TabPanel>


        <TabPanel>
           <h3>Search Airports located in a State</h3>
           <p>SQL Query: <code>SELECT * FROM Airport WHERE state='user input';</code></p>
          <form class="form-inline" onSubmit={searchStateAirport}> 
      <fieldset class="form-inline">
         <label>
         <p>Select a State</p>
           <select name="state" onChange={handleChange}>
	<option value="AZ">Arizona</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="IL">Illinois</option>
	<option value="MD">Maryland</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="NY">New York</option>
	<option value="OR">Oregon</option>
	<option value="TX">Texas</option>
	<option value="WA">Washington</option>
           </select>
         </label>
        </fieldset>
       <button type="submit">Search Airports</button>
       
      </form>

      <br/>
        {!searchStateAirportResults ? <p>No airports found in that state. Please try different value.</p> :
        <div>
        <table class="center">
        <thead>
          <tr>
            <th>Airport Code</th>
            <th>Airport Name</th>
            <th>City</th>
            <th>State</th>
            <th>US</th>
          </tr>
        </thead>
        <tbody>{searchStateAirportResults.map(item => {
      return (
        <tr>
          <td>{ item.airport_code}</td>
          <td>{ item.airport_name}</td>
          <td>{ item.city}</td>
          <td>{ item.state}</td>
          <td>{ item.country}</td>
        </tr>
      );})}</tbody>
        </table>
        </div>}
        </TabPanel>



        </Tabs>
        
      </Paper>
        
        </div>
        <br/>
        <footer>
          <p>Thank you for visitng our site! See our <a href="https://github.com/samsaid/CSE412-Airline-Tickets" target="_blank">Github Repo</a></p> 
        </footer>
      </div>
        
    </div>
  );
}




export default App;
