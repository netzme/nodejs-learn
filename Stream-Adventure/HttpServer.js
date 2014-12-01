/**
 * Created by untung on 23/09/14.
 */
var http = require('http');
var through = require('through');

var server = http.createServer(function (request, response) {
    if (request.method != "POST") {
        request.end("Need POST Request!!");
    }
    request.pipe(through(function (buff) {
        this.queue(buff.toString().toUpperCase());
    })).pipe(response)
});
server.listen(process.argv[2]);

// Official Answer
/*
 var http = require('http');
 var through = require('through');

 var server = http.createServer(function (req, res) {
 if (req.method === 'POST') {
 req.pipe(through(function (buf) {
 this.queue(buf.toString().toUpperCase());
 })).pipe(res);
 }
 else res.end('send me a POST\n');
 });
 server.listen(parseInt(process.argv[2]));

*/