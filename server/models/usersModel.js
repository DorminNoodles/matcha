const mysql = require('promise-mysql');
const database = require('../controllers/database');


exports.get = (params) => {
	return new Promise((resolve, reject) => {

		console.log('params >>> ', params)

		database.connection()
		.then((conn) => {
			return conn.query('SELECT \
								username,\
								id, \
								mailValidation, \
								email, \
								gender, \
								orientation, \
								location, \
								score, \
								latitude, \
								longitude, \
								age \
								FROM users \
								WHERE latitude BETWEEN ? AND ? \
								AND longitude BETWEEN ? AND ? \
								AND age BETWEEN ? AND ?',
								[params.originLat - params.distance, params.originLat + params.distance, //gps range 1km = 0.00001 between lower and upper
								params.originLong - params.distance, params.originLong + params.distance,
								params.ageMin, params.ageMax,
								'female']);
		})
		.then((res) => {

			console.log('query > ', res);

			resolve(res);
			// if (!res[0])
			// 	reject({status: "error", key: "getUsers", msg: "Nobody find !"});
			// else
			// 	resolve({status: "success", key: "getUsers", msg: "Find some users", data: res});
		})
		.catch((err) => {
			reject({status: "error", key: "getUsers", msg: "Query error !"});

		})
	})
}



// .then((res) => {
	// 	console.log('succes ', res, res[0]);
	// })
	// .catch((err) => {
		// 	console.log('error query ', err);
		// 	reject();
		// })
