'use strict'

const foo = () => {

	const say = () => {
		console.log('JPP !')
	}

	const cry = () => {
		console.log(':\'\(')
	}

	return Object.create({
		say,
		cry
	})
}


let hello = foo();

hello.say();
