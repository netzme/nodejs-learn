var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var file = process.argv[3];

var socket = http.createServer(function callback(request, response) {
	var stream = fs.createReadStream(file);
	stream.pipe(response);
});

socket.listen(port);
