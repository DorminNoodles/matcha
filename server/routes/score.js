const express = require('express');
const bodyParser = require('body-parser');
const likesModel = require('../models/likesModel');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.get('/', urlencodedParser, (req, res) => {
	likesModel.getLikes(req.query.id)
	.then((result) => {
		res.status(200).send(result);
	})
	.catch((err) => {
		res.status(500).send({"status": "error", "msg" : "error server"});
	})
})

module.exports = router;
