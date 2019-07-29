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

users

	get - /
		get users
		query: distance,
			sort: (distance, score),


authenticate

	post - authenticate
		body :	user,
			password

avatar

	get - /:username
		get avatar url
		send: URL


Binary Mask:

	hetero homme	01 00 01	17
	hetero femme	10 00 10	34
	homo homme	00 10 10	10
	homo femme	00 01 01	5
	bi homme	01 10 11	27
	bi femme	10 01 11	39
