/**
 * Created by untung on 22/09/14.
 */

var http = require('http');
var arguments = process.argv;
var  http2 = require("")

var callbackData = function (data) {
    console.log(data);
};
var callbackError = function (error) {
    console.error(error);
}
var callbackResponse = function (response) {
    //console.log(response.statusCode);
    response.setEncoding("utf8");
    response.on('data', callbackData);
    response.on("error", callbackError);
    /**
     response.on('data', console.log)
     response.on('error', console.error)
     */
};
http.get(arguments[2], callbackResponse);