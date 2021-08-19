var net = require('net');

var client = new net.Socket();
client.connect(1337, '34.142.122.25', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	///stopclient.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});