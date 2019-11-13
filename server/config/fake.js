var faker = require('faker/locale/fr');
var randomProfile = require('random-profile-generator');
var randomCity = require('./cities.js');

let orientation = {
    male: [
        { orientation: "heterosexual", identity: 17, mask: 32 },
        { orientation: "homosexual", identity: 10, mask: 8 },
        { orientation: "heterosexual", identity: 27, mask: 2 }
    ],
    female: [
        { orientation: "heterosexual", identity: 34, mask: 16 },
        { orientation: "homosexual", identity: 5, mask: 4 },
        { orientation: "heterosexual", identity: 39, mask: 1 }
    ]
}

function getPref(gender) {
    return (orientation[gender][Math.floor(Math.random() * 3)])
}

function FakeProfile(gender) {
    var i = -1
    var arr = []

    var ageMin = Math.floor(Math.random() * 50) + 18

    while (++i < 10) {

        let geo = randomCity()
        let male = randomProfile.profile(gender);
        let pref = getPref(gender)
        var obj = Object.assign({
            username: faker.internet.userName(),
            firstname: male.firstName,
            lastname: male.lastName,
            email: male.email,
            gender: male.gender,
            orientation: pref.orientation,
            bio: faker.lorem.paragraph(),
            age: male.age,
            ageMin: ageMin,
            ageMax: Math.floor(Math.random() * 50) + ageMin + 1,
            distance: Math.floor(Math.random() * 276) + 25,
            location: geo.location,
            latitude: geo.lat,
            longitude: geo.lng,
            avatar: faker.internet.avatar(),
            identity: pref.identity,
            mask: pref.mask
        })

        arr.push(obj)
    }

    return arr
}

module.exports = { FakeProfile }