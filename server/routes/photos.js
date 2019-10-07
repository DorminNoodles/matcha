const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const router = express.Router();

const photos = require('../controllers/photos');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
router.post('/', urlencodedParser, (req, res) => {
	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });

	if (!req.files)
		res.status(400).send({ "status": "error", "msg": "No photo" });
	else
		photos.new(req.token.id, req.files.file, req.body.prev)
			.then((result) => {
				res.status(200).send(result);
			})
			.catch((err) => {
				res.status(400).send(err);
			})
})

// send token get photo-1549917933804.jpg
//acces with localhost:3000/pictures/user6/avatar-1549917933804.jpg
router.get('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });
	else {
		photos.get(req.query.id)
			.then((result) => {
				res.status(200).send(result);
			})
			.catch((err) => {
				res.status(500).send({ "status": "error", "msg": "error server" });
			})
	}
})

//send token + filename (photo-39384364726478728.jpg)
router.delete('/', urlencodedParser, (req, res) => {

	if (!req.token)
		res.status(401).send({ "status": "error", "msg": "bad authentification" });
	else if (!req.body.filename)
		res.status(400).send({ "status": "error", "msg": "no query" });
	else {
		photos.delete(req.token.id, req.body.filename)
			.then((result) => { res.status(200).send(result); })
			.catch((err) => { res.status(500).send(err); })
	}
})

module.exports = router;
