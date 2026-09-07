import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const pokemonNames = Object.keys(state.pokedex);

  if (pokemonNames.length === 0) {
    console.log("Your pokedex is empty...");
    return;
  }

  for (const name of pokemonNames) {
    console.log(name);
  }
}
