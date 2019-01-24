"use strict";
const axios = require('axios');
const geoip = require("geoip-lite");
const geocoder = require("geocoder");

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

exports.findGpsByAddress = (data) => {
	return new Promise((resolve, reject) => {
		geocoder.selectProvider("geonames", {"username":"dormin"});
		geocoder.geocode(data, (err, response) => {
			if (response)
				resolve({lng: response.geonames[0].lng, lat: response.geonames[0].lat});
			else
				reject(err);

		});
	})
}
