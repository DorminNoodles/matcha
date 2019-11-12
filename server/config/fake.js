var faker = require('faker/locale/fr');
var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomAddress = faker.address; // random contact card containing many properties
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

var randomProfile = require('random-profile-generator');
var profile = randomProfile.profile();

function lala() {

    var obj = {}

    console.log(randomCard)
    console.log("=========")
console.log(profile);

    // console.log(faker.fake("{{name.lastName}} {{name.firstName}}, {{internet.userName}} {{internet.avatar}}, {{address.latitude}} {{address.longitude}} {{address.city}} {{address.country}}"));
}

lala()