/*
Lookup address details in Members dump
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
fs.readFile('members.txt', function(err, data) {
	if(err) {
		console.err(err);
		process.ext();
	}

	var members = [];
	var parser = parse({delimiter: '\t'});

	parser.on('readable', function() {
		while(record = parser.read()) {
			members.push(record);
		}
	});

	parser.on('finish', function() {
		async.map(members, updateStore, function (err, result) {
			console.log('Done! Matched ' + found + ' stores');
			connection.destroy();
		});
	});

	parser.write(data);
	parser.end();

});

function updateStore(member, step) {
	member[0] = removePostfix(member[0]).trim();
	connection.query('SELECT * FROM stores WHERE chain = "" AND postcode = ? AND state = ? AND title = ?', [member[5], member[4], member[0]], function(err, rows) {
		if (err) {
			console.error(err);
			step();
		} else if (rows.length) {
			found++;
			var address = member[2];
			
			if(member[3]) {
				address += ", " + member[3];
			}
			address += ", " + rows[0].suburb + ", " + rows[0].postcode + ", " + rows[0].state + ", " + "Australia";

			connection.query('UPDATE stores SET google_address = ? WHERE id = ?', [address, parseInt(rows[0].id)], function(err, rows) {
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

function removePostfix (s) {
	if (s.indexOf('*') > -1) {
		s = s.slice(0,s.indexOf('*'));
	} else {
		var invalid = [' DBS2', ' BTL X', ' X', ' TBO', ' DBS X', ' DD', ' PBD'];
		for (var i = 0; i < invalid.length; i++) {
			var pos = s.indexOf(invalid[i], s.length - invalid[i].length);
			if (pos !== -1) {
				s = s.slice(0,pos);
			}
		}
	}

	return s;
}
