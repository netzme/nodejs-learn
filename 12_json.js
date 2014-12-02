var http = require('http');
var urlapi = require('url');
var port = process.argv[2];

var socket = http.createServer(function callback(request, response) {
	request.setEncoding('utf8');
	var url = urlapi.parse(request.url);
	var responseData = generateResponseData(url);
	sendResponse(response, responseData);
});

socket.listen(port);

function generateResponseData(url) {
	var path = url.pathname;
	
	if (path === '/api/parsetime') {
		return generateResponseForIsoTime(url);
	} else if (path == '/api/unixtime') {
		return generateResponseForEpochTime(url);
	}
}

function generateResponseForIsoTime(url) {
	var date = getDate(url);
	var response = {
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds() 
	}

	return response;
}

function generateResponseForEpochTime(url) {
	var date = getDate(url);
	var response = {
		unixtime: date.valueOf()
	}
	
	return response;
}

function getDate(url) {
	var query = url.query;
	
	var dateStr = query.substring(4);
	return new Date(dateStr);
}

function sendResponse(stream, response) {
	stream.writeHead(200, { 'Content-Type': 'application/json' });
	stream.end(JSON.stringify(response));
}
