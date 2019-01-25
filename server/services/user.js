"use strict";
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel')
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

				myEmitter.emit('userRegistered', data);
				resolve(userModel.saveUser(data));

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

	checkSettings(data) {
		return new Promise((resolve, reject) => {
			console.log("<!--------");
			console.log("CHECK SETTINGS!");
			console.log(data.username);
			console.log(data.firstname);
			console.log(data.lastname);
			console.log(data.orientation);
			console.log(data.gender);
			console.log(data.email);
			console.log(data.bio);
			console.log(data.username);
			console.log("--------!>");
			userSettings.changeUsername(data.username)
			.then((res) => {
				return userSettings.changeFirstname(data.firstname);
			}).then((res) => {
				return userSettings.changeLastname(data.lastname);
			}).then((res) => {
				return userSettings.changeOrientation(data.orientation);
			}).then((res) => {
				return userSettings.changeGender(data.gender);
			}).then((res) => {
				return userSettings.changeMail(data.email);
			}).then((res) => {
				return userSettings.changeBio(data.bio);
			}).catch((err) => {
				reject(err);
			})
		})
	}
}

module.exports = User;
