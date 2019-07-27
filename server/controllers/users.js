const usersModel = require('../models/usersModel');
const userModel = require('../models/userModel');



checkDistance = (distance) => {
	let defaultDistance = 25;

	distance = parseInt(distance, 10);
	distance = (isNaN(distance) || !distance) ? defaultDistance : distance;
	return distance;
}

checkAge = (ageMin, ageMax) => {
	let ageMinDefault = 18;
	let ageMaxDefault = 160;
	ageMin = isNaN(parseInt(ageMin)) ? ageMinDefault : parseInt(ageMin);
	ageMax = isNaN(parseInt(ageMax)) ? ageMaxDefault : parseInt(ageMax);
	return [ageMin, ageMax];
}


exports.getUsers = (query, userId) => {
	return new Promise((resolve, reject) => {


		let params = {
			'distance': checkDistance(query.distance) * 0.0085,
			'ageMin': checkAge(query.ageMin, 0)[0],
			'ageMax': checkAge(0, query.ageMax)[1]
		}

		console.log('hack_2');
		console.log('hack_2', params);

		userModel.findUserByID(userId)
		.then((res) => {
			// console.log('findUser by id', res);
			return usersModel.get({...params, originLat: res.latitude, originLong: res.longitude});
		})
		.then((res) => {
			console.log('then ', res);
			resolve()
		})
		.catch((err) => {
			console.log('reject');
			reject(err);
		})

	})
}
