var file = process.argv[2];
var fs = require('fs');

fs.readFile(file, 'utf8', function (err, content) {
	var len = content.length - content.replace(/\n/g, '').length;
	console.log(len);
});
