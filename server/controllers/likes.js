const likesModel = require('../models/likesModel.js');

exports.new = (data) => {
	return new Promise((resolve, reject) => {

		likesModel.getLike(data.liker, data.liked)
		.then(() => {
			return likesModel.new(data.liker, data.liked)
		})
		.then(() => {
			resolve('like added');
		})
		.catch((err) => {
			console.log(err);
			reject();
		})
	});
}
