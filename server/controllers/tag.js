const tagModel = require('../models/tagModel');
const inputModel = require('../models/inputModel');

/*
	On peut creer des tags
	supprimer des tags
	ajouter des users ou en enlever

	on peut ajouter plusieurs fois le meme tag mais pas avec le meme userID
*/

exports.new = (tag, userId) => {
	return new Promise((resolve, reject) => {

		console.log('data: ', tag, userId)

		if (!tag || typeof tag != 'string' || !userId || typeof userId != 'number') {
			reject({status: "error", msg: "Error in params need : tag : yourTag"});
			return;
		}

		tag = tag.toLowerCase();

		inputModel.tag(tag)//sanitize input
		.then(() => {
			return tagModel.get(tag, userId)//try to get already exist tag
		})
		.then((result) => {
			reject({status: "error", msg: "Tag already exist"});//if tag already exist error
		})
		.catch((err) => {
			tagModel.new(tag, userId) //save new tag
			.then((result) => {
				resolve(result);
			})
			.catch(() => {
				console.log('reject');
				reject();
			})
		})

	});
}

exports.get = (tag) => {
	return new Promise((resolve, reject) => {
		tagModel.get(tag)
		.then(() => {
			resolve({"status": "success", "msg": "Tags saved !"});
		})
		.catch((err) => {
			reject(err);
		})
	});
}
