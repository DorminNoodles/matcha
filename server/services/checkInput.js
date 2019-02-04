const userModel = require('../models/userModel.js');

exports.username = (username) => {
	return new Promise((resolve, reject) => {
		const usernameRegex = RegExp(/^[a-zA-Z0-9]*$/);
		if (username && usernameRegex.test(username))
			resolve(username);
		else
			reject("Username too short");
	})
}

exports.usernameAlreadyTaken = (username) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(username)
		.then(() => {
			reject("username already taken !");
		})
		.catch((err) => {
			resolve();
		})
	})
}

exports.emailAlreadyTaken = (email) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByEmail(email)
		.then(() => {
			reject("Email taken");
		})
		.catch((err) => {
			resolve();
		})
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		const passwordRegex = RegExp(/^\S*(?=\S{6,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/);
		if (passwordRegex.test(password))
			resolve(password)
		else
			reject("fail password");
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		firstname.match(/^\S*(?=\S*[A-Za-z])(?=\S{2,})/) ? resolve(firstname) : reject('Firstname error');
	})
}

exports.lastname = (lastname) => {
	return new Promise((resolve, reject) => {
		lastname.match(/^\S*(?=\S*[A-Za-z])(?=\S{2,})/) ? resolve(lastname) : reject('Lastname error');
	})
}

exports.email = (email) => {
	return new Promise((resolve, reject) => {
		var reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (email && email.match(reg))
			resolve(email);
		else
			reject("Email not conform");
	})
}

exports.location = (location) => {
	return new Promise((resolve, reject) => {
		// const locationRegex = RegExp(/^[0-9]{5,5}$/);
		// locationRegex.test(location) ? resolve(location) : reject(new Error('fail'));
		resolve(location);
	})
}

exports.message = (text) => {
	return new Promise((resolve, reject) => {
		console.log("HELLLO");
		resolve(text);
	})
}
