const rpio = require('rpio');

// Set up the pin number to read from
const SENSOR_PIN = 12;

// Initialize the GPIO library
rpio.init({mapping: 'gpio'});

// Set the pin to input mode
rpio.open(SENSOR_PIN, rpio.INPUT);

// Read the pin value
const sensorValue = rpio.read(SENSOR_PIN);

// Print the sensor value to the console
console.log(`Sensor value: ${sensorValue}`);

// Clean up the GPIO library
rpio.close(SENSOR_PIN);