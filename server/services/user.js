"use strict";
const dotenv = require('dotenv').config();
const checkInput = require('../services/checkInput');
const geoloc = require('../services/geoloc');
const userModel = require('../models/userModel');
const Photos = require('../services/photos');
const myEmitter = require('../emitter');

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
				console.log("ERROR REGISTERED: ", err);
				reject(err);
			})
		})
	}

	createUser(data) {
		return new Promise((resolve, reject) => {
			let photos = new Photos();
			if (!data) {
				reject({"status": "error", "key": "photo", "msg": "Photo No Data !"});
				return;
			}
			this.checkData(data)
			.then((res) => {
				console.log("datas checked !");
				return userModel.saveUser(data);
			}).then((userData) => {
				console.log("userData", userData);
				return geoloc.getGps(data);
			}).then(() => {
				return photos.createUserFolder(data);
			}).then(() => {
				console.log(data);
				return userModel.findUserByUsername(data.username);
			}).then((userData) => {
				return Photos.move(userData.id, data.avatar);
			}).then(() => {
				myEmitter.emit('userRegistered', data);
				resolve({'status': 'success', 'msg' : 'user created'});
			})
			.catch((err) => {
				console.log("checkData error: ", err);
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
				}, process.env.JWT_KEY);
				resolve(token);
				return;
			})
			.catch(() => {
				reject({"status": "error", "key": "auth", "msg": "Connexion error !"});
			})
		})
	}

	checkAuth(token) {

	}
}

module.exports = User;
