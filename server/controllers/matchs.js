const likesModel = require('../models/likesModel');


exports.checkMatch = (liker, liked) => {
	return new Promise((resolve, reject) => {
		let match = false;
		console.log("pouet....");
		likesModel.getLike(liker, liked)
		.then((res) => {
			console.log(res);
			return likesModel.getLike(liked, liker)
		})
		.then((result) => {
			console.log("fichtre");
			resolve();
		})
		.catch((err) => {
			console.log(err);
			reject();
		})
	})
}
