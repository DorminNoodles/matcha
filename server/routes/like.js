const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const likes = require('../controllers/likes');


var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {
	console.log('post likes');
	console.log(req.body);
	console.log("Token : ");
	console.log(req.token);
	likes.new(req.body.liker, req.body.liked)
	.then((result) => {
		res.send(result);
	})
	.catch((err) => {
		res.send(err);
	});
})
router.delete('/', urlencodedParser, (req, res) => {
	// console.log('post likes');
	// console.log(req.body);
	// console.log("Token : ");
	// console.log(req.token);
	// likes.new(req.body.liker, req.body.liked)
	// .then((result) => {
	// 	res.send(result);
	// })
	// .catch((err) => {
	// 	res.send(err);
	// });
})

module.exports = router;
