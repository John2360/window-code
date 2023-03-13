const pathName = '/dev/ttyACM0';
const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({ 'path': pathName,  'baudRate': 9600 })
const parser = new ReadlineParser()
port.pipe(parser)
parser.on('data', console.log)