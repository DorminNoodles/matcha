const likesModel = require('../models/likesModel.js');

exports.new = (liker, liked) => {
	return new Promise((resolve, reject) => {
		likesModel.getLike(liker, liked)
		.then(() => {
			reject({"status": "error", "msg": "like already exist."});
		})
		.catch((err) => {
			likesModel.new(liker, liked)
			.then(() => {
				resolve({"status": "success", "msg": "like Added !"});
			})
			.catch((err) => {
				reject('error when adding like');
			})
		})
	});
}

exports.getAll = (id) => {
	return new Promise((resolve, reject) => {
		let data = {send: null, give: null};

		likesModel.getLikesSended(id)
		.then((res) => {
			data.send = res;
			// resolve(res);
			return likesModel.getLikesGived(id);
		})
		.then((res) => {
			data.give = res;
			resolve(data);
		})
		.catch((err) => {
			reject(err);
		})
	});
}

exports.delete = (liker, liked) => {
	return new Promise((resolve, reject) => {
		likesModel.delete(liker, liked)
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err);
		})
	})
}

exports.get = (liker, liked) => {
	let pouet = likesModel.getLike(liker,liked)
	consol.log("Ericson");
}
