var mqtt = require('mqtt')

client = mqtt.createClient(1883, 'localhost');
//connect to AWS
//client = mqtt.createClient(1883, 'dev-netzme.duckdns.org');

console.log('before subscribe');
console.log(client);
client.subscribe('presence/me');
client.publish('presence/me', 'Hello mqtt');
console.log('after subscribe');
console.log(client);

client.on('connect', function () {
  console.log('connect');

});


client.on('message', function (topic, message) {
  console.log(message);

  console.log('end');
  client.end();
});

client.on('error', function (err) {
    //??
  console.log(err);
});
