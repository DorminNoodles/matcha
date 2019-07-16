const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const geolib = require('geolib');


var urlencodedParser = bodyParser.urlencoded({extended: false});




router.get('/', urlencodedParser, (req, res) => {

	if (!req.query.fromLat || !req.query.fromLong || !req.query.toLat || !req.query.toLong) {
		res.status(400).send({"status": "error", "msg": "Bad Request"});
		return;
	}

	let coords = {
		'from': {
			'long': req.query.fromLong,
			'lat': req.query.fromLat
		},
		'to': {
			'long': req.query.toLong,
			'lat': req.query.toLat
		}
	}

	let distance = geolib.getDistance(
		{latitude: coords.from.lat, longitude: coords.from.long},
		{latitude: coords.to.lat, longitude: coords.to.long}
	)/ 1000;

	res.status(200).send({"status": "success", "msg": "", distance});

})

module.exports = router;
