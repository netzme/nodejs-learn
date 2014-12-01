/**
 * Created by untung on 23/09/14.
 */
var split = require('split');
var through = require('through');
var no = 1;

process.stdin.pipe(split()).pipe(through(function (line) {
    var str = line.toString().toLowerCase();
    if ((no % 2) == 0) {
        str = str.toUpperCase();
    }
    this.queue(str + '\n');
    no++;
})).pipe(process.stdout);

// Official answer
/*
var through = require('through');
var split = require('split');

var lineCount = 0;
var tr = through(function (buf) {
    var line = buf.toString();
    this.queue(lineCount % 2 === 0
            ? line.toLowerCase() + '\n'
            : line.toUpperCase() + '\n'
    );
    lineCount++;
});
process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
*/