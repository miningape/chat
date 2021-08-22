import { Socket } from "socket.io-client";
import { Service } from "typedi";

export default interface Command {
  pattern: string;

  run(argv: string[]): void;
}