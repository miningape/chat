import 'reflect-metadata';
import { Socket } from "socket.io-client";
import { Service } from "typedi";

@Service()
export default class SocketService {
  public socket!: Socket;

  setSocket( socket: Socket ) {
    this.socket = socket;
  }

  getSocket() {
    return this.socket!;
  }
}