"use strict";
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');
const events = require('events');


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
			}).then(() => {
				console.log('Password Checked');
				return checkInput.firstname(data.firstname)
			})
			.then((res) => {
				console.log('Firstname Checked');
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			})
		})
	}

	saveUser(data) {
		return new Promise((resolve, reject) => {
			userModel.saveUser(data)
			.then(() => {

				//send Email Verif
				resolve();
			})
			.catch(() => {
				reject();
			})

			console.log("saveUser");
			resolve();
		})
	}

}

module.exports = User;
