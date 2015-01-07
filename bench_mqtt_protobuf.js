var LOOP_COUNT = 100;
var CHAT_SCHEMA = "msg.Chat";

var mqtt = require('mqtt')
var fs = require('fs');
var protobuf = require('node-protobuf');
var codec = new protobuf(fs.readFileSync('bench_mqtt_protobuf.desc'));

var msg = createMessage();
console.log('data length: ' + msg.length);
console.log('loop count: ' + LOOP_COUNT);

client = mqtt.createClient(1883, 'dev-netzme.duckdns.org');
client.subscribe('notification/user');

var rcvCounter = 0;
client.on('message', function (topic, message) {
	var buffer = new Buffer(message);
	var msg;
	
	try {
	   msg = codec.parse(buffer, CHAT_SCHEMA);
	} catch (e) {
	   console.log("recv msg error = " + e);
	}
	rcvCounter++;
	
	if (rcvCounter == LOOP_COUNT) {
		calculateRunningTime();
		process.exit(code=0);
	}
});

var start = getMiliseconds();
for (var index = 0; index < LOOP_COUNT; index++) {
	client.publish('notification/user', createMessage());
}

function calculateRunningTime() {
	var stop = getMiliseconds();
	console.log('running time: ' + (stop - start));
};

function createMessage() {
	var message = {
		from: 'king',
		rcpt: 'kassle',
		time: '1418824852',
		mesg: 'The ads all call me fearless, but thats just publicity.'
	}
	
	try {
	   return codec.serialize(message, CHAT_SCHEMA);
	} catch (e) {
	   console.log("create msg error = " + e);
	}
}

function getMiliseconds() {
	return Date.now();
}
