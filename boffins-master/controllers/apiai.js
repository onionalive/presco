// api.ai stuff
const apiai = require('apiai');
const async = require('async');
const app = apiai(process.env.API_AI_ACCESS_KEY);
const options = {
	sessionId: '<unique session id>'
};

function textRequest(text) {
	return new Promise((resolve, reject) => {
		let request = app.textRequest(text, options);
		request.on('response', function(data) {
			resolve(data);
		});
		request.on('error', function(error) {
			console.log(error);
			return;
		});
		request.end();
	});
}

function eventRequest(event) {
	return new Promise((resolve, reject) => {
		let request = app.eventRequest(event, options);
		request.on('response', function(data) {
			resolve(data);
		});
		request.on('error', function(error) {
			console.log(error);
			return;
		});
		request.end();
	});
}

module.exports = {
	textRequest: textRequest,
	eventRequest: eventRequest
}
