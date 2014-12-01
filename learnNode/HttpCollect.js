/**
 * Created by untung on 22/09/14.
 */
var http = require('http');
var arguments = process.argv;
var outputString = new String();

var callbackResponse = function (response) {
    response.setEncoding("utf8");
    response.on("data", callbackData);
    response.on("end", callbackEnd);
};
var callbackData = function (data) {
    var strBuffer = outputString;
    outputString = strBuffer.concat(data);
};
var callbackEnd = function (data) {
    console.log(outputString.length);
    console.log(outputString);
}

http.get(arguments[2], callbackResponse);

/**
 // Alternative answer with third party library
 var http = require('http')
 var bl = require('bl')

 http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })
 */