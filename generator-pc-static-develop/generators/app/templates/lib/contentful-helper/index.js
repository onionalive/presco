var util = require('util');

module.exports = function(files, metalsmith, cb) {
	/*
		Parse through index.html files built from
		Contentful content in /src/html/pages
	 */
	files['index.html'].entries.forEach(function(entry, index) {
		console.log(util.inspect(entry, {depth: 4}));
	});

	cb();
}
