const geolib = require('geolib');

const usersModel = require('../models/usersModel');
const userModel = require('../models/userModel');
const tags = require('../controllers/tags');



// const checkDistance = (distance) => {
// 	let defaultDistance = 25;

// 	distance = parseInt(distance, 10);
// 	distance = (isNaN(distance) || !distance) ? defaultDistance : distance;
// 	return distance;
// }

// const checkAge = (ageMin, ageMax) => {
// 	let ageMinDefault = 18;
// 	let ageMaxDefault = 160;
// 	ageMin = isNaN(parseInt(ageMin)) ? ageMinDefault : parseInt(ageMin);
// 	ageMax = isNaN(parseInt(ageMax)) ? ageMaxDefault : parseInt(ageMax);
// 	return [ageMin, ageMax];
// }

// const sortUsers = (sort, data, userData, callback) => {

// 	console.log("sortUsers > ", sort);

// 	switch (sort) {
// 		case "score":
// 			data.sort((a, b) => {
// 				return a.score - b.score;
// 			})
// 			break;
// 		default:
// 			data.sort((a, b) => {
// 				return a.distance - b.distance;
// 			})
// 	}
// 	callback(data);
// }

// const addDistance = (userGps, data) => {

// 	console.log('user latitude > ', userGps);
// 	return data.map((elem) => {
// 		console.log('elem latitude > ', elem.latitude);
// 		elem.distance = geolib.getDistance(
// 			{ latitude: userGps.lat, longitude: userGps.long },
// 			{ latitude: elem.latitude, longitude: elem.longitude }
// 		) / 1000;
// 		return elem;
// 	})

// }

exports.getUsers = (query, userId) => {
	return new Promise((resolve, reject) => {

		// let data = [
		// 	{ latitude: 48.8534, longitude: 2.3488 },
		// 	{ latitude: 48.7534, longitude: 2.3488 },
		// 	{ latitude: 48.6534, longitude: 2.3488 },
		// 	{ latitude: 48.5534, longitude: 2.3488 },
		// 	{ latitude: 48.5534, longitude: 2.3488 },
		// 	{ latitude: 48.5534, longitude: 2.3388 },
		// 	{ latitude: 48.5534, longitude: 2.3448 }
		// ]

		// let userGps = { lat: 48.8534, long: 2.3488 }

		usersModel.get(query, userId)
			.then((res) => { resolve(res) })
			.catch((err) => { reject(err); })
	})
}