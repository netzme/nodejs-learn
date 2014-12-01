/**
 * Created by untung on 19/09/14.
 */
var fs = require('fs');
var path = require('path');
var arguments = process.argv;
var pathDir = arguments[2];
var filterFileExt = arguments[3];
fs.readdir(pathDir, function (err, list) {
    if (err) throw err;
    /*for(var i=0;i<=list.length;i++) {
     if (path.extname(list[i]) === '.'+filterFileExt) {
     console.log(list[i]);
     }
     }*/
    list.forEach(function (file) {
        if (path.extname(file) === '.' + filterFileExt) {
            console.log(file);
        }
    });
});