var fs = require('fs');
var dotenv = require('dotenv');
var envConfig = dotenv.parse(fs.readFileSync('.env'));
for (var k in envConfig) {
	process.env[k] = envConfig[k]
}

const expect = require('chai').expect;
const async = require('async');
const chalk = require('chalk');
const Helper 	= require('./helpers');

const Apiai 	= require('../controllers/apiai');

const conversations = [
	"I have an idea",
	"Yeah",
	"Drink more beer",
	"Yep"
];

const actions = [
	"Default Welcome Intent",
	"Default Welcome Intent - yes",
	"Default Welcome Intent - yes - fallback",
	"Default Welcome Intent - yes - fallback - yes"
];

describe('Dummy conversation with API.ai', function() {
	it('Correctly prompts for the idea', function(done) {
		let counter = 0;
		this.timeout(10000);
		async.forEachLimit(conversations, 1, function(intent, conversationCallback) {
			async.waterfall(
				[
					(callback) => {
						Helper.user(intent);
						Apiai.textRequest(intent)
							.then((response) => {
								Helper.bot(response.result.fulfillment.speech);
								const intentName = response.result.metadata.intentName;
								expect(intentName).to.equal(actions[counter]);
								callback(null);
							});
					}
				],
				(err, result) => {
					conversationCallback();
					counter++;
				}
			);
		}, function(err){
			done();
		});
	});
	it('Asks for confirmation');
	it('Responds correctly to when a user wants to make a correction');
});
