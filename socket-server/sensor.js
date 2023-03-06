const gpio = require('rpi-gpio');

// Set up the GPIO pin connected to the temperature sensor
const sensorPin = 17; // Change this to the GPIO pin number that your sensor is connected to
gpio.setMode(gpio.MODE_BCM);

gpio.setup(sensorPin, gpio.DIR_IN, gpio.EDGE_BOTH, (err) => {
  if (err) {
    throw err;
  }
  console.log('Temperature sensor pin set up');
});

// Define a function to handle changes in the sensor input
function onSensorChange(err, value) {
  if (err) {
    throw err;
  }
  console.log('Temperature sensor value changed to:', value);
  // TODO: Perform temperature conversion/calculations on the sensor value here
}

// Add a listener for changes in the sensor input
gpio.on('change', onSensorChange);

// Optional: Set up a periodic timer to read the sensor input at regular intervals
const readIntervalMs = 1000; // Change this to set the desired interval for reading the sensor
setInterval(() => {
  gpio.read(sensorPin, (err, value) => {
    if (err) {
      throw err;
    }
    console.log('Current temperature sensor value:', value);
    // TODO: Perform temperature conversion/calculations on the sensor value here
  });
}, readIntervalMs);


// const tempSensor = new gpio(17, 'in', 'both');
// const lightSensor = new gpio(27, 'in', 'both');