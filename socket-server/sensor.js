const gpio = require('onoff').Gpio;

const tempSensor = new gpio(17, 'in', 'both');
const lightSensor = new gpio(27, 'in', 'both');

tempSensor.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log(`The tempature sensor value is ${value}`);
});

lightSensor.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log(`The tempature sensor value is ${value}`);
});
  
function unexportOnClose() { //function to run when exiting program
  tempSensor.unexport(); // Unexport Button GPIO to free resources
  lightSensor.unexport(); // Unexport Button GPIO to free resources
};
  
process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c