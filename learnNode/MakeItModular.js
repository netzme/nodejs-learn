/**
 * Created by untung on 19/09/14.
 */

var myModule = require('./MyModule');
var arguments = process.argv;

var callback = function (err, data) {
    if (err) throw err;
    data.forEach(function (file) {
        console.log(file);
    });
}

var file = myModule(arguments[2], arguments[3], callback);

//file.forEach(function (filename) {
//    console.log(file);
//});