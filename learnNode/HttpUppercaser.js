/**
 * Created by untung on 23/09/14.
 */
var http = require('http');

var arguments = process.argv;
var portServer = arguments[2];

var server = http.createServer(function (request, response) {
    var map = require('through2-map');
    if (request.method != "POST") {
        return request.end('Not a POST request !!')
    }
    request.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase();
    })).pipe(response);
});
server.listen(portServer);


// Official Answer
/*
 var http = require('http')
 var map = require('through2-map')

 var server = http.createServer(function (req, res) {
 if (req.method != 'POST')
 return res.end('send me a POST\n')

 req.pipe(map(function (chunk) {
 return chunk.toString().toUpperCase()
 })).pipe(res)
 })

 server.listen(Number(process.argv[2]))
 */
