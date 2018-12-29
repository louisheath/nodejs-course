const request = require('request');
const keys = require('./../keys');

const apiKey = keys.darksky;

const darkskyTemperature = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`,
    json: true,
    timeout: 5000
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to darksky server\n');
    } else if (response.statusCode !== 200) {
      const error = (response.body.error) ? `${response.body.error}\n` : response.body;
      callback(`darksky ${response.statusCode}: ${error}`);
    } else {
      const celcius = (body.currently.temperature - 32) * 5/9;
      callback(undefined, Math.round(celcius * 10) * 0.1);
    }
  });
};

module.exports = {
  darkskyTemperature
};