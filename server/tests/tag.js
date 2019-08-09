const tagsModel = require('../models/tagsModel');




tagsModel.get(1)
.then((res) => {
	console.log(res);
})
.catch((err) => {
	console.log(err);
});
