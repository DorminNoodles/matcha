const chatModel = require('../models/chatModel');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		chatModel.new(data)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}

exports.get = (user_id, id) => {
	return new Promise((resolve, reject) => {
		chatModel.get(user_id, id)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}

exports.list = (id) => {
	return new Promise((resolve, reject) => {
		chatModel.list(id)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	})
}
