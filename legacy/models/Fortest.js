class Fortest{
	hello(str){
		return new Promise((resolve, reject) => {

			setTimeout(()=>{

				if (1)
				{
					console.log("in the promise");
					resolve(str);
					return;
				}
				else {
					console.log("+reject+");
					reject();
					return;
				}

			}, 10)


		})

	}
}

module.exports = Fortest;
