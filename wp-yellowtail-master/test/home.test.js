const expect = require('chai').expect;

casper.test.begin('Basic home page assertions', 3, function suite(test) {
    casper.start("http://localhost/wp-yellowtail", function() {
        test.assertTitle("Yellowtail", "Title is correct");
        test.assertExists('.yt-logo', "Logo is found");
    });

    casper.thenOpen('http://localhost/wp-yellowtail/stores/', function() {
		this.echo(this.getTitle());
		test.assertSelectorHasText('.hero .inner h1', 'Stores');
	});

    casper.run(function() {
        test.done();
    });
});