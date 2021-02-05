var phantomcss = require('phantomcss');

casper.test.begin('Basic home page assertions', 2, function suite(test) {
    casper.start("http://localhost/wp-yellowtail", function() {
        test.assertTitle("Yellowtail", "Title is correct");
        test.assertExists('.yt-logo', "Logo is found");
    });

    casper.run(function() {
        test.done();
    });
});

// screen shots functionality not quite working yet

// casper.test.begin('Basic screenshots', 0, function suite(test) {
//     phantomcss.init({
//         rebase: casper.cli.get('rebase')
//     });

//     // open page
//     casper.start('http://localhost/wp-yellowtail/wines/');

//     casper.then(function() {
//       // take the screenshot of the header element and save it under "body.png". The first parameter is actually a CSS selector
//       phantomcss.screenshot('.-roo.-right.-top', 'wine section');
//     });

//     casper.then(function now_check_the_screenshots() {
//         // compare screenshots
//         phantomcss.compareAll();
//     });

//     // run tests
//     casper.run(function() {
//         console.log('\nTHE END.');
//         casper.test.done();
//     });
// });