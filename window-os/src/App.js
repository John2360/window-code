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

  // get config from server
  useEffect(() => {
    socket.on('config-update', (data) => {
      // debug
      // console.log(data);
      setConfig(data);
    });
  }, []);


  return (
    <div className='dimmer' style={{backgroundColor: `rgba(0, 0, 0, ${config.brightness})`}}>
      <div className="App" >
        <div className='gui-display'>
          <div className='weather-container' style={{'display': config.ui ? 'flex' : 'none'}}>
            <div className='weather-icon'>
              <BsCloudSnow style={{fontSize: 75}} />
            </div>
            <div className='weather-text'>
            <h2>31&#176;</h2>
            <p>Snow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
