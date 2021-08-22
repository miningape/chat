import 'reflect-metadata';
import io from 'socket.io-client';
import Input from './services/input.service';
import fs from 'fs';
import EchoCommand from './commands/implementations/echo.command';
import { UserProfile } from './interfaces/user.profile';
import Container from 'typedi';
import SocketService from './services/socket.service';
import { CommandToken } from './commands/command.token';
import importCommands from './commands/command.imports';

// Initialize socket connection


const inputService = Container.get(Input);
inputService.start();

const socketHandlers = (userProfile: UserProfile) => {
  // Command handler
  //const myInput = Container.get<Input>(Input);
  Container
    .get<SocketService>(SocketService)
    .setSocket(io('ws://34.140.159.168:8080'));
  
  const socket = Container
    .get<SocketService>(SocketService)
    .getSocket();

  const handleData = (data: any) => {
    console.log(data);
  }
  
  socket.on('connect', () => {
    //input.read();
    
  });
  
  socket.on('msg', handleData);
  
  socket.on('server_msg', handleData)
}

// Helper function, probably will be useful in a bit
const logInUser = (json: UserProfile) => {
  // Maybe do auth
  console.log('Logged in as: ', json);

  socketHandlers(json);
}

// Reads/makes profile.json for user info
fs.readFile('profile.json', (err, data) => {
  
  if (err) {
    let profileBuilderObject: UserProfile;

    //fs.writeFile();
    console.log('You dont have a profile yet');
    inputService.question('Username: ', (username: string) => {
      inputService.question('Flair: ', (flair: string) => {
        profileBuilderObject = {username, flair};

        fs.writeFile(
          'profile.json', 
          JSON.stringify({username, flair}), 
          (err) => {
            if (err) throw new Error('Cant write file' + err.message); 
            logInUser(profileBuilderObject);
          }
        );
      });
    });
    
  } else {
    logInUser(JSON.parse(data.toString()));
  }
});
