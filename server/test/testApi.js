const expect = require('chai');
const request = require('supertest');

const userModel = require('../models/userModel');

const app = require('../app.js');


describe('post user', () => {

	it ('Creating new user', (done) => {
		request(app).post('/api/user')
		.send({ username: 'Patrick'})
		.then((res) => {
			const body = res.body;

			expect(body).to.contain.property("status");
			expect(body).to.contain.property("data");
			done();
		})
		.catch((err) => {
			done(err);
		})

	})

})


// {
//     "status": "error",
//     "data": {
//         "username": "Username already taken !",
//         "password": "Bad Password !",
//         "firstname": "Firstname missing !",
//         "lastname": "Lastname missing !",
//         "email": "Bad email !",
//         "location": "Location missing !",
//         "gender": "Gender missing !",
//         "age": "Age missing !",
//         "orientation": "Orientation not exist !",
//         "avatar": "Avatar error !",
//         "bio": "Bio missing !",
//         "distance": "Distance missing !"
//     }
// }
