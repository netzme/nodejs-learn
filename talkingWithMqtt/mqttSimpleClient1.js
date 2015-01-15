/**
simple client untuk connect ke mqtt server.
task app cuma subscribe dan publish topik yg sama.
*/

var mqtt = require('mqtt')

//conn ke localhost, gunakan mqttSimpleServer1.js
client = mqtt.createClient(
    1883,
    'localhost',
  {reconnectPeriod:0}); //0 -> no reconnect
//connect to AWS
//client = mqtt.createClient(1883, 'dev-netzme.duckdns.org');



client.subscribe('presence/me');
client.publish('presence/me', 'Hello mqtt');


client.stream.on('error', function (err) {
  //kalau connect failed, event error masuk sini
  console.log('listen error on stream object : ' + err);
});
client.on('error', function (err) {
  //kalau connect failed, event error TIDAK masuk sini
  console.log('listen error on client ' + err);
});


client.on('reconnect', function () {
  //kalau connect failed, defaultnya selalu reconnect
  console.log('reconnecting dul');
});


client.on('connect', function () {
  console.log('connect');
});



client.on('message', function (topic, message) {
  console.log(message);

  console.log('end');
  client.end();
});
