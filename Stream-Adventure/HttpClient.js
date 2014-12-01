/**
 * Created by untung on 23/09/14.
 */
var request = require('request');

process.stdin.pipe(request.post('http://localhost:8000')).pipe(process.stdout)

// Official Answer
/*
 var request = require('request');
 var r = request.post('http://localhost:8000');
 process.stdin.pipe(r).pipe(process.stdout);
 */