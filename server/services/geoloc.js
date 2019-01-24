"use strict";
const axios = require('axios');
const geoip = require("geoip-lite");
const geocoder = require("geocoder");
const userModel = require('../models/userModel');


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

exports.getGps = (data) => {
	return new Promise((resolve, reject) => {
		// console.log("hello &&&&&*&&&");
		console.log(data);
		if (data.location) {
			this.findGpsByAddress(data.location)
			.then((result) => {
				console.log("FIND BY GPS ADRRESSE");
				console.log(data.username);
				userModel.findUserByUsername(data.username)
				.then((res) => {
					console.log("findUSERBYUSERNAME : ");
					console.log(res);
					userModel.saveGps(res.id, result.lng, result.lat)
					.then(() => {
						resolve();
					})
					.catch(() => {
						reject();
					})
				})
				.catch(() => {
					console.log("findUSERBYUSERNAME : ");
					reject();
				})
			})
			.catch((err) => {
				reject();
			})
		}
		resolve();
	})
}
