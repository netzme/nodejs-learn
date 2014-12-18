var LOOP_COUNT = 10000;

var mqtt = require('mqtt')

var msg = createMessage();
console.log('data length: ' + msg.length);
console.log('loop count: ' + LOOP_COUNT);

client = mqtt.createClient(1883, 'localhost');
client.subscribe('notification/user');

var rcvCounter = 0;
client.on('message', function (topic, message) {
	var msg = JSON.parse(message);
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
	
	return JSON.stringify(message);
}

function getMiliseconds() {
	return Date.now();
}
