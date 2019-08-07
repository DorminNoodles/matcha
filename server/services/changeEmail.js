const emitter = require('../emitter');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


class ChangeEmail {

	constructor() {
		emitter.on('userUpdate', this.sendChangeEmail);
	}


	sendChangeEmail(data) {
		console.log(' ');
		console.log('✉ CHANGE EMAIL ✉');
		console.log(' ');
		console.log('data => ', data);

		let token = jwt.sign({
			"id": data.id,
			"email": data.tmp_email
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

			let mailOptions = {
				from: '"Matcha 🔥" <matchaducancer@gmail.com>',
				to: data.tmp_email,
				subject: 'Confirm your new email',
				text: 'Hi!',
				html: 	'<html>\
							<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">\
							<body style="background-color: #B33070;font-family: Helvetica, sans-serif;">\
							<h1 style="color:white;text-align:center;padding-top:100px;font-size:70px;">Matcha</h1>\
							<img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Famour.2Fcouple.2Fmeetic-profil-optimiser-photo-description-44421.2F14759408-1-fre-FR.2Fmeetic-les-clefs-pour-optimiser-son-profil.2Ejpg/748x372/quality/90/crop-from/center/meetic-les-clefs-pour-optimiser-son-profil.jpeg" alt="Paris" style="width:50%;display: block;margin-left: auto;margin-right: auto;">\
							<div style="text-align:center;font-size:20px;color:white;">\
								<p> Welcome ' + data.firstname + '!	</p> \
								<p>Click on the following link to confirm change of email </p>\
								<a style="color:white;" href=http://localhost:3300/api/confirm/changeEmailConfirm?key=' + token +'>Confirm your Account</a>\
							</div>\
							<footer style="margin-top:200px;margin-bottom:50px;">\
								<hr />\
								<p style="font-style: italic;text-align: right;color:white;">© Matcha 2019</p>\
							</footer>\
							</body>\
						</html>'
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error)
					return console.log(error);
				console.log('Message sent: %s', info.messageId);
				console.log('Message sent to: %s', data.tmp_email);
			});
		});
	}
}

module.exports = new ChangeEmail();
