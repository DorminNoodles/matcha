const blockModel = require('../models/blockModel');
const userModel = require('../models/userModel');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {
		console.log("hellooooooo");
		blockModel.get(blocked)
		.then(() => {
			reject({"status": "error", "msg": "block already exist."});
		})
		.catch((err) => {
			console.log(blocked);
			userModel.findUserById(blocked)
			.then((res) => {
				console.log("Ouech");
				console.log(res);
				return blockModel.new(blocker, blocked);
			})
			.then(() => {
				resolve({"status": "success", "msg": "user blocked !"});
			})
			.catch((err) => {
				reject('error when adding block');
			})
		})
	});
}
