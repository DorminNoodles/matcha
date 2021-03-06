const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const likes = require('../controllers/likes');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, (req, res) => {
	likes.getAll(req.body.liker)
		.then((result) => { res.send(result); })
		.catch((err) => { res.send(err); });
})

module.exports = router;
