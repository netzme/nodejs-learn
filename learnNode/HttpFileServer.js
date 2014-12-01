/**
 * Created by untung on 23/09/14.
 */
var http = require('http');
var fs = require('fs');

var arguments = process.argv;
var portServer = arguments[2];
var pathFile = arguments[3];

var server = http.createServer(function (request, response) {
    var streamReader = fs.createReadStream(pathFile);

    response.writeHead(200, { 'content-type': 'text/plain' })
    streamReader.pipe(response);
});
server.listen(portServer);

/*
 // Official answer
 var http = require('http')
 var fs = require('fs')

 var server = http.createServer(function (req, res) {
 res.writeHead(200, { 'content-type': 'text/plain' })

 fs.createReadStream(process.argv[3]).pipe(res)
 })

 server.listen(Number(process.argv[2]))
 */