import { Service } from "typedi";
import SocketService from "../../services/socket.service";
import Command from "../command.base";
import { CommandToken } from "../command.token";

@Service( { id: CommandToken, multiple: true } )
export default class ColorCommand implements Command {
  constructor (
    private socketService: SocketService,
  ) {}

  pattern: string = '/color';

  private resetCode = '\x1b[0m';
  private colors: Record<string, string> = {
    red: '\x1b[31m',
  }

  run(argv: string[]): void {
    const requestedColor = argv[1];

    const colorCode = this.colors[requestedColor];

    if (colorCode) {
      this.socketService
        .getSocket()
        .emit(
          'msg', 
          `${colorCode}${argv.slice(2).join(' ')}${this.resetCode}`
        );
    } else {
      console.log(`Color: ${argv[1]}, was not found`)
    }
  }
}