/**
 * Created by untung on 23/09/14.
 */
var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

var stream = require('stream');
require('util').inherits(MyStream, stream.Duplex);

function MyStream(stdin, stdout) {
    stream.Duplex.call(this);
    this.stdin = stdin;
    this.stdout = stdout;
}

MyStream.prototype._write = function (data, encoding, callback) {
    this.stdin.write(data, encoding, callback);
};
MyStream.prototype._read = function (size) {
  this.stdout.read(size);
};
MyStream.prototype.end = function() {
    this.stdin.end();
}

module.exports = function (cmd, args) {
    var child = spawn(cmd, args);
    /*return new duplexer(child.stdin, child.stdout);*/
    var str = new MyStream(child.stdin, child.stdout);
    return str;
};