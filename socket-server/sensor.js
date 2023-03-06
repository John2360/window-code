const rpio = require('rpio');

// Set up the pin number to read from
//const TEMP = 11;
//const LIGHT = 13;
const TEMP = 17;
const LIGHT = 27;

// Initialize the GPIO library
rpio.init({mapping: 'gpio'});

// Set the pin to input mode
rpio.open(TEMP, rpio.INPUT);
rpio.open(LIGHT, rpio.INPUT);


// Read the pin value
const valueTemp = rpio.read(TEMP);
const valueLight = rpio.read(LIGHT);


// Print the sensor value to the console
while (true) {
    console.log(`Sensor value light: ${valueLight}`);
    console.log(`Sensor value temp: ${valueTemp}`);
}

// Clean up the GPIO library
rpio.close(TEMP);
rpio.close(LIGHT);