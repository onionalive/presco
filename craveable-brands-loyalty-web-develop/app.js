/*
	Use this for the optimized build
	and serve out with Docker
 */

var fs = require('fs');
var dotenv = require('dotenv').config;

// Main starting point of the application
const express = require('express');
const http 			= require('http');
const bodyParser 	= require('body-parser');
const morgan 		= require('morgan');
const app 			= express();
const cors 			= require('cors');
const spawn 		= require('child_process').spawn;
const path 			= require('path');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Server Setup
const port = process.env.NODE_ENV == 'production' ? 80 : 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
