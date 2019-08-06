var assert = require('assert');

const expect = require('chai');
const request = require('supertest');

const userModel = require('../models/userModel');

const app = require('../app.js')




describe('test1', function() {

	it('error in username', (done) => {

		let data = {
			username: 'Patooo@',
		};

		let filter = [
			'username',
		]

		userModel.checkDataV2(data, filter)
		.then(() => {
			done(new Error("should failed"));
		})
		.catch((error) => {
			if (error.username === 'Username Bad Character!')
				done();
			else
				done(new Error("Username error not detected"));
		})
	});

	it('no error in username', (done) => {
		let data = {
			username: 'Patooo',
		};

		let filter = [
			'username',
		]

		userModel.checkDataV2(data, filter)
		.then(() => {
			done();
		})
		.catch((error) => {
			done(new Error("Username error not detected"));

		})
	});
});
