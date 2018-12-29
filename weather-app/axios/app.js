const yargs = require('yargs');
const axios = require('axios');

const keys = require('./../keys');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=${keys.geocode}&location=${encodedAddress}`;

axios.get(geocodeUrl)
  .then(response => {
    if (response.data.results[0].locations.length !== 1) {
      throw new Error('determined location too vague');
    }

    const location = response.data.results[0].locations[0];
    const address = `${location.street} ${location.adminArea5} ${location.adminArea4} ${location.adminArea1}`;
    const lat = location.latLng.lat;
    const lng = location.latLng.lng;
    console.log(address);

    const darkskyUrl = `https://api.darksky.net/forecast/${keys.darksky}/${lat},${lng}`;
    return axios.get(darkskyUrl);
  })
  .then(response => {
    if (response.status !== 200) {
      throw new Error(`darksky ${response.status}: ${response.statusText}`);
    }

    const celcius = Math.round((response.data.currently.temperature - 32) * 5/9) * 0.1;
    console.log(` Temperature: ${celcius}°C`);
  })
  .catch(e => {
    console.log(e);
  });