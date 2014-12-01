/**
 * Created by untung on 19/09/14.
 */
var fs = require('fs');
var fileName = process.argv[2];
var fileBuffer = fs.readFileSync(fileName);
var strBuffer = fileBuffer.toString();
var arrBuffer = strBuffer.split('\n');
console.log(arrBuffer.length - 1);