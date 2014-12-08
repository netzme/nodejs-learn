var MSG_STATUS_WAITING_DELIVERY = 1;

var mqtt = require('mqtt')

client = mqtt.createClient(1883, '10.0.0.13');

client.subscribe('status/kassle');
client.publish('chat/king', createMessage(1, 'Hello World!'));

client.on('message', function (topic, message) {
	console.log(message);
});

client.on('error', function (err) {
	console.log(err);
});

function createMessage(id, msg) {
	var message = {
		uid: id,
		owner: 'kassle',
		msg: msg
	}
	
	return JSON.stringify(message);
}
