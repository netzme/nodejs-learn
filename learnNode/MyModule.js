/**
 * Created by untung on 19/09/14.
 */

module.exports = function (dirName, fileExt, callback) {
    var fs = require('fs');
    var path = require('path');
    var arrFile = new Array();

    fs.readdir(dirName, function (err, list) {
        if (err) return callback(err);
        /*list.forEach(function (file) {
         if (path.extname(file) === '.'+fileExt) {
         arrFile.push(file);
         }
         });*/
        list = list.filter(function (file) {
            return path.extname(file) === '.' + fileExt;
        });
        return callback(null, list);
    });
};