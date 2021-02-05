/*
Lookup address details from LiquorLand site
*/

require('dotenv').config();

var async = require('async');
var mysql = require('mysql');
var cheerio = require('cheerio');
var request = require('request');

var found = 0;

var pages = {
	"ACT": "https://www.liquorland.com.au/Stores/Australian%20Capital%20Territory",
	"NSW": "https://www.liquorland.com.au/Stores/New%20South%20Wales",
	"QLD": "https://www.liquorland.com.au/Stores/Queensland",
	"SA": "https://www.liquorland.com.au/Stores/South%20Australia",
	"VIC": "https://www.liquorland.com.au/Stores/Victoria",
	"WA": "https://www.liquorland.com.au/Stores/Western%20Australia"
};

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

// Fetch FirstChoice data

async.mapSeries(Object.keys(pages), parseState, function(err, results) {
	console.log('Done! Matched ' + found + ' stores');
	connection.destroy();
});


function parseState(state, step) {
	console.log(pages[state]);
	request({
		method: 'GET',
		url: pages[state],
	}, function (error, response, body) {
		var $ = cheerio.load(body);
		var $stores = $('#storeFinderContentHaveResults .storeList li');
		async.mapSeries($stores, function(store, innerStep) {
			updateStore({
				postcode: $(store).data('postcode'),
				title: $(store).find('h3').text().trim(),
				street: $(store).find('address p').first().text().trim(),
				state: $(store).find('address p').last().text().trim().split("\n")[0]
			}, innerStep);
		}, function(err, results) {
			step();
		});
	});
}

function updateStore(data, step) {
	connection.query('SELECT * FROM stores WHERE `chain` = "LIQUOR LAND" AND `title` COLLATE UTF8_GENERAL_CI LIKE "' + data.title + '%"', function(err, rows) {
		if (err) {
			console.error(err);
			step();
		} else if (rows.length) {
			found++;
			var address = data.street + ", " + rows[0].suburb + ", " + data.postcode + ", " + data.state + ", " + "Australia";
			var q = connection.query('UPDATE stores SET google_address = ?, state = ?, postcode = ? WHERE id = ?', [address, data.state, data.postcode, parseInt(rows[0].id)], function(err, rows) {
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
