const request = require('request');
const keys = require('./../keys');

const apiKey = keys.geocode;

const geocodeAddress = (address) => {
  const encodedAddress = encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodedAddress}`,
      json: true,
      timeout: 5000
    }, (error, response, body) => {
      if (error) {
        reject('unable to connect to MapQuest server');
      } else if (!body) {
        callback('no response from MapQuest server');
      } else if (body.results[0].locations.length !== 1) {
        reject('determined location too vague');
      } else {
        const result = body.results[0].locations[0];
        resolve({
          address: `${result.street} ${result.adminArea5} ${result.adminArea4} ${result.adminArea1}`,
          latitude: result.latLng.lat,
          longitude: result.latLng.lng
        });
      }
    });
  });
};

// const geocodeAddress = (address, callback) => {
//   const encodedAddress = encodeURIComponent(address);

//   request({
//     url: `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodedAddress}`,
//     json: true
//   }, (error, response, body) => {
//     if (error) {
//       callback('unable to connect to MapQuest server');
//     } else if (body.results[0].locations.length !== 1) {
//       callback('determined location too vague');
//     } else {
//       const result = body.results[0].locations[0];
//       callback(undefined, {
//         address: `${result.street} ${result.adminArea5} ${result.adminArea4} ${result.adminArea1}`,
//         latitude: result.latLng.lat,
//         longitude: result.latLng.lng
//       });
//     }
//   });
// };

module.exports = {
  geocodeAddress
};