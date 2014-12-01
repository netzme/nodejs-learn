var dir = process.argv[2];
var ext = process.argv[3];

var ls = require('/home/kassle/project/nodejs/05_listfiles_modules.js');

ls(dir, ext, function(err, files) {
	var len = files.length;

	for (var index = 0; index < len; index++) {
		console.log(files[index]);
	}
});