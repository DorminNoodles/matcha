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

		inputModel.tag(tag)//sanitize input
			.then(() => {
				tagModel.get(tag).then((res) => {
					console.log(user_id)
					console.log( res.id)
					tagModel.user(user_id, res.id).then((res)=> {
						resolve(res)
					}).catch((err)=> {
						reject(err)
					})
				})
			})
			// .catch((err) => {
			// 	reject(err)
			// 	console.log("===============586s3d5f3sd======")

			// 	tagModel.new(tag, user_id) //save new tag
			// 		.then((result) => {
			// 			resolve(result);
			// 		})
			// 		.catch(() => {
			// 			console.log('reject');
			// 			reject();
			// 		})
			// })

	});
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
