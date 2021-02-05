const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('apptnLW7HRBNu7LUy');

exports.retrieve = function(successCallback) {
	base('Table 1').select({
		view: 'Grid view'
	}).firstPage(function(err, records) {
		if (err) { console.error(err); return; }
		successCallback(records);
	});
}

exports.create = function(entry, successCallback) {
	base('Table 1').create(entry, function(err, record) {
		if (err) { console.error(err); return; }
		console.log(record.getId());
		successCallback();
	});
}

exports.upVote = function(id, value) {
	base('Table 1').update(id, {
		'up_votes': value
	}, function(err, record) {
		if (err) { console.error(err); return; }
		console.log(record.get('up_votes'));
	});
	console.log('here oh yeah');
}

exports.downVote = function(id, value, successCallback) {
	base('Table 1').update(id, {
		'down_votes': value
	}, function(err, record) {
		if (err) { console.error(err); return; }
		console.log(record.get('down_votes'));
		successCallback();
	});
}
