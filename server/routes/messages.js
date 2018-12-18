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
