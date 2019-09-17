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

// send token + photo file
router.post('/', upload.single('photo'), urlencodedParser, (req, res) => {
	
	if (!req.files)
		res.status(400).send({"status": "error", "msg" : "No photo"});
	else if (req.token) {
		photos.new(req.token.id, req.files.file)
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

// send token get photo-1549917933804.jpg
//acces with localhost:3000/pictures/user6/avatar-1549917933804.jpg
router.get('/', urlencodedParser, (req, res) => {
	if (req.token) {
		photos.get(req.token.id)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({"status": "error", "msg" : "error server"});
		})
	}
	else {
		res.status(400).send({"status": "error", "msg" : "not connected"});
	}
})

//send token + filename (photo-39384364726478728.jpg)
router.delete('/', urlencodedParser, (req, res) => {
	if (req.token && req.query.filename) {
		photos.delete(req.token.id, req.query.filename)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		})
	}
	else {
		res.status(400).send({"status": "error", "msg" : "not connected"});
	}
})

module.exports = router;
