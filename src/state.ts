import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  api: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
  });

  const api = new PokeAPI();

  const commands: Record<string, CLICommand> = {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    explore: {
      name: "explore",
      description: "Explore an area",
      callback: commandExplore,
    }
  };

  return {
    rl,
    commands,
    api,
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}
