var net = require('net');
var port = process.argv[2];

var server = net.createServer(function(socket) {
	socket.end(generateResponse());
});

server.listen(port);

function generateResponse() {
	var now = new Date();
	return dateTimeFormat(now);
}

function dateTimeFormat(date) {
	var year = date.getFullYear();
	var month = addPadding(date.getMonth() + 1, 2);
	var day = addPadding(date.getDate(), 2);
	var hour = addPadding(date.getHours(), 2);
	var minute = addPadding(date.getMinutes(), 2);
	
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

function addPadding(value, padding) {
	var len = value.toString().length;
	var result = '';
	console.log(len);
	
	for (var index = len; index < padding; index++) {
		result += '0';
	}
	
	return result + value;
}
