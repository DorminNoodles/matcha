const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const messages = require('../controllers/messages');
const jwtToken = require('../services/jwtToken');


var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.token);
	if (req.token)
		console.log("token OK");
	else
		res.send("error");

	//On peut envoyer des messages si
	//le to exist
	//le from correspon au token et on est connecte
	//le to est dans nos matchs ? oui



	// const token = jwtToken.get(req.headers['authorization']);
	// var decoded = jwt.verify(token, 'shhhhh', (err, decoded) => {
	// 	if (err) {
	// 		res.send('error');
	// 	} else {
	// 		messages.new(decoded, req.body).then((pouet) => {
	// 			console.log(pouet);
	// 		});
	// 	}
	// });
	// if (token) {
	// 	})
	//
	// 	console.log('save message in db');
	// 	console.log('create new notif');
	// 	console.log('(service notif check if user connected and save )');
	// } else {
	// 	res.send('error find code');
	// }
})

module.exports = router;
