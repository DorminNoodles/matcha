const tagsModel = require('../models/tagsModel.js');

exports.new = (tag, userId) => {
	return new Promise((resolve, reject) => {

		tagsModel.patch(tag, ['1', '2'])
		.then((result) => {
			console.log("hello : ", result.tag);
			resolve();
		})
		.catch(() => {
			reject();
		})
	});
}

exports.get = (tag) => {
	return new Promise((resolve, reject) => {
		tagsModel.get(tag)
		.then(() => {
			resolve({"status": "success", "msg": "Tags saved !"});
		})
		.catch((err) => {
			reject(err);
		})
	});
}
