const blockModel = require('../models/blockModel');
const userModel = require('../models/userModel');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {
		console.log("hellooooooo");
		blockModel.get(blocker, blocked)
		.then(() => {
			reject({"status": "error", "msg": "block already exist."});
		})
		.catch((err) => {
			userModel.findUserByID(blocked)
			.then((res) => {
				console.log(res);
				return blockModel.new(blocker, blocked)
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
