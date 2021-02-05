var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('static site generates files for contentful', function() {
	beforeEach(function () {
		// The object returned act like a promise, so return it to wait until the process is done
		return helpers.run(path.join(__dirname, '../generators/app'))
		.withOptions({
			cms: [
				'contentful-metalsmith'
			],
			npmPackages: [],
			optionalFeatures: [],
			type: []
		})    // Mock options passed in
		.withArguments([
			'--skip-install',
			'--testing'
		])      // Mock the arguments
		.withPrompts({
			cms: [
				'contentful-metalsmith'
			],
			npmPackages: [],
			optionalFeatures: [],
			type: []
		});
	});

	it('generates .env', function() {
		assert.file(['.env']);
		assert.fileContent('.env', 'CONTENTFUL_ACCESS_TOKEN=XXXXX');
		assert.fileContent('.env', 'CONTENTFUL_SPACE_ID=XXXXX');
	});

	it('generates the /lib/contentul-helper/index.js file', function() {
		assert.file(['lib/contentful-helper/index.js']);
	});

	it('writes the correct /src/html/pages/index.md content', function() {
		assert.file(['src/html/pages/index.md']);
		assert.fileContent('src/html/pages/index.md', 'contentful:');
	});

	it('does not write the /src/html/data/example_content.json file', function() {
		assert.noFile(['src/html/data/example_content.json']);
	});

	it('gulpfile does not look for data directory in metalsmith task', function() {
		assert.file(['gulpfile.babel.js']);
		assert.noFileContent('gulpfile.babel.js', 'directory: \'src/html/data/**/*.json\',');
	});

	it('gulpfile contains metalsmith task', function() {
		assert.file(['gulpfile.babel.js']);
		assert.fileContent('gulpfile.babel.js', 'gulp.task(\'metalsmith\'');
	});
});
