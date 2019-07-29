# Matcha


API

user

	post - /
		create user
		body:	username,
			firstname,
			lastname,
			password,
			email,
			age,
			distance,
			location

	get - /
		get authenticate user
		send: JSON

	get - /:id
		get user by id
		send: JSON

	put - user/:id


authenticate

	post - authenticate
		body :	user,
			password

avatar

	get - /:username
		get avatar url
		send: URL
