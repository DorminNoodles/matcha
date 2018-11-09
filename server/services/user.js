"use strict";
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');

class User {

	constructor(){
		// setTimeout(function () {
		// 	console.log('1');
		// }, 2000);
	}

	createUser(data) {
		return new Promise((resolve, reject) => {
			if (!data)
				reject();
			checkInput.username(data.username).then(() => {

				console.log('Username Checked');
				return checkInput.password(data.password)
			})
			.then((res) => {
				console.log('Password Checked');
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			})

		})
	}

}

module.exports = User;
