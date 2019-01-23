

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
