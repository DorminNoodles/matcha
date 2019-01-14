


exports.getUsers = () => {
	return new Promise((resolve, reject) => {
		resolve({
			0: {
				id: 2,
				username: 'Galinette',
				photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Gal_Gadot_%26_Chris_Pine_%2827976790524%29_%28cropped%29.jpg/480px-Gal_Gadot_%26_Chris_Pine_%2827976790524%29_%28cropped%29.jpg'
			},
			1: {
				id: 4,
				username: 'Kevine',
				photo: 'https://vignette.wikia.nocookie.net/marvelstudios/images/e/ef/46925E6800000578-5104735-Auburn_beauty_Karen_Gillan_poses_in_a_semi_sheer_lace_blouse_as_-a-113_1511350796748.jpg/revision/latest/scale-to-width-down/310?cb=20180430193817&path-prefix=fr'
			}
		});
	})
}
