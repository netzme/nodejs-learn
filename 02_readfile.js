var file = process.argv[2];
var fs = require('fs');
var content = fs.readFileSync(file, 'utf8');

var len = content.length - content.replace(/\n/g, '').length;

console.log(len);
