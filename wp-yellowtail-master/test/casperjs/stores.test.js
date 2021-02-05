casper.test.begin('Basic stores page assertions', 1, function suite(test) {
    casper.start("http://localhost/wp-yellowtail/stores/", function() {
        this.echo(this.getTitle());
        test.assertSelectorHasText('.hero .inner h1', 'Stores');
    });

    casper.run(function() {
        test.done();
    });
});