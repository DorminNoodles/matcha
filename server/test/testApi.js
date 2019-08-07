const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('supertest');

const userModel = require('../models/userModel');

const app = require('../app.js');

describe('post user', () => {
	it ('Creating new user', (done) => {
		request(app).post('/api/user')
		.field('username', 'Patrick')
		.field('firstname', 'Charles')
		.field('lastname', 'Jericho')
		.field('age', 34)
		.field('email', 'tototototo@gmailto.com')
		.field('password', 'Xcb#e21')
		.field('distance', 3)
		.field('bio', 'zizi')
		.field('location', 'Rouen')
		.field('gender', 'male')
		.field('orientation', 'bisexual')
		.field('ageMin', 20)
		.field('ageMax', 65)
		.attach('avatar', 'test/toto.jpg')
		.then((res) => {
			const body = res.body;

			expect(body).to.contain.property("status");
			assert.equal(body.status, 'success', 'Return success');

			done();
		})
		.catch((err) => {
			console.log('error >>> ', err);
			done(err);
		})

	})
})

describe('post user', () => {
	it ('Creating user with error', (done) => {
		request(app).post('/api/user')
		.field('username', 'Patrick')
		.field('firstname', 'Charles$')
		.field('lastname', 'Jericho!')
		.field('age', 34)
		.field('email', 'tototototo@gmailto.com')
		.field('password', '1234')
		.field('distance', 3)
		.field('bio', 'zizi')
		.field('location', 'Rouen')
		.field('gender', 'male')
		.attach('avatar', 'test/toto.jpg')
		.then((res) => {
			const body = res.body;

			expect(body).to.contain.property("status");
			expect(body.data).to.contain.property("username");
			expect(body.data).to.contain.property("email");
			expect(body.data).to.contain.property("firstname");
			expect(body.data).to.contain.property("lastname");
			expect(body.data).to.contain.property("password");
			assert.equal(body.status, 'error', 'Return error');
			done();
		})
		.catch((err) => {
			console.log('error >>> ', err);
			done(err);
		})

	})
})

describe('post user', () => {
	it ('Creating user without optional fields', (done) => {
		request(app).post('/api/user')
		.field('username', 'Patricko')
		.field('firstname', 'Charles')
		.field('lastname', 'Jericho')
		.field('age', 34)
		.field('email', 'tototo4777584@gmailto.com')
		.field('password', '1234@c11L')
		.field('distance', 5)
		.field('bio', 'zizi')
		.field('gender', 'male')
		.attach('avatar', 'test/toto.jpg')
		.then((res) => {
			const body = res.body;

			console.log('ffffff ', body);

			expect(body).to.contain.property("status");
			assert.equal(body.status, 'success', 'Return success');
			done();
		})
		.catch((err) => {
			console.log('error >>> ', err);
			done(err);
		})

	})

	it ('Get user creating without optional fields', (done) => {
		userModel.findUserByUsername('Soso')
		.then((data) => {
			// const body = response.body;

			console.log('8888>>>>>>> ', data);

			expect(data).to.contain.property("username");
			expect(data).to.contain.property("id");
			expect(data).to.contain.property("mailValidation");
			expect(data).to.contain.property("email");
			expect(data).to.contain.property("gender");
			expect(data).to.contain.property("orientation");
			expect(data).to.contain.property("location");
			expect(data).to.contain.property("latitude");
			expect(data).to.contain.property("longitude");
			expect(data).to.contain.property("age");
			expect(data).to.contain.property("avatar");


			assert.equal(data.username, 'Patricko');
			assert.equal(data.email, 'tototo4777584@gmailto.com');
			assert.equal(data.age, 34);
			assert.equal(data.gender, 'male');
			assert.equal(data.orientation, 'bisexual');
			assert.equal(data.distance, 5);

			done();
		})
		.catch((err) => {
			console.log('error >>> ', err);
			done(err);
		})

	})
})
