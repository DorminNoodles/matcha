const mysql = require('promise-mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.findUserByUsername = (username) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT username FROM users WHERE username=\''+ username +'\'');
			conn.end();
			return result;
		}).then((result) => {
			if (result[0])
				resolve();
			else {
				console.log("IS NOT HERE");
				reject();
			}
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.findUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT email FROM users WHERE email=\''+ email +'\'');
			conn.end();
			return result;
		}).then((result) => {
			if (result[0])
				resolve(email);
			else
				reject();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.saveUser = (data) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			bcrypt.hash(data.password, 10, function(error, hash) {
				conn.query("INSERT INTO users (username, password, firstname, lastname, email, gender, orientation)\
						VALUES ('" + data.username + "', '" + hash + "', '" + data.firstname + "',\
						'" + data.lastname + "', '" + data.email + "', '" + data.gender + "', '" + data.orientation + "')");
				nodemailer.createTestAccount(() => {
    				let transporter = nodemailer.createTransport({
        				host: 'smtp.gmail.com',
        				port: 465,
        				secure: true,
        				auth: {
            				user: 'matchaducancer@gmail.com',
            				pass: 'Suceboule42'
        				}
    				});

    				var key = Math.floor(Math.random()*900000000) + 100000000;
				    let mailOptions = {
        				from: '"Fred Foo 👻" <matchaducancer@gmail.com>',
        				to: data.email,
        				subject: 'Hello',
        				text: 'Hello world?',
        				html: '<html><body><div align=center> \
								CLICK ON THE FOLLOWING LINK TO VALIDATE YOUR ACCOUNT: <BR />\
								<a href=http://localhost:8080/confirm?login='+ data.username +'&key='+ key +'>Confirm your Account</a> \
								</div></body></html>'
    				};

				    transporter.sendMail(mailOptions, (error, info) => {
        				if (error) {
        				    return console.log(error);
        				}
        				console.log('Message sent: %s', info.messageId);
    				});
				});
			});
			var res = conn.query('SELECT * FROM users WHERE username=\''+ data.username +'\'');
			console.log(res);
		}).then((res) => {
				console.log("success database");
		}).catch((err) => {
				reject(err);
		})
	})
}

exports.findUserByID = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE id=\''+ id +'\'');
			conn.end();
			return (result);
		}).then((result) => {
			resolve(result);
		}).catch((error) => {
			reject(error);
		})
	})
}