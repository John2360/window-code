import React, {useState, useEffect} from 'react';

import './assets/App.css';
import { BsCloudSnow } from 'react-icons/bs';

import io from 'socket.io-client';
const server_ip = "http://localhost:3000";
const socket = io.connect(server_ip);
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {
  const [config, setConfig] = useState({'dim': false, 'ui': true, 'brightness': 0, 'temperature': {'current': 69, 'target': 69}});
  const [sensorData, setSensorData] = useState({'temperature': 0, 'light': 0});
  

  // get config from server
  useEffect(() => {
    socket.on('config-update', (data) => {
      // debug
      // console.log(data);
      setConfig(data);
    });

    socket.on('sensor-update', (data) => {
      // debug
      // console.log(data);
      setSensorData(data);
    });
  }, []);


  return (
    <div className='dimmer' style={{backgroundColor: `rgba(0, 0, 0, ${config.brightness})`}}>
      <div className="App" >
        <div className='gui-display'>
          <div className='weather-wrapper' style={{'display': config.ui ? 'flex' : 'none'}}>
            <div className='weather-container'>
              <div className='weather-icon'>
                <BsCloudSnow style={{fontSize: 75}} />
              </div>
              <div className='weather-text'>
              <h2>31&#176;</h2>
              <p>Snow</p>
              </div>
            </div>
            <p>Inside Temperature {sensorData.temperature}&#176;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
