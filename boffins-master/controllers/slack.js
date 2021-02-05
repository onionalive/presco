const axios = require('axios');
const chalk = require('chalk');
const SlackBot = require('slackbots');
const async = require('async');
const util = require('util');

const Airtable = require('./airtable');
const Apiai = require('./apiai');
const Actions = require('./actions');

let bot;
let history = [];
let userList = [];
let channelList = [];

// Action Creators
const CREATE = 'action/CREATE';
const CHANNEL = 'action/CHANNEL';
const RETRIEVE = 'action/RETRIEVE';
const HELP = 'action/HELP';
const CONTINUE = 'action/CONTINUE';
const SUGGEST = 'action/SUGGEST';
const AFFIRMATION = 'action/AFFIRMATION';
const BOT_RESPONSE = 'action/BOT';

// Event Creators
const FOLLOWUP = 'event-FOLLOWUP';

/*
	FUNCTIONS
	init
	- initialise the bot
	- process messages

	processIncomingMessage
	- process text messages

	processReaction
	- process upvoting and downvoting

	channelReply
	- reply to an @boffins in the channel

	append
	- append to the message "history" array

	checkHistory
	- return history for a particular user
 */
let members;
let users;

function init(bot) {
	// create a bot
	bot = new SlackBot({
		token: bot.token,
		name: bot.name
	});

	members;
	users = bot.getUsers().then(function(users) { members = users.members });

	/*
		On start, find all users in
		Present Company
	 */
	bot.on('start', function() {
		const users = bot.getUsers();
		users._value.members.forEach(function(user) {
			userList.push(user);
		});


		userList.forEach(function(user) {
			bot.getChatId(user.name).then(function(id) {
				channelList.push(id);
			});
		});
	});

	bot.on('message', function(data) {
		try {
			/*
				var sentence: String - split the split into a lower case array
				var members: Array - parse entire list of team to get user details
			 */

			// check if ID equates to Boffins ID
			if (data.bot_id === 'B58GHTQRF') {
				if (/(Boffin.[0-9]+[\.])/g.test(data.text)) {
					const text = data.text.split(/\*(.*)\*/);
					const message = text[1];
					Actions.retrieveTimestamps(message)
						.then((ts) => {
							const user = {
								id: data.bot_id,
								ts: data.ts
							}
							append(user, message, ts);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			}

			if (data.type === 'message' && typeof data.text !== 'undefined') {
				processIncomingMessage(bot, data);
			} else if (data.type === 'reaction_added') {
				processReaction(bot, data);
			}
		} catch(err) {
			console.log('Bot recieved uninterpretable message');
			console.log(err);
		}
	});
}

function processIncomingMessage(bot, data) {
	try {
		let response, sentence, user;
		async.waterfall(
			[
				(callback) => {
					if (data.user) {
						user = data.user;
						if (typeof members !== 'undefined') {
							members.forEach(function(entry, index) {
								if (entry.id === data.user) {
									user = entry;
								}
							});
							callback(null, user);
						}
					}
				},
				(user, callback) => {
					let request;
					const userHistory = checkHistory(user.id);

					if (userHistory.length > 0 && userHistory[userHistory.length - 1].action === SUGGEST) {
						const event = {
							name: FOLLOWUP,
							query: data.text
						};
						Apiai.eventRequest(event)
							.then((botData) => {
								const message = botData.result.fulfillment.speech;
								callback(null, user, botData, message);
							});

					} else {
						Apiai.textRequest(data.text)
							.then((botData) => {
								const message = botData.result.fulfillment.speech;
								callback(null, user, botData, message);
							});
					}
				},
				(user, botData, message, callback) => {
					const botID = '@U596KJ4DB';
					let channel;
					if (data.channel) channel = data.channel;
					const userHistory = checkHistory(user.id);
					if (channelList.indexOf(channel) > -1) {
						switch(botData.result.action) {
							case RETRIEVE:
								Actions.retrieve(bot, message, channel, append);
								break;
							case HELP:
								Actions.help(bot, message, channel);
								break;
							case CREATE:
								Actions.create(bot, user, userHistory, channel);
								break;
							case AFFIRMATION:
								bot.postMessage(channel, message);
								break;
							default:
								bot.postMessage(channel, message);
						}
					} else {
						if (data.text.includes(botID)) {
							bot.postMessage(channel, channelReply(user));
							bot.postMessage(user.id, 'Waddup ' + user.real_name, { as_user: true });
						}
					}
					append(user, data.text, data.ts, botData.result.action);
				}
			],
			(err, result) => {
				conversationCallback();
				counter++;
			}
		);
	} catch(err) {
		throw err;
	}
}

function processReaction(bot, data) {
	const botHistory = checkHistory('B58GHTQRF');
	Actions.reactionAdded(data, botHistory);
}

function channelReply(user) {
	const replies = [
		`<@${user.id}> Check your DMs, ${user.real_name}.`
	]

	return replies[Math.floor(Math.random()*replies.length)];
}

/*
	var user: Obj - user info
	var action: String - response action
	var message: String - user data.text
 */
function append(user, message, ts, action=BOT_RESPONSE) {
	const data = {
		id: user.id,
		team_id: user.team_id,
		real_name: user.real_name,
		message: message,
		ts: ts,
		action: action,
		action_ts: user.ts
	};
	history.push(data);
	return history;
}

/*
	checkHistry() get the convo history
	var id: String - user ID
 */
function checkHistory(id) {
	const arr = history.filter(entry => entry.id === id);
	return arr;
}

module.exports = {
	init: init,
	append: append,
	checkHistory: checkHistory
};
