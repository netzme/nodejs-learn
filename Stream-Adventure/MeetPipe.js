/**
 * Created by untung on 23/09/14.
 */
var fs = require('fs');
var arguments = process.argv;

fs.createReadStream(arguments[2]).pipe(process.stdout);