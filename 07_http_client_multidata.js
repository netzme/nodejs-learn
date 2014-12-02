var http = require('http');
var url = process.argv[2];

http.get(url, function (res) {
	var dataCol = '';
	res.setEncoding('utf8');
	res.on('data', function (data) {
		dataCol = dataCol + data;
	});
	res.on('end', function () {
		console.log(dataCol.length);
		console.log(dataCol);
	});
});
