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
      
      <h1 style={{ fontFamily: "Verdana", color: 'black', textAlign: 'left', fontSize: 36 }}>Flight Booking Simulator</h1>
      <div class="parallax"></div>
      <div style={{ height: 50, fontSize: 36 }}>sddsd</div>
     
      <img
        src="https://www.pngkey.com/png/full/14-144708_vector-transparent-download-airplane-vacation-clipart-globe-with.png" align="left" width=" 234 " height="199.8 "

      />
      <select >
        <option selected value="coconut">
          Trip Type
        </option>
        <option value="option 1"> Option 1 </option>
        <option value="option 2"> Option 2 </option>

      </select>

      <form style={{ padding: 20, justifyContent: 'space-between' }}>

        <label>Departing From:
          <input type="text" />
        </label>
      </form>

      <form>

        <label style={{ padding: 20 }}>Departing From:
          <input type="text" />
        </label>
      </form>




    </div>
  );
}




export default App;
