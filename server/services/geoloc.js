"use strict";
const axios = require('axios');
const geoip = require("geoip-lite");

exports.findLocationByIp = () => {
	return new Promise((resolve, reject) => {
		axios.get('https://api.ipify.org/?format=json')
		.then((response) => {
			console.log(geoip.lookup(response.data.ip));
			resolve(geoip.lookup(response.data.ip));
		})
		.catch((err) => {
			reject(err);
		})
	})
}
