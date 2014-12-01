/**
 * Created by untung on 25/09/14.
 */
const
    duplexer = require('duplexer'),
    through = require('through');

module.exports = function (inputStream) {
    var countryCounter = {};
    var readStream = through(write, end);
    return new duplexer(readStream, inputStream);

    function write (buffer) {
        countryCounter[buffer.country] = (countryCounter[buffer.country] || 0) + 1;
    }

    function end () {
        inputStream.setCounts(countryCounter);
    }
};
