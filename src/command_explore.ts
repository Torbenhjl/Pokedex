import { State, CLICommand } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const areaName = args[0];
  const area = await state.api.fetchLocation(areaName);

  console.log(`exploring ${areaName}`);

  for(const encounter of area.pokemon_encounters){
    console.log(encounter.pokemon.name);
  }
}
