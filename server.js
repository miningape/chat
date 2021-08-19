// var net = require('net');


// var server = net.createServer(function(socket) {
// 	socket.write('Echo server\r\n');
// 	socket.pipe(socket);
// });

// server.listen(8080, '0.0.0.0');

const io = require('socket.io')(8080);

const sockets = [];

io.on('connection', (socket) => {
  console.log('new connection');
  sockets.push(socket);

  socket.on('message', (data)=>{
    console.log(data);
    sockets.forEach(i => i.send(data));
  });
});