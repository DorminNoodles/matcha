const emitter = require('../emitter');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

class ActivationMail {

	constructor() {
		emitter.on('userRegistered', this.sendActivationMail);
		emitter.on('forgotPass', this.sendNewPass);
	}

	sendActivationMail(data) {
		console.log("les datas => ", data);

		console.log("SEND ACTIVATION MAIL");

		let token = jwt.sign({
			"username": data.username,
			"email": data.email
		}, process.env.JWT_KEY);

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

			var key = Math.floor(Math.random() * 900000000) + 100000000;
			console.log(token);
			let mailOptions = {
				from: '"Matcha 🔥" <matchaducancer@gmail.com>',
				to: data.email,
				subject: 'Confirm your account',
				text: 'Hi!',
				html: '<html>\
							<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">\
							<body style="background-color: #B33070;font-family: Helvetica, sans-serif;">\
							<h1 style="color:white;text-align:center;padding-top:100px;font-size:70px;">Matcha</h1>\
							<div style="text-align:center;font-size:20px;color:white;">\
								<p> Welcome ' + data.firstname + '!	</p> \
								<p>Click on the following link to validate your account </p>\
								<a style="color:white;" href='+ process.env.PORT_FRONT + 'user/confirm?login=' + data.username + '&key=' + token + '>Confirm your Account</a>\
							</div>\
							<footer style="margin-top:200px;margin-bottom:50px;">\
								<hr />\
								<p style="font-style: italic;text-align: right;color:white;">© Matcha 2019</p>\
							</footer>\
							</body>\
						</html>'
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}
				console.log('Message sent: %s', info.messageId);
				console.log('Message sent to: %s', data.email);
			});
		});
	}

	sendNewPass(data, token) {
		console.log(data);

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

			let mailOptions = {
				from: '"Matcha 🔥" <matchaducancer@gmail.com>',
				to: data.email,
				subject: 'Reser your password',
				text: 'Hi!',
				html: '<html>\
    						<body style="background-color: #B33070 ;font-family: Helvetica, sans-serif;font-style:oblique;">\
        					<h1 style="color:white;text-align:center;padding-top:100px;font-size:70px;">Matcha</h1>\
        					<img src="https://pngimage.net/wp-content/uploads/2018/06/forgot-password-images-png-2.png" alt="Paris" style="width:50%;display: block;margin-left: auto;margin-right: auto;">\
        					<div style="text-align:center;font-size:25px;">\
        						<br />\
        						Forgot your password?\
								<br />\
           						No worries, here is a new one:<br />\
           						<a href='+ process.env.PORT_FRONT + 'user/password?token=' + token + '>RESET MY PASSWORD</a>\
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
	}
}

module.exports = new ActivationMail();
