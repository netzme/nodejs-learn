/**
 * Created by untung on 25/09/14.
 */
var combiner = require('stream-combiner');
var through = require('through');
var split = require('split');
var gzip = require('zlib');


module.exports = function () {
    var groupStream = through(write, last);
    var genreData;

    var pushGenreData = function (genre, book) {
        genre.books.push(book);
    }

    function myGenre(genreName) {
        return { name : genreName, books : [] };
    }

    function write (buffer) {

        if (buffer.length === 0) {
            return;
        }
        var parsedData = JSON.parse(buffer);

        if (parsedData.type === "genre") {
            if (genreData) {
                this.queue(JSON.stringify(genreData) + '\n');
            }
            genreData = new myGenre(parsedData.name);
        } else if ((parsedData.type === "book")) {
            pushGenreData(genreData, parsedData.name);
        }
    }

    function last () {
        if (genreData) {
            this.queue(JSON.stringify(genreData) + '\n');
        }
        this.queue(null); // sign EOF
    }

    return combiner(split(), groupStream, gzip.createGzip());
};