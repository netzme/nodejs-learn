/**
 * Created by untung on 19/09/14.
 */
var fs = require('fs');
var fileName = process.argv[2];
fs.readFile(fileName, 'utf-8', function (err, data) {
    if (err) throw err;
    var buffer = data;
    console.log(buffer.split('\n').length - 1)
});