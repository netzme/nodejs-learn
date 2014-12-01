/**
 * Created by untung on 22/09/14.
 */

var http = require('http');
var arguments = process.argv;
var arrayUrl = new Array(arguments[2], arguments[3], arguments[4]);
var outputData = [];
var count = 0;


function printResult() {
    outputData.forEach(function (out) {
        console.log(out);
    });
}

function httpReq(index) {
    http.get(arrayUrl[index], function (response) {
        var string = "";
        response.setEncoding("utf8");
        response.on("data", function (data) {
                var strBuffer = string;
                string = strBuffer.concat(data);
            }
        );
        response.on("end", function (data) {
            outputData[index] = string;
            count++;
            if (count == arrayUrl.length) {
                printResult();
            }
        });
    });
}


for (var i = 0; i < arrayUrl.length; i++) {
    httpReq(i);
}

/*
 // official answer
 var http = require('http')
 var bl = require('bl')
 var results = []
 var count = 0

 function printResults () {
 for (var i = 0; i < 3; i++)
 console.log(results[i])
 }

 function httpGet (index) {
 http.get(process.argv[2 + index], function (response) {
 response.pipe(bl(function (err, data) {
 if (err)
 return console.error(err)

 results[index] = data.toString()
 count++

 if (count == 3) // yay! we are the last one!
 printResults()
 }))
 })
 }

 for (var i = 0; i < 3; i++)
 httpGet(i)
 */
