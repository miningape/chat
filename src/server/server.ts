import {Server, Socket} from 'socket.io';
import { UserProfile } from '../client/interfaces/user.profile';

const io = new Server(8080);

io.on('connection', (socket: Socket) => {
  console.log('New Connection!');

  socket.on('user_profile', (user) => {
    socket.data = user;
    socket.join('MAIN');
    socket.emit('server_msg', 'JOINED MAIN');
  })
  
  socket.on('msg', (message) => {
    console.log(socket.data, message);
    socket.to('MAIN').emit('msg', socket.data, message);
  });
  
  socket.on('echo', console.log);
});