import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}



export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp
    }
    // add more commands here 
  };
}

export function startRepl() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex> ',
  });

  rl.prompt();

  rl.on('line', (line: string) => {
    const commands = getCommands();
    const numberOfCommands = Object.keys(commands).length;
    const inputLine = cleanInput(line);
    switch (inputLine[0]) {
      case "":
        rl.prompt();
        break;
      case "help":
        commandHelp(getCommands());
        rl.prompt();
      default:
        "Unknown command: " + inputLine;
        break;
    }

    for (const command of Object.values(getCommands())) {

    }
    rl.prompt();
  }).on('close', () => {
    commandExit();
  });

}
