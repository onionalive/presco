/*
Fetch all stores from the spreadsheet
Flesh out the address field
Add them to a MySQL database
*/

require('dotenv').config();

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var mysql = require('mysql');
var pad = require('pad');

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

// Ensure we don't already have stores in the database
connection.query('SELECT count(*) as storeCount FROM stores', function(err, rows) {
	if (err) {
		console.error(err);
		process.exit();
	}

	if (rows[0].storeCount > 0) {
		console.log('Error: You already have stores in your database. Aborting.');
		process.exit();
	}
});



// Fetch Google Doc and parse
var doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_KEY);
doc.getInfo(function(err, info) {
	// Grab the worksheet
	async.mapSeries(info.worksheets, parseWorksheet, function(err, results) {
		console.log('All stores inserted');
		connection.destroy();
		process.exit();
	});
});




function parseWorksheet(worksheet, step) {
	var state = worksheet.title;
	console.log('Fetching ' + state);
	worksheet.getRows({
		offset: 1,
	}, function( err, rows ) {
		var stores = [];
		rows.forEach(function (row) {
			stores.push(parseStore(row, state));
		});

		async.mapSeries(stores, insertStore, function(err, results) {
			if (err) {
				console.error(err);
				process.exit();
			}

			console.log(state + " done. " + stores.length + ' added.');
			step();
		});
	});
}

function insertStore(store, step) {
	connection.query('INSERT INTO stores SET ?', store, function (err, result) {
		if(err) {
			console.error(err);
			//process.exit();
		} else {
			step();
		}
	});
}

function parseStore(row, state) {
	var store = {
		chain: row.chain.trim(),
		title: row.store.trim().replace('1st Choice', 'First Choice Liquor').trim(),
		suburb: row.suburb.trim(),
		state: state,
	};

	// Special for bad WA data
	if (store.suburb == "#REF!") {
		store.suburb = store.title.match(/\(([^)]+)\)/)[1];
		store.title = store.title.slice(0, store.title.indexOf('(')).trim();
	}

	var address = store.title;
	if (store.chain !== "LIQUOR LAND" && store.chain !== "FIRST CHOICE" && address.toLowerCase().indexOf(row.chain.toLowerCase()) === -1) {
		address = store.chain + " " + address;
	}

	if (address.toLowerCase().indexOf(row.suburb.toLowerCase()) === -1) {
		address = address + " " + store.suburb;
	}

	address += ", " + state;

	var postcode = row.postcode.trim();

	if(postcode.length > 0 && postcode.length <= 4) {
		postcode = pad(4, postcode, {
			char: '0'
		});
		address += ", " + postcode;
		store.postcode = postcode;
	}

	address += ", Australia";

	store.address = address;

	return store;
}

