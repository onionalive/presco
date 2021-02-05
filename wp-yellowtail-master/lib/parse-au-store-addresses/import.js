
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
fs.readFile('stores.txt', function(err, data) {
	if(err) {
		console.err(err);
		process.ext();
	}

	var stores = [];
	var parser = parse({
		delimiter: '\t',
		rtrim: true,
		ltrim: true,
		columns: true
	});

	parser.on('readable', function() {
		while(record = parser.read()) {
			stores.push(record);
		}
	});

	parser.on('finish', function() {
		async.map(stores, insertStore, function (err, result) {
			console.log('Done! Matched ' + found + ' stores');
			connection.destroy();
		});
	});

	parser.write(data);
	parser.end();

});

function insertStore(store, step) {
	found++;
	connection.query('INSERT INTO stores SET ?', store, function (err, result) {
		if(err) {
			console.error(err);
			process.exit();
		} else {
			step();
		}
	});
}
