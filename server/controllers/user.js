// controller
const User = require('../services/user');
const UserModel = require('../services/user');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		let user = new User();

		user.createUser({
				username : data.username,
				password : data.password,
				firstname : data.firstname)
		})
		.then((res) => {
			console.log('res');
			return user.saveUser(res);
		})
		.then(() => {

		})
		.catch((err) => {
			reject(err);
		})

		// console.log('2');
		console.log(data);
		resolve('Perfect !');
	})
};
