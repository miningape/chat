import Container from "typedi";
import ColorCommand from "./implementations/color.command";
import EchoCommand from "./implementations/echo.command";

export default function importCommands() {
  // Add commands to this list
  Container.import(
    [
      EchoCommand,
      ColorCommand,
    ]
  );  
}