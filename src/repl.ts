import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandMapBack ,commandMap } from "./command_map.js";
import { commandCatch } from "./command_catch.js";
import { CLICommand, State, initState } from "./state.js";
import { commandInspect } from "./command_inspect.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

const state = initState();

export async function startRepl() {

  state.rl.prompt();

  state.rl.on('line', (line: string) => {
    // const commands = getCommands();
    // const numberOfCommands = Object.keys(commands).length;
    const inputLine = cleanInput(line);
    switch (inputLine[0]) {
      case "":
        break;
      case "help":
        commandHelp(state);
        break;
      case "exit":
    commandExit(state);
        break;
      case "map":
        commandMap(state);
        break;
      case "mapb":
        commandMapBack(state);
        break;
      case "pokedex":
        commandPokedex(state);
        break;
      case "explore":
        commandExplore(state, ...inputLine.slice(1));
        break;
      case "catch":
        commandCatch(state, ...inputLine.slice(1));
        break;
      case "inspect":
        commandInspect(state, ...inputLine.slice(1));
        break;
      default:
        console.log("Unknown command: " + inputLine);
        break;
    }

    state.rl.prompt();
  }).on('close', () => {
     commandExit(state);
    });

}
