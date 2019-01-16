const userModel = require('../models/userModel');

userModel.findUserByUsername('Grinch')
.then((res) => {
	console.log('Grinch existe');
})
.catch((err) => {
	console.log('Grinch n existe pas');
})

userModel.findUserByUsername('Morpion')
.then((res) => {
	console.log('Morpion existe');
})
.catch((err) => {
	console.log('Morpion n existe pas');
})
