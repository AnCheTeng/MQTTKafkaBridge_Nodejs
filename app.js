var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    kafka_client = new kafka.Client(),
    producer = new Producer(kafka_client);

var mqtt = require('mqtt'),
    client  = mqtt.connect( [{ host: 'localhost', port: 1883 }]);
 

client.on('connect', function () {
    client.subscribe('#');
    //  client.publish('test', 'Hello mqtt');
});
	
 
client.on('message', function (MQTTtopic, MQTTmessage) {

    // message is Buffer 
    console.log(MQTTtopic.toString() +": " +MQTTmessage.toString());
    //client.end();

	
    producer.send([{topic: MQTTtopic.toString(), messages: MQTTmessage.toString()}], function (err, data) {
        //console.log(data);
    });
});

 
producer.on('error', function (err) {
    console.log(err);
})
