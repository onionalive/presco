# wp-yellowtail
[yellow tail] wordpress site

Ensure you’ve installed the following:

* Composer
* Bower
* NPM
* Gulp

## Installation

* Copy `.env.example` to `.env` and place our ACF Pro Key in `.env`
** You can get this value by logging in to the ACF dashboard (details are in 1 Password)
* Run `composer install` from the root of the project
* Run `npm install` from the root of the project
* Run `bower install` from the root of the project

## Configure Wordpress

Wordpress will be served from a subfolder in this project (`wp`). You’ll need to configure Wordpress to allow this. This process is summarised below but full instructions can be found [here](https://codex.wordpress.org/Giving_WordPress_Its_Own_Directory)

* Log in to the CMS
** You’ll need to include the `wp/` subdiretory in the URL
* Navigate to the ‘General’ pane
* Change `Site Address (URL)` so it does not include the `wp` subdirectory
* Copy `wp/.htaccess` to `.htaccess` (your root project directory)
* Update your `wp/wp-config.php` file so it includes the following:
** `define( 'WP_CONTENT_DIR', dirname(dirname(__FILE__)) . '/wp-content' );`
** `define( 'WP_CONTENT_URL', 'http://localhost/wp-yellowtail/wp-content' );` (where `http://localhost/wp-yellowtail/` is the URL of the root of your project)
** If you’re local make sure `WP_DEBUG` is true to assist in testing

Once you’ve followed these steps you should be able to log in to the CMS and enable the Yellowtail theme.

## Configure Multisite
The [yellow tail] website is configured as a Wordpress multisite. You'll need to take a few more steps to configure this.

* Log in to the CMS
* Above the lines that you added earlier to `wp/wp-config.php` add the line `define( 'WP_ALLOW_MULTISITE', true );`.
* Save and reload wp-admin
* Under the `Tools` category within the dashboard click `Network Setup`
* Choose `sub-directory` URL structure (will be changed later to different domains) and enter a Network Title and super admin email address.
* Click Install
* You will now need to add two snippets of code into your wordpress directory
  * Copy into your wp-config.php underneath the `WP_ALLOW_MULTISITE` line we added before:

```
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
define('DOMAIN_CURRENT_SITE', 'dev.yellowtailwine.com.au');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);
```
  * Copy into your `.htaccess` in wordpress root directory the following (replace everything between `<IfModule>` tags):

```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]

# add a trailing slash to /wp-admin
RewriteRule ^([_0-9a-zA-Z-]+/)?wp-admin$ $1wp-admin/ [R=301,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^([_0-9a-zA-Z-]+/)?(wp-(content|admin|includes).*) wp/$2 [L]
RewriteRule ^([_0-9a-zA-Z-]+/)?(.*\.php)$ wp/$2 [L]
RewriteRule . index.php [L]
```

* Save all configs and reload wordpress in your browser.
* You can now setup multiple wordpress sites

### Setup new single multisite and click Save

* Select `Sites > Add New` and create a new site
![alt text](https://s3-ap-southeast-2.amazonaws.com/presentcompany-assets/github-assets/wp-multi-site.png)

* Navigate to the newly created site's edit section and select the `Themes` tab:
![alt text](https://s3-ap-southeast-2.amazonaws.com/presentcompany-assets/github-assets/wp-multi-site-theme.png)

* Enable the theme such that the theme will extend to child sites.

### Setup using an existing database

If you have taken a backup of the live/staging database to load locally, you may need to run through the following steps (https://presentcompany.atlassian.net/browse/CFB-416):

* Change 'siteurl' and 'home' in wp_options
* Change only row in wp_site
* Change 'siteurl' in wp_sitemeta
* Change domains in wp_blogs
* Foreach wp_X_options change 'siteurl' and 'home'
* Update links in content
* Also update DOMAIN_CURRENT_SITE in wp-config

## Generators

### agegate-countries.twig partial generator

Simply execute `npm run agegate` and the scripts will grab the latest list of countries and generate the file for you.

### Auto WP page-title generation

Run the command `npm run page -- [page name]` with the page name as the argument to auto generate a WP page template and associated .twig file in the `views` folder.

### es6 JS generator

Run the command `npm run js -- [new js class] [target html class]` to auto-generate a new class.js file. This process will generate the file, put in some generic js code with a `console.log` out and it will also auto fill in the correct import statement and add the class with the correct target in the `main.js` file.

To test, run `npm run js -- testClass container` to create a `testClass.js` file that run if `$('container').length` is true. The home page template contains this class. `gulp watch` should have auto reloaded, so go back to the page and check the console to see if `testClass loaded` appears. If there are no errors and this is true, then you are all good to go!

_Debugging_

The es6 generator requires `python` and runs off `#!/bin/bash` - my `bash` is version 4.2 (not standard for Mac) and `python` is 2.7.10. If the `bash` script fails to generate some files and you also have `zsh`, feel free to edit the first line to `#!/bin/zsh` for your personal computer. I have test this on `zsh` version 5.0.8 and the script runs.

## Testing

The test files are stored in the test folders and require the dev dependencies `sinonjs, jsdom, mocha, chai`.

Run `npm test` to view the tests files that are written in that folder.

Testing is still primitive and should be BDD (behaviour driven). Tests that are too specific will cause issues.

__mocha and chai__

These two are used in tandem to assert/expect values. Check out the Chai documentation for relative examples.

Tests consist of test suites and test specs. In order to recreate DOM elements if you are looking to test values etc. from functionality, you can use the `jsdom` library and import `jquery`.

Below is a small example of a test set up.

```javascript
import jsdom from 'jsdom-global';
import jQuery from '../bower_components/jquery/dist/jquery.min.js';

import ModuleToTest from 'path/to/module'l

// require sinon/chai
const sinon = require('sinon');
const expect = require('chai').expect;

// Test suite
describe('These tests are supposed to test some functionality', () => {

	let $;
	let ageGateFilters;
	jsdom();

	// this function will run before every Test Spec
	before(function () {
		$ = jQuery;
		const params = ['param1', 'param2', 'param3']

		// create instance
		const moduleToTest = new ModuleToTest(...params);
	});

	// Test Spec (unit test)
	it('This test should return ok', () => {
		expect(true).to.be.ok;	// returns ok
	});

	// Test Spec (unit test)
	it('This test should return true for the ModuleToTest function', () => {
		expect(moduleToTest.func()).to.equal(true);	// returns ok if result is true
	});

});
```

__sinon.js__

This library is used to essentially stub data for functions that require things like ajax etc. No tests currently use this effectively. Examples will be added later if used.

For now, I will show an example of a `spy` and a `stub` (as this may the most relevant):

_For the Spy_

```
// in module Example

export default class Example {

	callout() {
		let a = 1;
		let b = 2;

		return target(a,b);
	}

}

// in a test file

import Example from 'Example';

// Test suite
describe('A test suite using sinon', () => {

	// this function will run before every Test Spec
	before(function () {
		$ = jQuery;
		const params = ['param1', 'param2', 'param3']

		// create instance
		const example = new Example(...params);
	});

	// Test spec (unit test)
	it('Should return that the async func was called', () => {

		let targetSpy = sinon.spy(example, 'target');

		// Now, any time we call the function, the spy logs information about it
		example.callout();

		assert(targetSpy.calledOnce); // returns true
	});
});
```

_For the Stub_

```
// in module Example

export default class Example {

	callout(param, callback) {
		$.ajax({
			// whatever it normally is
		}, callback);
	}

}

// in a test file

import Example from 'Example';

// Test suite
describe('A test suite using sinon', () => {

	// this function will run before every Test Spec
	before(function () {
		$ = jQuery;
		const params = ['param1', 'param2', 'param3']

		// create instance
		const example = new Example(...params);
	});

	// Test spec (unit test)
	it('Should call callback after saving', () => {

		//We'll stub $.post so a request is not sent
		const post = sinon.stub($, 'ajax');
		post.yields();

		//We can use a spy as the callback so it's easy to verify
		var callback = sinon.spy();

		example.callout(param, callback);

		post.restore();
		sinon.assert.calledOnce(callback); // returns true
	});
});
```

__jsdom__

jsdom is a library that allows you to write a `innerHTML` var for the test to use if you want to test out the jQuery values for a test.

For an example, checkout `test/agegate_test.js`.
