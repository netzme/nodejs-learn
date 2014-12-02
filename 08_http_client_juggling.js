var http = require('http');
var length = process.argv.length - 2;
var dataSet = [];

iterateUrls();

function iterateUrls() {
	for (var index = 0; index < length; index++) {
		var url = process.argv[index+2];
		httpGet(url, index);
	}
}

function httpGet(url, index) {
	http.get(url, function (res) {
		var dataFull = '';
		res.setEncoding('utf8');
		res.on('data', function (data) {
			dataFull = dataFull + data;
		});
		res.on('end', function () {
			result(index, dataFull);
		});
	});
}

function result(index, data) {
	dataSet[index] = data;
	check();
}

function check() {
	for (var index = 0; index < length; index++) {
		if (!dataSet[index]) {
			return;
		}
	}
	
	print();
}

function print() {
	for (var index = 0; index < length; index++) {
		console.log(dataSet[index]);
	}
}
