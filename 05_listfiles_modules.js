const fs = require('fs');

module.exports = function (dir, ext, callback) {
	var dotExt = '.' + ext;
	var len = dotExt.length;

	fs.readdir(dir, function (err, files) {
		if (err) {
			return callback(err);
		}

		var filteredFiles = new Array();
		var length = files.length;

		for (var index = 0; index < length; index++) {
			found = files[index].lastIndexOf(dotExt);

			if (found > -1 && (found + len) == files[index].length) {
				filteredFiles[filteredFiles.length] = files[index];
			}
		}

		callback(null, filteredFiles);
	});
}
