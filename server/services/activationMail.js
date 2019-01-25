const emitter = require('../emitter');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class ActivationMail {

	constructor() {
		emitter.on('userRegistered', this.sendActivationMail) ;
		emitter.on('forgotPass', this.sendNewPass);
	}

	sendActivationMail(data) {
		console.log(data);

		var token = jwt.sign({
			"username": data.username,
			"email": data.email
		}, 'shhhhh');

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
			console.log(token);
		    let mailOptions = {
				from: '"Jack & Michael 🔥" <matchaducancer@gmail.com>',
				to: data.email,
				subject: 'Hello',
				text: 'Hello world?',
				html: 	'<html>\
							<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">\
							<body style="background-color: #FF6B6C;font-family: Helvetica, sans-serif;font-style:oblique;">\
							<h1 style="color:white;text-align:center;padding-top:100px;font-size:70px;">Matcha</h1>\
							<img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Famour.2Fcouple.2Fmeetic-profil-optimiser-photo-description-44421.2F14759408-1-fre-FR.2Fmeetic-les-clefs-pour-optimiser-son-profil.2Ejpg/748x372/quality/90/crop-from/center/meetic-les-clefs-pour-optimiser-son-profil.jpeg" alt="Paris" style="width:50%;display: block;margin-left: auto;margin-right: auto;">\
							<div style="text-align:center;font-size:25px;">\
								<br />\
								Welcome ' + data.firstname + '!\
								<br />\
								CLICK ON THE FOLLOWING LINK TO VALIDATE YOUR ACCOUNT: <br />\
								<a href=http://localhost:3000/api/user/confirm?login='+ data.username +'&key='+ token +'>Confirm your Account</a>\
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
        						Forgot your password?\
								<br />\
           						No worries, here is a new one:<br />\
           						<a href=http://localhost:3000/api/user/password?token='+ token +'>RESET MY PASSWORD</a>\
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
