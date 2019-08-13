const tagModel = require('../models/tagModel');
const inputModel = require('../models/inputModel');

/*
	On peut creer des tags
	supprimer des tags
	ajouter des users ou en enlever

	on peut ajouter plusieurs fois le meme tag mais pas avec le meme userID
*/

exports.new = (tag, user_id) => {
	return new Promise((resolve, reject) => {

		if (!tag || typeof tag != 'string' || !user_id || typeof user_id != 'number') {
			reject({ status: "error", msg: "Error in params need : tag : yourTag" });
			return;
		}

		tag = tag.toLowerCase();

		inputModel.tag(tag, user_id) //sanitize input
			.then(() => {
				return new Promise((resolve, reject) => {
					tagModel.get(tag, user_id)
						.then((res) => { resolve(res) })
						.catch((err) => { reject(err) })
				}).then((res) => {
					tagModel.user(user_id, res.id)
						.then((res) => { resolve(res) })
						.catch((err) => { reject(err); })
				}).catch((err) => {
					tagModel.new(tag, user_id)
						.then((result) => { resolve(result); })
						.catch((err) => { reject(err); })
				})
			}).catch((err) => { reject(err) })
	})
}

exports.get = (tag) => {
	return new Promise((resolve, reject) => {
		tagModel.get(tag)
			.then(() => {
				resolve({ "status": "success", "msg": "Tags saved !" });
			})
			.catch((err) => {
				reject(err);
			})
	});
}