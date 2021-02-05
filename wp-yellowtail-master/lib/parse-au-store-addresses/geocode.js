/*
Iterate over store in the database
Geocode the ones which are not yet geocoded.

Note: Google imposes a limit of 2500 requests/day.
Set your limit in the .env file.
*/

require('dotenv').config();
var async = require('async');

var mysql = require('mysql');
var googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_API_KEY
});

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

// Fetch stores which require geocoding
var query = connection.query('SELECT * FROM stores WHERE lat IS NULL LIMIT ?', [parseInt(process.env.GEOCODE_LIMIT)], function(err, rows) {
	if (err) {
		console.error(err);
		process.exit();
	}

	async.mapSeries(rows, geocodeStore, function(err, results) {
		console.log("\nAll stores geocoded");
		connection.destroy();
		process.exit();
	});
});


function geocodeStore(store, step) {
	var search = store.address + ", " + store.suburb + ", " + store.state + " " + store.postcode + ", Australia";
	console.log('Searching for "' + search + '"');
	googleMapsClient.geocode({
		address: search
	}, function(err, response) {
		if (err) {
			console.log(err)
			step();
		} else {
			if(response.json.results.length) {
				var result = response.json.results[0];
				updateStore(store.id, result.geometry.location, step);
			} else {
				updateStore(store.id, {
					lat: 0,
					lng: 0
				}, step);
			}
		}
	});
}

function updateStore(storeId, coords, step) {
	connection.query('UPDATE stores SET lat = ?, lng = ? WHERE id = ?', [coords.lat, coords.lng, storeId], function (err, result) {
		if(err) {
			console.error(err);
		}

		step();
	});
}
