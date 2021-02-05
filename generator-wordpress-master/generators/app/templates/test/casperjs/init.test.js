var phantomcss = require('phantomcss');

casper.test.begin('Basic home page assertions', 1, function suite(test) {
    casper.start("http://localhost/wp-pagename", function() {
        test.assertExists('body', "body has been found");
    });

    casper.run(function() {
        test.done();
    });
});

/* css regression functionality may not be perfect yet */

casper.test.begin('Basic screenshots', 0, function suite(test) {
    phantomcss.init({
        rebase: casper.cli.get('rebase')
    });

    // open page
    casper.start('http://localhost/wp-pagename');

    casper.then(function() {
		// take the screenshot of the header element and save it under "body.png". The first parameter is actually a CSS selector
		phantomcss.screenshot('.-roo.-right.-top', 'wine section');
    });

    casper.then(function now_check_the_screenshots() {
        // compare screenshots
        phantomcss.compareAll();
    });

    // run tests
    casper.run(function() {
        casper.test.done();
    });
});