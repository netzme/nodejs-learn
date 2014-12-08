var MSG_STATUS_WAITING_DELIVERY = 1;

var mqtt = require('mqtt')

client = mqtt.createClient(1883, '10.0.0.13');

client.subscribe('chat/#');

client.on('message', function (topic, msg) {
	console.log(msg);
	var jsonMsg = JSON.parse(msg);
	client.publish('status/' + jsonMsg.owner, createMessageStatus(jsonMsg.uid, MSG_STATUS_WAITING_DELIVERY));
});

client.on('error', function (err) {
	console.log(err);
});
	
function createMessageStatus(id, status) {
	var msg = {
		'uid': id,
		'status': status
	}
	
	return JSON.stringify(msg);
}
