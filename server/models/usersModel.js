const mysql = require('promise-mysql');
const database = require('../controllers/database');


exports.get = (params) => {
	return new Promise((resolve, reject) => {

		let foo1 = -500;
		let foo2 = 500;

		console.log('params >>> ', params)

		database.connection()
		.then((conn) => {
			let test = conn.query('SELECT \
								username,\
								id, \
								mailValidation, \
								email, \
								gender, \
								orientation, \
								location, \
								latitude, \
								longitude, \
								age \
								FROM users \
								WHERE latitude BETWEEN ? AND ? AND \
								longitude BETWEEN ? AND ? AND \
								age BETWEEN ? AND ?',
								// WHERE (latitude BETWEEN ? AND ?) AND WHERE id =?',
								[params.originLat - params.distance, params.originLat + params.distance, //gps range 1km = 0.00001 between lower and upper
								params.originLong - params.distance, params.originLong + params.distance,
								params.ageMin, params.ageMax,
								'female'])
								.then((res) => {
									console.log('succes ', res, res[0]);
								})
								.catch((err) => {
									console.log('error query ', err);
									reject();
								})
		})
		.then((res) => {
			console.log('hello ', res);
			resolve();
		})
		.catch((err) => {
			reject(err);
		})
	})
}
