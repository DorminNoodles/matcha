const likesModel = require('../models/likesModel.js');


exports.new = (data) => {
	return new Promise((resolve, reject) => {
		likesModel.new()
	});
}
