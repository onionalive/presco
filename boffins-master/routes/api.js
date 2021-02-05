var express = require('express');
const Airtable = require('../controllers/airtable');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.send('Server is healthy');
		Airtable.retrieve(function(records) {
			console.log(records);
		});
	});

	app.post('/boffins/upvote', function(req, res) {
		var id = req.body.id;
		var votes = req.body.votes;
		votes = votes.toString();

		Airtable.upVote(id, votes);
		res.send(true);
	});

	app.post('/', function(req, res) {
		try {
			if (process.env.DEBUG === 'true') {
				const isodate = new Date().toISOString();
				const example = {
					title: 'Hello from the server',
					owner: 'Localhost',
					date_added: isodate
				}

				Airtable.create(example);
			}
		} catch(err) {
			console.log(err);
		}
	});

	app.get('/api/page/:page', (req, res) => {
		const page = req.params.page;

		let obj = [];
		Airtable.retrieve((records) => {

			records.forEach(function(record, index) {
				const upVotes = (record.get('up_votes') != null) ? record.get('up_votes') : 0;
				const downVotes = (record.get('down_votes') != null) ? record.get('down_votes') : 0;

				obj.push({
					title: record.get('title'),
					owner: record.get('owner'),
					upVotes: record.get('up_votes'),
					totalVotes: upVotes - downVotes,
					description: record.get('description'),
					timestamp: record.get('timestamp'),
					record: record,
				});
			});

			obj.sort(function(a, b) {
				return a.totalVotes - b.totalVotes;
			})

			obj.reverse();

			obj = obj.slice(page * 10, (page + 1)*10);

			res.send(obj);
		});
	});
}
