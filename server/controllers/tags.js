const tagsModel = require('../models/tagsModel.js');

/*
	On peut creer des tags
	supprimer des tags
	ajouter des users ou en enlever

	Ici on garde un tag avec son id et la list des users qui y ont subscribe
	ainsi on va pouvoir avoir la list de tous les users propre a un tag (dans users/:tags)
*/

exports.new = (tag, userId) => {
	return new Promise((resolve, reject) => {

		tagsModel.new(tag, userId)
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
