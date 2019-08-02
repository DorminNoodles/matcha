
API

user

	post - register
	get - user/:id
	put - user/:id


authenticate

	post
		body :	user,
				password

avatar
	get/:username
		params : username


Binary Mask:

	hetero homme	01 00 01	17
	hetero femme	10 00 10	34
	homo homme		00 10 10	10
	homo femme		00 01 01	5
	bi homme		01 10 11	27
	bi femme		10 01 11	39
