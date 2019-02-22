const mysql = require('promise-mysql');
const visitModel = require('../models/visitModel');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		visitModel.new(data)
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(res);
		})
	})
}

exports.getVisits = (data) => {
	return new Promise((resolve, reject) => {
		visitModel.getVisits(data)
		.then((res) => {
			console.log("pouet");
			resolve(res);
		})
		.catch((err) => {
			console.log("deso");
			reject(err);
		})
	})
}
