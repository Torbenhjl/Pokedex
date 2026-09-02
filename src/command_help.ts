import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!\n Usage:\n help: Displays a help message\n exit: Exit the Pokedex")
}
