/*
Output Stores as a TSV
*/

require('dotenv').config();
var tsv = require('tsv');
var mysql = require('mysql');

// connect to DB
var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database : process.env.DB_NAME
});

// Connect to MySQL
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		process.exit();
	}

	console.log('MySql connected as id ' + connection.threadId);
});

// Fetch stores which have already been geocoded
var query = connection.query('SELECT * FROM stores WHERE google_json IS NOT NULL', function(err, rows) {
	if (err) {
		console.error(err);
		process.exit();
	}

	var stores = rows.map(function(store) {
		var address = formatAddress(store.google_json);
		if (address) {
			console.log(address);
		}
	});
});


function formatAddress(json) {
	var data = JSON.parse(json);
	console.dir(data);
	return data.formatted_address;
}
