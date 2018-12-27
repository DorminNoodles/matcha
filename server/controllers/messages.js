const messagesModel = require('../models/messagesModel');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		messagesModel.newMessage({
			from: data.from,
			to: data.to,
			body: data.body
		}).then((res) => {
			console.log('controller new message !');
		})
		resolve('hello');
	})
}
