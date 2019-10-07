const gpsByIp = require('../services/geoloc');


gpsByIp.findGpsByAddress('Paris')
.then ((gps) => {
	console.log(gps);
})
