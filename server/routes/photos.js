const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const router = express.Router();

const photos = require('../controllers/photos');
// const Photos = require('../services/photos');
var urlencodedParser = bodyParser.urlencoded({extended : false})

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	    cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.jpg')
	}
})
var upload = multer({ storage: storage });

router.post('/', upload.single('photo'), urlencodedParser, (req, res) => {
	if (!req.file)
		res.status(400).send({"status": "error", "msg" : "No photo"});
	else if (req.token) {
		photos.new(req.token.id, req.file.filename)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
	}
	else {
		res.status(400).send({"status": "error", "msg" : "not connected"});
	}
})

router.get('/', urlencodedParser, (req, res) => {
	if (req.token) {
		photos.get(req.token.id)
		.then((result) => {
			res.status(200).send(result);
		})
		// res.status(200).send("");
	}
	else {
		res.status(400).send({"status": "error", "msg" : "not connected"});
	}
})

module.exports = router;
