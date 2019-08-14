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

exports.findGps = (data) => {
	return new Promise((resolve, reject) => {

		let coordGps = {
			lng : 0,
			lat : 0
		};

		this.findGpsByAddress(data.location)
		.then((result) => {

			coordGps.lng = result.lng;
			coordGps.lat = result.lat;

			userModel.findUserByUsername(data.username)
			.then((res) => {
				console.log("findUSERBYUSERNAME : ");
				console.log(res);

				userModel.saveGps(res.id, coordGps.lng, coordGps.lat)
				.then(() => {
					console.log("geoloc save by address");
					resolve();
				})
				.catch(() => {
					reject({"status": "error", "msg": "Error database with gps coordinate !"});
				})
			})
		})
		.catch(() => {

			this.findLocationByIp()
			.then((res) => {

				coordGps.lat = res.ll[0];
				coordGps.lng = res.ll[1];

				userModel.findUserByUsername(data.username)
				.then((res) => {
					console.log("findUSERBYUSERNAME : ");
					console.log(res);

					userModel.saveGps(res.id, coordGps.lng, coordGps.lat)
					.then(() => {
						console.log("geoloc save by ip");
						resolve();
					})
					.catch(() => {
						reject({"status": "error", "msg": "Error database with gps coordinate !"});
					})

				})
			})
		})
	})
}
