const mysql = require('promise-mysql');
const userModel = require('./userModel');

exports.getOrientation = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			return conn.query("SELECT orientation FROM users WHERE id =?", [id]);
		}).then((res) => {
			resolve(res[0].orientation);
		}).catch((err) => {
			reject(err);
		})
	})
}

exports.getPeopleByRange = (data) => {
	return new Promise((resolve, reject) => {
		console.log("peopleByRange");
		userModel.findUserByID(data.id)
		.then((res) => {
			data.lat = res[0].latitude;
			data.long = res[0].longitude;
			return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
				})
		}).then((conn) => {
			return conn.query("SELECT id, username, firstname, age, location FROM users WHERE longitude BETWEEN ? AND ?", [1.0, 3.0]);
		}).then((res) => {
			resolve();
		})
	}).catch((error) => {
		reject(error);
	})	
}

exports.getPeopleByScore = (data, orientation) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		}).then((conn) => {
			if(orientation == "male" || orientation == "female")
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id!=? AND gender=? AND score=?) ORDER BY score DESC", [data.id, orientation, score]);
			else
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id!=? AND score=?) ORDER BY score DESC", [data.id, orientation, score]);
		}).then((res) => {
			resolve(res);
		})
	}).catch((error) => {
		reject(error);
	})	
}

exports.getPeopleByAge = (data, orientation) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		}).then((conn) => {
			if(orientation == "male" || orientation == "female")
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id<>? AND gender=? AND age BETWEEN ? AND ?) ORDER BY age ASC", [data.id, orientation, data.limitAgeMin, data.limitAgeMax]);
			else
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id<>? AND age BETWEEN ? AND ?) ORDER BY age ASC", [data.id, data.limitAgeMin, data.limitAgeMax]);
		}).then((res) => {
			resolve(res);
		})
	}).catch((error) => {
		reject(error);
	})	
}

exports.getPeopleByTag = (data, orientation) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			if (this.countTags(data.tags) > 1) {
				allTags = data.tags.join("' OR t.tag='");
			} else {
				allTags = data.tags;
			}
			if (orientation == "male" || orientation == "female") {
				let sql = "SELECT us.id, us.username, us.firstname, us.age, us.location FROM users us INNER JOIN tags t ON us.id = t.user_id WHERE (us.id<>\'"+ data.id +"\' AND gender=\'"+ orientation +"\' AND t.tag=\'"+ allTags +"\')";
				return conn.query(sql);
			}
			else {
				let sql = "SELECT us.id, us.username, us.firstname, us.age, us.location FROM users us INNER JOIN tags t ON us.id = t.user_id WHERE (us.id<>\'"+ data.id +"\' AND t.tag=\'"+ allTags +"\')";
				return conn.query(sql);
			}
		}).then((res) => {
			resolve(res);
		})
	}).catch((error) => {
		reject(error);
	})
}

exports.countTags = (tags) => {
		return tags.length;
}