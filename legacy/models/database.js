const mysql = require('mysql');

var connection = mysql.createConnection({
  port     : process.env.PORT,
  host     : 'localhost',
  user     : 'root',
  password : 'qwerty',
  database : 'matcha'
});

connection.connect(function(err){
	if (err)
		return;
});

module.exports = connection;
