const chalk 	= require('chalk');

function bot(message) {
	console.log(chalk.green('\tBot:', message));
}

function user(message) {
	console.log(chalk.cyan('\tUser:', message));
}

function log(message) {
	console.log(chalk.yellow('Log:', message));
}

module.exports = {
	bot: bot,
	user: user,
	log: log
}
