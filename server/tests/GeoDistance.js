/*

0.00001 = environ 1km




*/


const geolib = require('geolib');

let test = geolib.getDistance(
	{ latitude: 48.8534, longitude : 2.3522219},
	{ latitude: 47.902964, longitude : 1.909251}
);

console.log(test / 1000);
