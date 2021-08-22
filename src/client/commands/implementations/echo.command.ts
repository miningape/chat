import 'reflect-metadata';
import { Socket } from "socket.io-client";
import { Service } from "typedi";
import Input from "../../services/input.service";
import { UserProfile } from "../../interfaces/user.profile";
import SocketService from "../../services/socket.service";
import Command from "../command.base";
import { CommandToken } from "../command.token";

@Service( { id: CommandToken } )
export default class EchoCommand implements Command {
  constructor(
    private socket: SocketService,
  ) {}

  pattern: string = '/echo';

  run(argv: string[]): void {
    //console.log(this.input);
    console.log(argv);
    this.socket.getSocket().emit('echo', argv);
  }
}