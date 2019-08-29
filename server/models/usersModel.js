const mysql = require('promise-mysql');
const database = require('../controllers/database');


// exports.get = (params) => {
// 	return new Promise((resolve, reject) => {

// 		console.log('params >>> ', params)

// 		database.connection()
// 		.then((conn) => {
// 			return conn.query('SELECT \
// 								username,\
// 								id, \
// 								mailValidation, \
// 								email, \
// 								gender, \
// 								orientation, \
// 								location, \
// 								score, \
// 								latitude, \
// 								longitude, \
// 								age \
// 								FROM users \
// 								WHERE latitude BETWEEN ? AND ? \
// 								AND longitude BETWEEN ? AND ? \
// 								AND age BETWEEN ? AND ?',
// 								[params.originLat - params.distance, params.originLat + params.distance, //gps range 1km = 0.00001 between lower and upper
// 								params.originLong - params.distance, params.originLong + params.distance,
// 								params.ageMin, params.ageMax,
// 								'female']);
// 		})
// 		.then((res) => {

// 			console.log('query > ', res);

// 			resolve(res);
// 			// if (!res[0])
// 			// 	reject({status: "error", key: "getUsers", msg: "Nobody find !"});
// 			// else
// 			// 	resolve({status: "success", key: "getUsers", msg: "Find some users", data: res});
// 		})
// 		.catch((err) => {
// 			reject({status: "error", key: "getUsers", msg: "Query error !"});

// 		})
// 	})
// }



// .then((res) => {
// 	console.log('succes ', res, res[0]);
// })
// .catch((err) => {
// 	console.log('error query ', err);
// 	reject();
// })


// 'SELECT * FROM users\
// WHERE compatibility >= ? && age BETWEEN ? AND ? && id IN \
//    (SELECT DISTINCT usertags.user_id \
//    FROM usertags \
//    INNER JOIN tags ON usertags.tag_id=tags.id \
//    WHERE tags.tag="feu")', arg);

getQuery = ({ age_min, age_max, distance, score, tags }) => {

	let s_score = " WHERE compatibility >= ?"
	let s_age = "age BETWEEN ? AND ?"
	let s_tag = "id IN \
				(SELECT DISTINCT usertags.user_id \
					FROM usertags \
					INNER JOIN tags ON usertags.tag_id=tags.id \
					WHERE tags.tag='feu')"
	console.log("coucou")


	let query = ""
	let arg = ""
	if (tags && tags.length > 0)
		query = s_tag
	if (age_min && age_max)
		query = query.length > 0 ? s_age + " && " + query : s_age
	if (score)
		query = query.length > 1 ? s_score + " && " + query : s_score
	return { query }
}


exports.get = (params) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				console.log("params", params)

				let arg = [];
				query = getQuery(params)

				return conn.query(
					'SELECT * FROM users' + query, arg);
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
				reject({ status: "error", key: "getUsers", msg: "Query error !" });

			})
	})
}