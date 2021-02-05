/*
Lookup address details in BWS dump
*/

require('dotenv').config();

var async = require('async');
var mysql = require('mysql');
var fs = require('fs');
var parse = require('csv-parse');

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

	console.log('MySql connected as id ' + connection.threadId);
});


// Fetch BWS data
fs.readFile('bws.txt', function(err, data) {
	if(err) {
		console.err(err);
		process.ext();
	}

	var bws = [];
	var parser = parse({delimiter: '\t'});

	parser.on('readable', function() {
		while(record = parser.read()) {
			bws.push(record);
		}
	});

	parser.on('finish', function() {
		async.map(bws, updateStore, function (err, result) {
			console.log('Done! Matched ' + found + ' stores');
			connection.destroy();
		});
	});

	parser.write(data);
	parser.end();

});

function updateStore(bws, step) {
	connection.query('SELECT * FROM stores WHERE chain = "BWS" AND postcode = ? AND title = ?', [bws[3], bws[0]], function(err, rows) {
		if (err) {
			console.error(err);
			step();
		} else if (rows.length) {
			found++;
			var address = bws[2] + ", " + rows[0].suburb + ", " + bws[3] + ", " + bws[1] + ", " + "Australia";
			var query1 = connection.query('UPDATE stores SET google_address = ?, state = ? WHERE id = ?', [address, bws[1], parseInt(rows[0].id)], function(err, rows) {
				if(err) {
					console.log(err);
				}
				step();
			});
		} else {
			step();
		}
	});
}
