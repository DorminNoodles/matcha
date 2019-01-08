"use strict";
const checkInput = require('../services/checkInput');
const check = require('../models/userModel')

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
			if (!data)
				reject();
			this.checkData(data)
			.then((res) => {
				resolve(check.saveUser(data));
			})
			.catch((err) => {
				console.log("checkData error");
				reject(err);
			})
		})
	}
}

module.exports = User;