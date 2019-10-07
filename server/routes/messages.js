const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const messages = require('../controllers/messages');
const jwtToken = require('../services/jwtToken');


var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/', urlencodedParser, (req, res) => {

	console.log(req.body);
	console.log(req.body.from);

	messages.new({
		from : req.body.from,
		to: req.body.to,
		body: req.body.body
	})
	.then(() => {

	})
	.catch(() => {

	})
	res.send('pouet');

})

router.get('/recent', urlencodedParser, (req, res) => {
	messages.getRecentsMessages({from: req.query.from, to: req.query.to})
	.then((result) => {
		res.send(result);
	})
	.catch((err) => {
		res.send(err);
	})
})

// router.get('/chat', urlencodedParser, (req, res) => {
// 	if (req.query.id == 42) {
// 		io.on('connection', function(socket){
// 			socket.removeAllListeners()
// 			socket.on('chat message', (msg) => {
// 				console.log(msg);
// 				// io.emit('from server' + 42, msg);
// 				// console.log("received on server : " + msg);
// 				messages.getFromChat({id: req.query.id, msg: msg})
// 				.then(() => {
// 					console.log("ok");
// 				})
// 			})
// 		});
// 	}
// 	res.sendFile(__dirname + '/socketTest.html');
// })

module.exports = router;
