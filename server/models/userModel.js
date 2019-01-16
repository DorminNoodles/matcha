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
			var result = conn.query('SELECT username, id, email FROM users WHERE username=\''+ username +'\'');
			conn.end();
			return result;
		}).then((result) => {
			if (result[0])
				resolve(result[0]);
			else {
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
		bcrypt.hash(data.password, 10)
		.then((hash) => {
			data.password = hash;
			return mysql.createConnection({
					host: 'localhost',
					user: 'root',
					password: 'qwerty',
					database: 'matcha'
				})
		})
		.then ((conn) => {
			return conn.query("INSERT INTO users (username, password, firstname, lastname, email, gender, orientation)\
					VALUES ('" + data.username + "', '" + data.password + "', '" + data.firstname + "',\
					'" + data.lastname + "', '" + data.email + "', '" + data.gender + "', '" + data.orientation + "')");
		})
		.then((res) => {
			resolve('User saved');
		})
		.catch((err) => {
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

exports.checkLogin = (data, response) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT password FROM users WHERE username=\''+ data.username +'\'');
			return result;
		}).then((result) => {
			bcrypt.compare(data.password, result[0].password).then((res) => {
				if (res) {
					resolve(response);
				}
				else{
					reject();
				}
			}).catch((error) => {
				reject();
				console.log(error);
			})
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.forgotPassword = (data, response) => {
	return new Promise((resolve, reject) => {
		findUserByEmail(data)
		.then(() => {
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
        			from: '"Jack & Michael 🔥" <matchaducancer@gmail.com>',
        			to: data.email,
        			subject: 'Hello',
        			text: 'Hello world?',
        			html: 	'<html>\
    							<body style="background-color: #FF6B6C;font-family: Helvetica, sans-serif;font-style:oblique;">\
        						<h1 style="color:white;text-align:center;padding-top:100px;font-size:70px;">Matcha</h1>\
        						<img src="https://pngimage.net/wp-content/uploads/2018/06/forgot-password-images-png-2.png" alt="Paris" style="width:50%;display: block;margin-left: auto;margin-right: auto;">\
        						<div style="text-align:center;font-size:25px;">\
        							<br />\
        							Forgot your password, ' + data.firstname + '?\
									<br />\
            						No worries, here is a new one: <br />\
            						<p>'+ key +'</p>\
            					</div>\
        						<footer style="margin-top:200px;margin-bottom:50px;">\
            						<hr />\
            						<p style="font-style: italic;text-align: right;">© Matcha 2019</p>\
        						</footer>\
    							</body>\
							</html>'
    			};
			    transporter.sendMail(mailOptions, (error, info) => {
       				if (error) {
       				    return console.log(error);
       				}
       				console.log('Message sent: %s', info.messageId);
   				});
			});
		});
		var res = conn.query('UPDATE ')
	}).catch((error) => {
		reject(error);
	})
}
