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

      <div class="cap">
        {/*
      <div style={{ fontFamily: "Circular,Arial,sans-serif", fontWeight:700, color: 'black', textAlign: 'left', fontSize: 50 }}>Flight Booking Simulator</div>
      */
        }

      </div>

      <div class="parallax" style={{ fontFamily: "Circular,Arial,sans-serif", fontWeight: 700, color: 'black', textAlign: 'left', fontSize: 55 }}> Flight Booking Simulator</div>

      <div style={{ height: 300, fontSize: 20, backgroundColor: '#fafbfc' }}>

        {/*
          <img
            src="https://www.pngkey.com/png/full/14-144708_vector-transparent-download-airplane-vacation-clipart-globe-with.png" align="left" width=" 234 " height="199.8 "

          />
          */
        }
        <div class="container">

          <div id="col" >
            <select >
              <option class="textinput" placeholder="Comment">Trip Type</option>

              <option value="option 1"> Option 1 </option>
              <option value="option 2"> Option 2 </option>

            </select>
          </div>

          <div id="textbox1">
            <form >


              <label>Departing From:
                <input type="text" />
              </label>
            </form>
          </div>


          <div id="textbox2">
            <form>

              <label >Departing From:
                <input type="text" />
              </label>
            </form>
          </div>


        </div>
      </div>

      <div class="bg2">


      </div>

    </div>
  );
}




export default App;
