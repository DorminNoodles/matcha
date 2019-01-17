const messagesModel = require('../models/messagesModel');
// const jwtToken = require('../middlewares/jwtToken');
const user = require('../services/user');
const jwtToken = require('../services/jwtToken');
const userModel = require('../models/userModel');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		console.log('   > '+ data.from);
		userModel.findUserByUsername(data.from)
		.then((res) => {
			console.log('from exist');
			return userModel.findUserByUsername(data.to);
		})
		.then(() => {
			return checkInput.message(data.body);
		})
		.then(() => {
			return messagesModel.new({
					from: data.from,
					to: data.to,
					body: data.body
				});
		})
		.catch(() => {
			console.log('from exist pas');
		})

		console.log(data);


		// console.log(jwtToken.pouet);
		// if (userAuth() && checkMessage() )
		// messagesModel.newMessage({
		// // 	from: data.from,
		// // 	to: data.to,
		// // 	body: data.body
		// }).then((res) => {
		// 	console.log('controller new message !');
		// })
		resolve('hello');
	})
}
