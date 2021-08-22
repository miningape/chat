import { Token } from "typedi";
import Command from "./command.base";

export const CommandToken = new Token<Command>('Commands');