// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
//
// const block = require('../controllers/block');
//
// var urlencodedParser = bodyParser.urlencoded({extended: false});
//
// router.post('/', urlencodedParser, (req, res) => {
// 	console.log(req.token);
// 	if (!req.token) {
// 		res.status(401).send({"status": "error", "msg": "bad authentification"});
// 		return;
// 	}
// 	// if (req.token.id != req.body.blocker) {
// 	// 	res.status(403).send({"status": "error", "msg": "access refused"});
// 	// 	return;
// 	// }
// 	block.new(req.token.id, req.body.blocked)
// 	.then((result) => {
// 		res.send(result);
// 	})
// 	.catch((err) => {
// 		console.log("wtf");
// 		res.send(err);
// 	});
// })
//
// router.get('/', urlencodedParser, (req, res) => {
//
// })
//
//
// module.exports = router;
