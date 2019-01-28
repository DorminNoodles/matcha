"use strict";
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');
const myEmitter = require('../emitter');
const userSettings = require('../models/userSettings');

class User {
	constructor(){
		// setTimeout(function () {
		// 	console.log('1');
		// }, 2000);
	}
	checkData(data) {
		return new Promise((resolve, reject) => {
			checkInput.username(data.username)
			.then((res) => {
				return checkInput.usernameAlreadyTaken(data.username);
			})
			.then((res) => {
				console.log('Username Checked');
				return checkInput.password(data.password);
			})
			.then(function (res) {
				console.log('Password Checked');
				return checkInput.firstname(data.firstname);
			})
			.then((res) => {
				console.log('Firstname Checked');
				return checkInput.lastname(data.lastname);
			})
			.then((res) => {
				console.log('Lastname Checked');
				return checkInput.location(data.location);
			})
			.then((res) => {
				console.log('Location Checked');
				return checkInput.email(data.email);
			})
			.then((res) => {
				return checkInput.emailAlreadyTaken(data.username);
			})
			.then((res) => {
				console.log('Email Checked');
				resolve(data);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			})
		})
	}

	createUser(data) {
		return new Promise((resolve, reject) => {
			if (!data) {
				reject({"status": "error", "msg": "No Data !"});
				return;
			}
			this.checkData(data)
			.then((res) => {
				resolve(userModel.saveUser(data)
						.then(() => {
							myEmitter.emit('userRegistered', data);
						})
				);

			})
			.catch((err) => {
				console.log("checkData error");
				reject(err);
			})
		})
	}

	authenticate(username, password) {
		return new Promise((resolve, reject) => {

			userModel.findUserByName(username)
			.then((data) => {
				console.log(data);
				console.log(data.username);
				let token = jwt.sign({
					id: data.id,
					username: data.username,
					email: data.email
				}, 'shhhhhhh');
				resolve(token);
				return;
			})
			.catch(() => {
				reject();
			})
		})
	}

	checkAuth(token) {

	}

	checkSettings(id, data) {
		return new Promise((resolve, reject) => {
			console.log("<!--------");
			console.log("CHECK SETTINGS!");
			console.log(id);
			console.log(data);
			console.log("--------!>");
			// userSettings.changeUsername(id, data.username)
			// .then((res) => {
			// 	console.log("> Username checked.")
				// return 
			userSettings.changeFirstname(id, data.firstname)
			.then((res) => {
				console.log("> Firstname checked.")
				return userSettings.changeLastname(id, data.lastname);
			}).then((res) => {
				console.log("> Lastname checked.")
				return userSettings.changeOrientation(id, data.orientation);
			}).then((res) => {
				console.log("> Orientation checked.")
				return userSettings.changeGender(id, data.gender);
			}).then((res) => {
				console.log("> Gender checked.")
				return userSettings.changeMail(id, data.email);
			}).then((res) => {
				console.log("> Mail checked.")
				return userSettings.changeBio(id, data.bio);
			}).then((res) => {
				console.log("> Bio checked.");
				resolve();
			}).catch((err) => {
				reject(err);
			})
		})
	}
}

module.exports = User;
