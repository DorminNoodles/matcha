"use strict";
const locationModel = require('../models/locationModel');

exports.findLocationByIp = () => {
	return new Promise((resolve, reject) => {
		locationModel.findLocationByIp().then((res) => {
			locationModel.findLocationByLatLong(res)
				.then((res) => { resolve(res) })
				.catch((err) => { reject("non"); })
		}).catch((err) => { reject("non"); })
	})
}