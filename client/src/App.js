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

  function sayHello() {
    alert('You clicked me!');
  }


  return (

    <div className="App">

      <div class="cap">
        {/*
      <div style={{ fontFamily: "Circular,Arial,sans-serif", fontWeight:700, color: 'black', textAlign: 'left', fontSize: 50 }}>Flight Booking Simulator</div>
      */
        }

      </div>


      <div class="parallax" style={{ fontFamily: "Lucida Sans ", color: 'white', textAlign: 'left', fontSize: 45, fontWeight: 700, padding: 15 }}> Flight Booking Simulator</div>

      <div style={{ height: 400, fontSize: 20, backgroundColor: 'white' }}>


        {/*
          <img
            src="https://www.pngkey.com/png/full/14-144708_vector-transparent-download-airplane-vacation-clipart-globe-with.png" align="left" width=" 234 " height="199.8 "

          />
          */
        }
        <div class="container">


          <div id="col" >


            <button class="button" onClick={sayHello}>Button</button>

            <select >
              <option class="textinput" placeholder="Comment">Trip Type</option>

              <option value="option 1"> Option 1 </option>
              <option value="option 2"> Option 2 </option>

            </select>

            <select >
              <option class="textinput" placeholder="Comment">Trip Type</option>

              <option value="option 1"> Option 1 </option>
              <option value="option 2"> Option 2 </option>

            </select>

            <select >
              <option class="textinput" placeholder="Comment">Trip Type</option>

              <option value="option 1"> Option 1 </option>
              <option value="option 2"> Option 2 </option>

            </select>
          </div>





          <div id="textbox1">
            <form >


              <label style={{ fontFamily: "Circular,Arial,sans-serif,", fontWeight: 700 }}> Travel Dates:
                <input type="text" style={{ padding: 12 }} />
              </label>
            </form>
          </div>


          <div id="textbox2">
            <form>

              <label style={{ fontFamily: "Circular,Arial,sans-serif,", fontWeight: 700 }}>Departing From:
                <input type="text" style={{ padding: 12 }} />
              </label>
            </form>
          </div>

          <div id="textbox3">
            <form>

              <label style={{ fontFamily: "Circular,Arial,sans-serif,", fontWeight: 700 }}>Departing From:
                <input type="text" style={{ padding: 12 }} />
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
