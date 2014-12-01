/**
 * Created by untung on 30/09/14.
 */

var crypto = require('crypto');
var gzip = require('zlib');
var tar = require('tar');
var through = require('through');

var arguments = process.argv;
var chiper = arguments[2];
var chiperPassphrase = arguments[3];
var tarParser = tar.Parse();

tarParser.on('entry', function (obj) {
    if (obj.type !== "File") {
        return;
    }
    var hash = crypto.createHash('md5', {encoding: 'hex'});
    obj
        .pipe(hash)
        .pipe(through(function (h) {
            this.queue(h + ' ' + obj.path + '\n');
        }))
        .pipe(process.stdout);
});

process.stdin
    .pipe(crypto.createDecipher(chiper, chiperPassphrase))
    .pipe(gzip.createGunzip())
    .pipe(tarParser)
;

