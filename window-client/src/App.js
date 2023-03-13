import './assets/App.css';
import React, { useState, useEffect } from 'react';

import Slider, {SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

import io from 'socket.io-client';

// change to current IP address
const server_ip = "http://10.38.56.84:3000";
const socket = io.connect(server_ip);
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

// tempature slider
const marks = {
  50: '50 F',
  55: '55 F',
  60: '60 F',
  65: '65 F',
  70: '70 F',
  75: '75 F',
  80: '80 F',
  85: '85 F',
  90: '90 F',
};

function App() {
  const [config, setConfig] = useState({'dim': false, 'ui': true, 'brightness': 0, 'temperature': {'current': 69, 'target': 70}});
  const [sensorData, setSensorData] = useState({'temperature': 0, 'light': 0});
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

  useEffect(() => {
    const doTemp = async () => {
      const temp = config.temperature.target;

      // logic to change temperature
    }

    doTemp().catch(console.error);
  }, [config.temperature.target]);



  const updateUI = () => {
    setConfig({...config, 'ui': !config.ui});
  }

  const updateBrightness = (brightness) => {
    setConfig({...config, 'brightness': brightness/100});
  }

  const updateTemperature = (temperature) => {
    setConfig({...config, 'temperature': {'current': config.temperature.current, 'target': temperature}});
  }

  // send config to server
  useEffect(() => {
    socket.emit('config-update', config);
    // debug
    // console.log(config);
  }, [config]);

  // receive sensor data from server
  useEffect(() => {
    socket.on('sensor-update', (data) => {
      setSensorData(data);
    });
    }, []);

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
        <div className='row'>
          <div className='form-group'>
            <h4 style={{marginBottom: '.5rem'}}>Room Brightness</h4>
            <Slider  min={0} max={1000} value={sensorData.light} />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <h4 style={{marginBottom: '.5rem'}}>Passive Temperature (Current Temperature: {sensorData.temperature} F&#176;)</h4>
            <di className='row'>
              <Slider defaultValue={config.temperature.target} min={32} max={110} marks={marks} onChange={updateTemperature} value={config.temperature.target} />
            </di>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
