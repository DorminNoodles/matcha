class Fortest{

	hello(){
		return new Promise((resolve, reject) => {

			if (1)
			{
				console.log("in the promise");
				resolve();
				return;
			}
			else {
				console.log("+reject+");
				return reject;
			}

		})

	}

}

module.exports = Fortest;
