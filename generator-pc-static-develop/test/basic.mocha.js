var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('static site generates example_content.json file for basic sites', function() {
	beforeEach(function () {
		// The object returned act like a promise, so return it to wait until the process is done
		return helpers.run(path.join(__dirname, '../generators/app'))
		.withOptions({
			npmPackages: [],
			optionalFeatures: [],
			cms: [
				'no-cms'
			],
			type: []
		})    // Mock options passed in
		.withArguments([
			'--skip-install',
			'--testing'
		])      // Mock the arguments
		.withPrompts({
			npmPackages: [],
			optionalFeatures: [],
			cms: [
				'no-cms'
			],
			type: []
		});
	});

	it('generates the example_content.json file', function() {
		assert.file(['src/html/data/example_content.json']);
	});

	it('gulpfile contains metalsmith task', function() {
		assert.file(['gulpfile.babel.js']);
		assert.fileContent('gulpfile.babel.js', 'gulp.task(\'metalsmith\'');
	});
});
