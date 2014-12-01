/**
 * Created by untung on 23/09/14.
 */
var trumpet = require('trumpet');
var through = require('through');
var tr = trumpet();

process.stdin.pipe(tr).pipe(process.stdout);

// setelah di transform, stream di pipe ke stream input
var stream = tr.select('.loud').createStream();
stream.pipe(through(function (buffer) {
    this.queue(buffer.toString().toUpperCase());
})).pipe(stream);

