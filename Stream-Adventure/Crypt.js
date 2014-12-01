/**
 * Created by untung on 30/09/14.
 */
var crypto = require('crypto');
var arguments = process.argv;
var encryptType = 'aes256';
var passphrase = arguments[2];

process.stdin
    .pipe(crypto.createDecipher(encryptType, passphrase))
    .pipe(process.stdout);