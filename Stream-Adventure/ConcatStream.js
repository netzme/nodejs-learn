/**
 * Created by untung on 23/09/14.
 */
var concat = require('concat-stream');

process.stdin.pipe(concat(function (buffer) {
    process.stdout.write(buffer.toString().split('').reverse().join(''));
}));

// Official Answer
/*
 var concat = require('concat-stream');

 process.stdin.pipe(concat(function (src) {
 var s = src.toString().split('').reverse().join('');
 console.log(s);
 }));
*/