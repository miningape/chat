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
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",
	
	Black: "\x1b[30m",
	Red: "\x1b[31m",
	Green: "\x1b[32m",
	Yellow: "\x1b[33m",
	Blue: "\x1b[34m",
	Magenta: "\x1b[35m",
	Cyan: "\x1b[36m",
	White: "\x1b[37m",
	
	B_Black: "\x1b[40m",
	B_Red: "\x1b[41m",
	B_Green: "\x1b[42m",
	B_Yellow: "\x1b[43m",
	B_Blue: "\x1b[44m",
	B_Magenta: "\x1b[45m",
	B_Cyan: "\x1b[46m",
	B_White: "\x1b[47m",
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