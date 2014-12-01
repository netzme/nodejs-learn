/**
 * Created by untung on 23/09/14.
 */
var http = require('http');
var url = require('url');

var arguments = process.argv;
var portServer = arguments[2];

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    var parsedUrl = url.parse(request.url, true);
    var pathname = parsedUrl.pathname;
    var resDate = new Date(parsedUrl.query.iso);
    if (pathname == '/api/parsetime') {
        response.end(JSON.stringify({hour: resDate.getHours(), minute: resDate.getMinutes(), second: resDate.getSeconds()}));
    } else if (pathname == '/api/unixtime') {
        response.end(JSON.stringify({unixtime: new Date(resDate).getTime()}));
    } else {
        response.writeHead(404);
        response.end();
    }
});
server.listen(portServer);

// Official Answer
/*
var http = require('http')
var url = require('url')

function parsetime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

function unixtime(time) {
    return { unixtime: time.getTime() }
}

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
    else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)

    if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
    } else {
        res.writeHead(404)
        res.end()
    }
})
server.listen(Number(process.argv[2]))
 */