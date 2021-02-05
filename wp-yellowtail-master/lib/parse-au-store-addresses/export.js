
require('dotenv').config();

var mysql = require('mysql');

var found = 0;

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
});

console.log('Store Name\tChain Name\tAddress\tSuburb\tState\tPostcode\tPhone\tGeolocation')

connection.query('SELECT * FROM stores', function(err, rows) {
	if (err) {
		console.error(err);
		process.exit();
	}

	rows.forEach(function (store) {
		var parts = [
			store.store_name,
			store.chain_name,
			store.address,
			store.suburb,
			store.state,
			store.postcode,
			store.phone,
			getGeolocation(store)
		];

		console.log(parts.join('\t'));
	});

	connection.destroy();
	process.exit();
});

function getGeolocation(store) {
	if (!parseInt(store.lat)) {
		return;
	}

	return store.lat + "," + store.lng;

	//return "<a href='https://www.google.com.au/maps/@" + store.lat + "," + store.lng + ",16z'>" + store.lat + ", " + store.lng + "<a/>";
}
