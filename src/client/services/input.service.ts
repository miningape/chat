import 'reflect-metadata';
import readline from 'readline';
import { Socket } from 'socket.io-client';
import Command from '../commands/command.base';
import CommandImport from '../commands/command.imports';
import Container, { Inject, Service } from 'typedi';
import SocketService from './socket.service';
import { CommandToken } from '../commands/command.token';
import importCommands from '../commands/command.imports';

const myRL = require('serverline');


@Service()
export default class Input {
  commands!: Command[];
  socket!: Socket;

  constructor(
    private socketService: SocketService,
  ) {}

  start = () => {
    importCommands();
    this.commands = Container.getMany(CommandToken);
  
    this.socket = this.socketService.getSocket();

    myRL.init();
    myRL.setCompletion(this.commands.map(command => command.pattern));
    myRL.on('line', this.read_input);
  }

  question = (question: string, callback: (result: string) => any) => {
    myRL.question(question, callback);
  }

  read_input = (input: string) => {
    let matched_command = false;

    // Check command
    this.commands.forEach(command => {
      if ( (new RegExp(command.pattern)).test(input) ) {
        command.run(input.split(' '));
        matched_command = true;
      }
    });

    // Else send as msg
    if (!matched_command) {
      this.socket.emit('msg', input);
    }
  }
}