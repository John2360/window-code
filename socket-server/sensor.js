const io = require('socket.io-client');

// change to current IP address
const server_ip = "http://10.38.4.110:3000";
const socket = io.connect(server_ip);
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function handleUpdate(data) {
  const splitData = data.split(',');
  const temp = parseFloat(splitData[0]);
  const light = parseInt(splitData[1]);
  const update = {temperature: temp, light: light};
  console.log(update);
  socket.emit('config-update', update);
}

const pathName = '/dev/ttyACM0';
const { SerialPort, ReadlineParser } = require('serialport')

const port = new SerialPort({ 'path': pathName,  'baudRate': 9600 })
const parser = new ReadlineParser()
port.pipe(parser)
parser.on('data', handleUpdate)