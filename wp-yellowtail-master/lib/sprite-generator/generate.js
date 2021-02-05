var sprity = require('sprity');
var webp = require('webp-converter');
var fs = require('fs');

sprity.create({
	src: './img/**/*.png',
	out: './sprites',
	split: true,
	sort: false,
	margin: 0
}, function() {
	fs.readdir('sprites', function(err,files) {
		for(var i in files) {
			if(files[i].slice(-4) === ".png") {
				webp.cwebp("./sprites/"+files[i],"./sprites/"+files[i].slice(0,-3)+"webp","-q 80", function() {});
			}
		}
	});
});
