const messagesModel = require('../models/messagesModel');
// const jwtToken = require('../middlewares/jwtToken');
const user = require('../services/user');
const jwtToken = require('../services/jwtToken');
const userModel = require('../models/userModel');
const checkInput = require('../services/checkInput');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(data.from)
		.then((res) => {
			data.from_id = res.id;
			return userModel.findUserByUsername(data.to);
		})
		.then((res) => {
			data.to_id = res.id;
			return checkInput.message(data.body);
		})
		.then(() => {
			return messagesModel.new({
					from: data.from_id,
					to: data.to_id,
					body: data.body
			});
		})
		.catch((err) => {
			reject(err)
		})
		resolve('message ok');
	})
}

exports.getRecentsMessages = (data) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(data.from)
		.then((res) => {
			data.from_id = res.id;
			return userModel.findUserByUsername(data.to);
		})
		.then((res) => {
			data.to_id = res.id;
			return messagesModel.getRecentsMessages({

			});
		})
		.catch((err) => {
			console.log(err);
		})
	})
}
