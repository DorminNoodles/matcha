// const messagesModel = require('../models/messagesModel');
// const user = require('../services/user');
// const jwtToken = require('../services/jwtToken');
// const userModel = require('../models/userModel');
// const inputModel = require('../models/inputModel');

// exports.new = (data) => {
// 	return new Promise((resolve, reject) => {
// 		userModel.findUserByUsername(data.from, 0)
// 		.then((res) => {
// 			data.from_id = res.id;
// 			return userModel.findUserByUsername(data.to, 0);
// 		})
// 		.then((res) => {
// 			data.to_id = res.id;
// 			return inputModel.message(data.body);
// 		})
// 		.then(() => {
// 			return messagesModel.new({
// 				from: data.from_id,
// 				to: data.to_id,
// 				body: data.body
// 			});
// 		})
// 		.catch((err) => {
// 			reject(err)
// 		})
// 		resolve('message ok');
// 	})
// }

// exports.getFromChat = (data) => {
// 	return new Promise((resolve, reject) => {
// 		console.log("ouech");
// 	})
// }

// exports.sendToChat = (data) => {
// 	return new Promise((resolve, reject) => {

// 	})
// }

// exports.getRecentsMessages = (data) => {
// 	return new Promise((resolve, reject) => {
// 		userModel.findUserById(data.from)
// 		.then((res) => {
// 			return userModel.findUserById(data.to);
// 		})
// 		.then((res) => {
// 			console.log("data");
// 			console.log(data);
// 			return messagesModel.getRecentsMessages(data);
// 		})
// 		.then((res) => {
// 			console.log("HELLOOOO");
// 			console.log(res);
// 			resolve(res);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			reject(err);
// 		})
// 	})
// }
