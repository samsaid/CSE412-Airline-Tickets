import React from 'react'
import logo from './logo.svg';
import Paper from "@material-ui/core/Paper";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './App.css';
import 'react-tabs/style/react-tabs.css';


const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

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


  const [searchFlightResults, setSearchFlightResults] = React.useState([]);

  const searchFlights = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
    
    fetch('/searchFlights?fromDate='+formData.fromDate+'&depAirport='+formData.depAirport+'&arrAirport='+formData.arrAirport)
        .then((res) => res.json())
        .then((searchFlightResults) => setSearchFlightResults(searchFlightResults))
        .then(console.log(searchFlightResults));
      
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    console.log(formData);
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
          <td>{ item.dep_date}</td>
          <td>{ item.dep_time}</td>
          <td>{ item.arr_date}</td>
          <td>{ item.arr_time}</td>
          <td>{ item.flight_capacity}</td>
          <td>{ item.state }</td>
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
          <td>{ item.price_usd}</td>
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

      <div class="cap">
        {/*
      <div style={{ fontFamily: "Circular,Arial,sans-serif", fontWeight:700, color: 'black', textAlign: 'left', fontSize: 50 }}>Flight Booking Simulator</div>
      */
        }

      </div>

      <div style={{ height: 800, fontSize: 20, backgroundColor: 'white' }}>


        {/*
          <img
            src="https://www.pngkey.com/png/full/14-144708_vector-transparent-download-airplane-vacation-clipart-globe-with.png" align="left" width=" 234 " height="199.8 "

          />
          */
        }
        <div class="container">

        <h2>Flight Booking Simulator - Group 25</h2>
        <h5>Anjali Singh, Christine Pascua, Kaitlyn Allen, Samira Said</h5>
      <Paper square>
        <Tabs>
          <TabList>
          <Tab>View All Tables</Tab>
          <Tab>Search Flights</Tab>
          <Tab>Search Tickets</Tab>
          <Tab>Search People</Tab>
          <Tab>Search Airports</Tab>
          </TabList>
          
          <TabPanel>
            <h3>View All Tables</h3>
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
         <form class="form-inline" onSubmit={searchFlights}>
      <fieldset class="form-inline">
        <legend>Travel Information:</legend>
         <label>
           <p>From</p>
           <input type="date" name="fromDate" min="2022-01-01" max="2025-21-01" onChange={handleChange}/>
         </label>
         <label>
           <p>Leaving</p>
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
         <label>
           <p>Headed To</p>
           <select name="arrAirport" onChange={handleChange}>
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
       <button type="submit">Search Flights</button>
      </form>

      <br/>
        {!searchFlightResults ? <p>No data found on your search criteria. Please try different values</p> :
        <div>
        <table class="center">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Trip</th>
            <th>Departure Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{searchFlightResults.map(item => {
      return (
        <tr>
          <td>{ item.airline}</td>
          <td><strong>{ item.origin_airport}</strong> to <strong>{ item.destination_airport}</strong> </td>
          <td>{ item.dep_time}</td>
          <td>{ item.arr_date}</td>
          <td>{ item.arr_time}</td>
          <td>${ item.price_usd }</td>
        </tr>
      );
        })}
        </tbody>
        </table>
        </div>}
        </TabPanel>


        <TabPanel>
          3rdd component
        </TabPanel>


        <TabPanel>
          4th component
        </TabPanel>


        <TabPanel>
          5th component
        </TabPanel>


        </Tabs>
        
      </Paper>
        
        </div>
      </div>

    </div>
  );
}




export default App;
