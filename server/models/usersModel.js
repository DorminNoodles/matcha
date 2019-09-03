const mysql = require('promise-mysql');
const database = require('../controllers/database');



// .then((res) => {
// 	console.log('succes ', res, res[0]);
// })
// .catch((err) => {
// 	console.log('error query ', err);
// 	reject();
// })


// SELECT id, username, firstname, lastname, gender, orientation, age, location, avatar, score, 
// IF(likes.liker=12 & likes.liked IS NULL,FALSE, TRUE) as likes
// FROM users LEFT JOIN likes ON (users.id = likes.liked)
// WHERE score >= 23 && age BETWEEN 18 AND 60 &&
//  id IN  (SELECT DISTINCT usertags.user_id  FROM usertags  INNER JOIN tags ON usertags.tag_id=tags.id WHERE tags.tag="feu");

queryTags = (tags, arg) => {

	let query = " id IN (SELECT DISTINCT usertags.user_id FROM usertags INNER JOIN tags ON usertags.tag_id=tags.id WHERE "

	for (i = 0; i < tags.length; i++) {
		query += 'tags.tag=?'
		query += (i < tags.length - 1) ? " || " : ")"
	}

	arg = arg.concat(tags)

	return ({ query, arg })

}

getQuery = ({ ageMin, ageMax, distance, score, tags }) => {

	let s_score = " score >= ? "
	let s_age = " age BETWEEN ? AND ? "

	let query = ""
	let arg = []

	if (score && arg.push(score)) { query += s_score }

	if (ageMin && ageMax && arg.push(ageMin, ageMax))
		query += query.length > 0 ? "&&" + s_age : s_age

	if (tags && tags.length > 0) {
		r_tags = queryTags(tags, arg)
		arg = r_tags.arg
		query += query.length > 0 ? "&&" + r_tags.query : r_tags.query
	}

	if (query.length > 0) { query = " WHERE" + query }

	return { query, arg }
}


exports.get = (params, id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				const query = `\
					SELECT id, username, firstname, lastname, gender, orientation, age, location, avatar, score, \
					IF(likes.liker = ${id} & likes.liked IS NULL, FALSE, TRUE) as likes\
					FROM users LEFT JOIN likes ON(users.id = likes.liked AND liker=${id})`
				rsl = getQuery(params)

				return conn.query(query + rsl.query, rsl.arg);
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject({ status: "error", msg: "Query error !", data: [] });

			})
	})
}