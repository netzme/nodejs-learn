var http = require('http');
var port = process.argv[2];

var socket = http.createServer(function callback(request, response) {
	var reqData = '';
	request.setEncoding('utf8');
	request.on('data', function callback(data) {
		reqData += data;
	});
	request.on('end', function callback() {
		response.end(reqData.toUpperCase());
	});
});

socket.listen(port);
