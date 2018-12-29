const yargs = require('yargs');

const geocode = require('./geocode');
const darksky = require('./darksky');

const argv = yargs
  .options({
    address: {
      describe: 'Address to fetch weather for',
      demand: true,
      alias: 'a',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address)
  .then(res => {
    console.log(res.address);
    return darksky.darkskyTemperature(res.latitude, res.longitude);
  })
  .then(res => {
    console.log(` Temperature: ${res}°C`);
  })
  .catch(rej => {
    console.log(rej);
  });