import {Server, Socket} from 'socket.io';

const io = new Server(8080);

io.on('connection', (socket: Socket) => {
  console.log('New Connection!');

  socket.join('MAIN');
  socket.emit('server_msg', 'JOINED MAIN');

  socket.on('msg', (data) => {
    socket.to('MAIN').emit('msg', data);
  });
  
  socket.on('echo', console.log);
});