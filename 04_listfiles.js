var dir = process.argv[2];
var ext = '.' + process.argv[3];
var len = ext.length;

var fs = require('fs');
fs.readdir(dir, function (err, files) {
	var length = files.length;

	for (var index = 0; index < length; index++) {
		found = files[index].lastIndexOf(ext);

		if (found > -1 && (found + len) == files[index].length) {
			console.log(files[index]);
		}
	}
});
