import React from 'react'
import logo from './logo.svg';
import './App.css';


function App() {
  const [data, setData] = React.useState(null);
  //HTTP request from react to Node..if data is not read yet then Loading will display
  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <h1>
        Flight Booking Simulator</h1>
      <select>
        <option selected value="coconut">
          Trip Type
        </option>
        <option value="option 1"> Option 1 </option>
        <option value="option 2"> Option 2 </option>

      </select>

      <select>
        <option selected value="coconut">
          Departing From
        </option>
        <option value="option 1"> Option 1 </option>
        <option value="option 2"> Option 2 </option>

      </select>

      <select>
        <option selected value="coconut">
          Departing From
        </option>
        <option value="option 1"> Option 1 </option>
        <option value="option 2"> Option 2 </option>

      </select>


    </div>
  );
}




export default App;
