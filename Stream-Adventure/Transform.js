/**
 * Created by untung on 23/09/14.
 */
var through = require('through');
var tr = through(write);

function write (buffer) {
    this.queue(buffer.toString().toUpperCase());
}

process.stdin.pipe(tr).pipe(process.stdout);

// Official Answer
/*
var through = require('through');
var tr = through(function (buf) {
    this.queue(buf.toString().toUpperCase());
});
process.stdin.pipe(tr).pipe(process.stdout);
*/