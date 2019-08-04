const tagsModel = require('../models/tagsModel.js');


/*
	On peut creer des tags
	supprimer des tags
	ajouter des users ou en enlever

	on peut ajouter plusieurs fois le meme tag mais pas avec le meme userID
*/

exports.new = (tag, userId) => {
	return new Promise((resolve, reject) => {

		if (!tag || typeof tag != 'string' || !userId || typeof userId != 'number')
			reject();
		tag = tag.toLowerCase();

		inputModel.tag(tag)
		.then((res) => {
			return tagModel.new(tag, userId)
		})
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
