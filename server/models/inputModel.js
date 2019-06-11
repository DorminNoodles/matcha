const userModel = require('../models/userModel.js');

exports.username = (username) => {
	return new Promise((resolve, reject) => {
		const usernameRegex = RegExp(/^[a-zA-Z0-9]*$/);
		if (username && usernameRegex.test(username))
			resolve(username);
		else
			reject({"status": "error", "key": "username", "msg": "Bad Username !"});
	})
}

exports.usernameAlreadyTaken = (username) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(username)
		.then(() => {
			reject({"status": "error", "key": "username", "msg": "Username already taken !"});
		})
		.catch((err) => {
			resolve(username);
		})
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		const passwordRegex = RegExp(/^\S*(?=\S{6,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/);
		if (passwordRegex.test(password))
			resolve(password)
		else
			reject({"status": "error", "key": "password", "msg": "Bad Password !"});
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		if (!firstname.match(/^[A-zÀ-ÿ\-\. ]{2,23}$/))
			reject({"status": "error", "key": "firstname", "msg": "Firstname bad Character !"});
		else if (!firstname.match(/^.{1,32}$/))
			reject({"status": "error", "key": "firstname", "msg": "Firstname bad size !"});
		else
			resolve(firstname);
	})
}

exports.lastname = (lastname) => {
	return new Promise((resolve, reject) => {
		if (!lastname.match(/^[A-zÀ-ÿ\-\. ]{2,23}$/))
			reject({"status": "error", "key": "lastname", "msg": "Lastname bad Character !"});
		else if (!lastname.match(/^.{1,32}$/))
			reject({"status": "error", "key": "lastname", "msg": "Lastname bad size !"});
		else
			resolve(lastname);
	})
}

exports.email = (email) => {
	return new Promise((resolve, reject) => {
		var reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (email && email.match(reg))
			resolve(email);
		else
			reject({"status": "error", "key": "email", "msg": "Bad email !"});
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

exports.emailAlreadyTaken = (email) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByEmail(email)
		.then(() => {
			reject({"status": "error", "key": "email", "msg": "Email already taken !"});
		})
		.catch((err) => {
			resolve(email);
		})
	})
}
