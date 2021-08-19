const readline = require('readline');
const io = require('socket.io-client');
const fs = require('fs');

const socket = io.connect('ws://localhost:8080');
let userData = {};

const SEND = (msg) => {
  socket.send(JSON.stringify(msg));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prime_read = () => {
  rl.question('> ', (input) => {
    SEND({user: userData, msg: input});
    prime_read();
  });
}

fs.readFile(process.argv[2], (err, data) => {
  userData = JSON.parse(data.toString()); 
});

socket.on('connect', ()=>{
  console.log(socket.id);
  prime_read();
})

socket.on('message', (data) => {
  data = JSON.parse(data);
  console.log(data.user.username + '> ' + data.msg);
})

