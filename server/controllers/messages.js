const messagesModel = require('../models/messagesModel');
// const jwtToken = require('../middlewares/jwtToken');
const user = require('../services/user');
const jwtToken = require('../services/jwtToken');

exports.new = (token, body) => {
	return new Promise((resolve, reject) => {
		// new jwtToken
			console.log("HOHOHOHO");
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
