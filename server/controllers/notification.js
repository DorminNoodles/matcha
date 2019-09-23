const notificationModel = require('../models/notificationModel.js');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		notificationModel.new(data)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}

exports.get = (id) => {
	return new Promise((resolve, reject) => {
		notificationModel.get(id)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		notificationModel.delete(id)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}