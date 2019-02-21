const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const chat = require('../controllers/chat');

var urlencodedParser = bodyParser.urlencoded({extended: false});

// router.post('/', urlencodedParser, (req, res) => {
// 	console.log("chat route");
// 	chat.new({
// 		msg: req.body.msg,
// 		liker: req.body.liker,
// 		liked: req.body.liked
// 	})
// 	.then((resultat) => {
// 		console.log("message sended !");
// 		res.send({status: "success", msg: "message sended"});
// 	})
// 	.catch((err) => {
// 		res.send(err);
// 	});
// })
//
// router.get('/', urlencodedParser, (req, res) => {
// 	console.log("chat route");
// 	chat.new()
// 	.then(() => {
// 		console.log("then");
// 	})
// 	res.send("chut");
// })
router.post('/connection', urlencodedParser, (req, res) => {
	console.log("chat route");
	console.log(req.body);
	chat.chatSubscribe(req.body.userID)
	.then(() => {
		console.log("then");
	})

	chat.chatSubscribe(req.body.userID)


	res.send("chut");
})

module.exports = router;
