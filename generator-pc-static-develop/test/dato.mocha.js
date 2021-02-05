var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('static site generates files for dato', function() {
	beforeEach(function () {
		// The object returned act like a promise, so return it to wait until the process is done
		return helpers.run(path.join(__dirname, '../generators/app'))
		.withOptions({
			npmPackages: [
				'node-neat',
			],
			cms: [
				'datocms-client'
			],
			optionalFeatures: [],
			type: []
		})    // Mock options passed in
		.withArguments([
			'--skip-install',
			'--testing'
		])      // Mock the arguments
		.withPrompts({
			npmPackages: [
				'node-neat',
				'datocms-client'
			],
			cms: [
				'datocms-client'
			],
			optionalFeatures: [
				's3Sync'
			],
			type: []
		});
	});

	describe('generates the test files', function() {
		it('mocha init test file exists', function() {
			assert.file(['test/mocha/init.test.js']);
		});
		it('casperjs init test file exists', function() {
			assert.file(['test/mocha/init.test.js']);
		});
	});

	it('generates .babelrc', function() {
		assert.file(['.babelrc']);
	});

	it('generates .bowerrc', function() {
		assert.file(['.bowerrc']);
	});

	it('generates .env', function() {
		assert.file(['.env']);
		assert.fileContent('.env', 'AWS_ACCESS_KEY=XXXX');
		assert.fileContent('.env', 'DATO_API_TOKEN=XXXXX');
	});

	describe('gulpfile CSS paths are written correctly', function() {
		it('writes the correct gulpfile stylesheets paths when `node-neat` is passed in', function() {
			assert.fileContent('gulpfile.babel.js', `require('node-neat').includePaths`);
			assert.noFileContent('gulpfile.babel.js', `require('node-bourbon').includePaths`);
		});
	});

	describe('package json has collections and markdown packages', function() {
		it('writes the correct packages to `package.json`', function() {
			assert.fileContent('package.json', `"metalsmith-collections": "^0.9.0"`);
			assert.fileContent('package.json', `"metalsmith-markdown": "^0.2.1"`);
		});
	});

	describe('/src/html/pages/index.md does not save the contentful content', function() {
		it('writes the correct /src/html/pages/index.md content', function() {
			assert.file(['src/html/pages/index.md']);
			assert.noFileContent('src/html/pages/index.md', 'contentful:');
		});
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
