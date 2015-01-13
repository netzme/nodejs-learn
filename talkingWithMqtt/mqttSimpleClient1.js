var mqtt = require('mqtt')

client = mqtt.createClient(1883, 'localhost', {reconnectPeriod:0});
//connect to AWS
//client = mqtt.createClient(1883, 'dev-netzme.duckdns.org');


//console.log('before subscribe');
//console.log(client);
//client.conn.on('connack', function (packet) {
//  console.log(packet);
//});

client.subscribe('presence/me');
client.publish('presence/me', 'Hello mqtt');


client.stream.on('error', function (err) {
  //??
  console.log('listen error on stream object : ' + err);
});


client.on('reconnect', function () {
  console.log('reconnecting dul');
});
client.on('error', function (err) {
  //??
  console.log('listen error on client ' + err);
});


client.on('connect', function () {
  console.log('connect');
  //console.log('connected : ' + client.connected);

});



client.on('message', function (topic, message) {
  console.log(message);

  console.log('end');
  client.end();
});
/*
*/
