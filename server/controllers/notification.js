const notificationModel = require('../models/notificationModel.js');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		notificationModel.new(data)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}

exports.get = (user_id, id) => {
	return new Promise((resolve, reject) => {
		notificationModel.get(user_id, id)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}