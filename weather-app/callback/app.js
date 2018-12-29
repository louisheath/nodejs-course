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

geocode.geocodeAddress(argv.address, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(results.address);
    
    darksky.darkskyTemperature(results.latitude, results.longitude, (error, temp) => {
      if (error) {
        console.log(error);
      } else {
        console.log(` Temperature: ${temp}°C`);
      }
    })
  }
});