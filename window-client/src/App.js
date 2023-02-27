import './assets/App.css';
import React, { useState, useEffect } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import io from 'socket.io-client';

// change to current IP address
const server_ip = "http://10.38.4.110:3000";
const socket = io.connect(server_ip);
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {
  const [config, setConfig] = useState({'dim': false, 'ui': true, 'brightness': 0});
  const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

  const updateDim = (dim) => {
    const bool = dim === 'dim' ? true : false;
    setConfig({...config, 'dim': bool});
  }

  useEffect(() => {
    const doDim = async () => {
      // TODO: make undim/dim from current brightness
      const brightness = config.brightness*10;

      if (config.dim === true) {
        for (let i = 1; i < 11; i++) {
          updateBrightness(i*10);
          await delay(100);
        }
      } else {
        for (let i = 11; i >= 0; i--) {
          updateBrightness(i*10);
          await delay(100);
        }
      }
    }

    doDim().catch(console.error);
  }, [config.dim]);

  const updateUI = () => {
    setConfig({...config, 'ui': !config.ui});
  }

  const updateBrightness = (brightness) => {
    setConfig({...config, 'brightness': brightness/100});
  }

  // send config to server
  useEffect(() => {
    socket.emit('config-update', config);
    // debug
    // console.log(config);
  }, [config]);

  // get config from server
  // useEffect(() => {
  //   socket.on('config-update', (data) => {
  //     console.log(data);
  //     setConfig(data);
  //   });
  // }, []);

  return (
    <div className="container">
      <h1>Window OS Client</h1>
      <h3>Version 1.0.0</h3>
      <div className='content'>
        <div className='row'>
          <button onClick={() => updateDim('dim')} disabled={config.dim}>Dim Window</button>
          <button onClick={() => updateDim('undim')} disabled={!config.dim}>Undim Window</button>
        </div>
        <div className='row'>
          <button onClick={() => updateUI()}>Toggle UI</button>
        </div>
        <div className='row'>
          <div className='form-group'>
            <h4 style={{marginBottom: '.5rem'}}>Window Brightness</h4>
            <Slider  min={0} max={100} onChange={updateBrightness} value={config.brightness*100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
