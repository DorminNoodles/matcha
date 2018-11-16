
exports.username = (username) => {
	return new Promise((resolve, reject) => {
		if (username && username.length >= 3) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		if (password && password.length >= 3) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		if (firstname && firstname.length >= 3) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}
