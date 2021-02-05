require("babel-register");
var fs = require('fs');
var dotenv = require('dotenv');
var envConfig = dotenv.parse(fs.readFileSync('.env'));
for (var k in envConfig) {
	process.env[k] = envConfig[k]
}

// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

// Routes Setup
const routes = require('./routes/api');
const Slackbot = require('./controllers/slack');
const port = process.env.PORT || 3000;

const bot = {
	token: process.env.SLACKBOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
	name: process.env.SLACKBOT_NAME
};

Slackbot.init(bot);

// Map routes to URL
if (port === 80) {
	app.use('/', (req, res) => {
		res.send('Healthy Bot');
	});
} else {
	app.use('/', express.static('dist'));
}

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
routes(app);

// Server Setup
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
