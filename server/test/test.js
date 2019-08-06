var assert = require('assert');

const userModel = require('../models/userModel');




describe('test1', function() {

	it('error in username', (done) => {

		userModel.checkDataV2({
			username: "Patooo@",
			firstname: "Jack",
		})
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
});
