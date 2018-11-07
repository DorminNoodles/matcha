const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwerty',
  database : 'matcha'
});

connection.connect(function(err){
	if (err) {
		console.log("error connection");
		return;
	}
});

connection.query('CREATE TABLE user (\
				id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
				firstname VARCHAR(30) NOT NULL,\
				lastname VARCHAR(30) NOT NULL,\
				email VARCHAR(50),\
				reg_date TIMESTAMP\
			)', function (error, results, fields) {
	if (error) throw error;
  	console.log('The solution is: ', results[0]);
});
