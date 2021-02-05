const Airtable = require('./airtable');
const moment = require('moment');

/*
	Retrive the boffins
 */
function retrieve(bot, message, channel, append) {
	bot.postMessage(channel, message);
	Airtable.retrieve(function(records) {
			records.forEach(function(record, index) {
				const title = record.get('title');
				const owner = record.get('owner');
				const upVotes = record.get('up_votes');
				const downVotes = record.get('down_votes');
				const ts = record.get('timestamp');

				bot.postMessage(channel, `Boffin ${index + 1}. *${title}*: \n> Suggested by *${owner}*. \n> ${upVotes} up votes \n> ${downVotes} down votes`);
			});
		});
}

/*
	Retrive the boffins
 */
function retrieveTimestamps(message) {
	return new Promise((resolve, reject) => {
		Airtable.retrieve(function(records) {
			records.forEach(function(record, index) {
				const title = record.get('title');
				const ts = record.get('timestamp');
				if (title === message) {
					resolve(ts);
					return;
				}
			});
			reject('Boffin timestamp not found');
		});
	});
}

/*
	Send haaaaaaalp
 */
function help(bot, message, channel) {
	const formattedMessage = message.replace(/\./g, '\n>');
	bot.postMessage(channel, formattedMessage);
}

/*
	Create a boffin
 */
function create(bot, user, userHistory, channel) {
	try {
		// console.log(userHistory);
		const m = moment();
		const isodate = m.format();
		const title = userHistory[userHistory.length - 2].message;
		const description = userHistory[userHistory.length - 1].message;
		const ts = userHistory[userHistory.length - 1].ts;
		const example = {
			title: title,
			description: description,
			owner: user.real_name,
			date_added: isodate,
			timestamp: ts,				// still deciding on this?
			up_votes: '0',
			down_votes: '0'
		}
		Airtable.create(example, function() {
			bot.postMessage(channel, 'Success!');
		});
	} catch(err) {
		bot.postMessage(channel, 'Whoops! There was an error adding the Boffin, maybe try contact the devs?');
	}
}

/*
	Update Airtable when thumbs up
	or down has been added
 */
function reactionAdded(data, botHistory) {
	const msgId = data.item_user;

	Airtable.retrieve(function(records) {
		let pass = false;
		let results = [];
		records.forEach(function(record, index) {
			const ts = record.get('timestamp');
			const title = record.get('title');
			const id = record.getId();
			let upVotes = Number(record.get('up_votes'));
			let downVotes = Number(record.get('down_votes'));

			const result = {
				title: title,
				id: id,
				upVotes: upVotes,
				downVotes: downVotes,
				ts: ts
			};

			results.push(result);

			if (ts === data.item.ts) {
				vote(data, id, title, upVotes, downVotes);
			}
		});

		if (!pass) {
			botHistory.forEach(function(entry, index) {
				if (entry.action_ts === data.item.ts) {
					results.forEach(function (result, index) {
						if (entry.ts === result.ts) {
							vote(data, result.id, result.title, result.upVotes, result.downVotes);
						}
					});
				}
			});
		}
	});
}

function vote(data, id, title, upVotes, downVotes) {
	console.log(id);
	if (data.reaction === '+1') {
		upVotes++;
		Airtable.upVote(id, `${upVotes}`, function() {
			console.log(`Upvote added to ${title}`);
		});
	} else if (data.reaction === '-1') {
		downVotes++;
		Airtable.downVote(id, `${downVotes}`, function() {
			console.log(`Downvote added to ${title}`);
		});
	}
}

module.exports = {
	retrieve: retrieve,
	help: help,
	create: create,
	reactionAdded: reactionAdded,
	retrieveTimestamps: retrieveTimestamps
}
