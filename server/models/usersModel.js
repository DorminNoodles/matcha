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

queryTags = (tags, arg) => {

	let query = " id IN (SELECT DISTINCT usertags.user_id FROM usertags INNER JOIN tags ON usertags.tag_id=tags.id WHERE "

	for (i = 0; i < tags.length; i++) {
		query += 'tags.tag=?'
		query += (i < tags.length - 1) ? " || " : ")"
	}

	arg = arg.concat(tags)

	return ({ query, arg })

}

getQuery = ({ age_min, age_max, distance, score, tags }) => {

	let s_score = " compatibility >= ? "
	let s_age = " age BETWEEN ? AND ? "

	let query = ""
	let arg = []

	if (score && arg.push(score)) { query += s_score }

	if (age_min && age_max && arg.push(age_min, age_max))
		query += query.length > 0 ? "&&" + s_age : s_age

	if (tags && tags.length > 0) {
		r_tags = queryTags(tags, arg)
		arg = r_tags.arg
		query += query.length > 0 ? "&&" + r_tags.query : r_tags.query
	}

	if (query.length > 0) { query = " WHERE" + query }

	return { query, arg }
}


exports.get = (params) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				rsl = getQuery(params)

				return conn.query('SELECT * FROM users' + rsl.query, rsl.arg);
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject({ status: "error", msg: "Query error !", data: [] });

			})
	})
}