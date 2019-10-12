const database = require('../controllers/database');

queryTags = (tags, arg) => {

	let query = " users.id IN (SELECT DISTINCT usertags.user_id FROM usertags INNER JOIN tags ON usertags.tag_id=tags.id WHERE "

	for (i = 0; i < tags.length; i++) {
		query += 'tags.tag=?'
		query += (i < tags.length - 1) ? " || " : ")"
	}

	arg = arg.concat(tags)

	return ({ query, arg })

}

getQuery = ({ ageMin, ageMax, distance, score, tags, identity, longitude, latitude }, id) => {

	let arg = [parseInt(identity), latitude, longitude, latitude, id, id, id, id, ageMin, ageMax]
	let query = ""

	if (tags && tags.length > 0) {
		r_tags = queryTags(tags, arg)
		arg = r_tags.arg
		query += " AND " + r_tags.query
	}

	arg = arg.concat([score, distance])
	query += " HAVING score >= ? AND distance <= ? AND sexuality > 0 "

	return { query, arg }
}

exports.get = (params, id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				const query = "\
					SELECT users.id as id, username, firstname, lastname, gender, orientation, age, location, avatar, latitude, longitude,active, bin(? & users.mask) as sexuality ,\
					((SELECT COUNT(*) FROM likes WHERE likes.liked=users.id) * 10) + \
					((SELECT COUNT(*) FROM usertags WHERE tag_id IN \
					(SELECT tag_id FROM usertags WHERE user_id=users.id)) * 5) as score, \
					(6371 * acos( cos( radians(latitude) ) * cos( radians(?) ) * \
					 cos( radians( ? ) - radians(longitude) ) + sin( radians(latitude) ) \
					  * sin( radians( ? ) )	) ) as distance ,\
					IF(likes.liker = ? & likes.liked IS NULL, FALSE, TRUE) as likes\
					FROM users LEFT JOIN likes ON(users.id = likes.liked AND liker=?)\
					LEFT JOIN block ON (blocked=users.id) \
					LEFT JOIN ban ON (ban.id=users.id) \
					WHERE (blocker!=? or blocker IS NULL) \
					AND (ban.id IS NULL)\
					AND users.id NOT IN (?) AND age BETWEEN ? AND ? "

				rsl = getQuery(params, id)

				return conn.query(query + rsl.query, rsl.arg)
					.then((res) => {
						conn.end();
						resolve(res);
					})
			})
			.catch(() => {
				reject({ status: "error", msg: "Query error !", data: [] });
			})
	})
}