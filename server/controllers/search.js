const searchModel = require('../models/searchModel');

exports.getPeople = (data) => {
	return new Promise((resolve, reject) => {

		if (data.tri === "score") {
			searchModel.getPeopleByScore()
			.then((res) => {
				resolve(res);
			}).catch(() => {
				reject();
			})
		}
		else if (data.tri === "age") {
			searchModel.getPeopleByAge()
			.then((res) => {
				resolve(res);
			}).catch(() => {
				reject();
			})
		}
		else {
			searchModel.getPeopleByRange(data)
			.then((res) => {
				resolve(res);
			}).catch(() => {
				reject();
			})
		}


		// searchModel.getOrientation(id)
		// .then((res) => {
		// 	var amin = searchModel.getMinAge(ageMin);
		// 	var amax = searchModel.getMaxAge(ageMax);
		// 	return searchModel.getProfiles(res, amin, amax);
		// }).then((result) => {
		// 	resolve(result);
		// }).catch((error) => {
		// 	reject(error);
		// })
	})
}