const mysql = require('promise-mysql');
const check = require('../services/checkInput');

exports.changeUsername = (username) => {
	return new Promise((resolve, reject) => {
		check.username(username)
		.then(() => {
			console.log("Username free");
		})
	})
}