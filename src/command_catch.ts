import { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemon = args[0];

  console.log(`Throwing a Pokeball at ${pokemon}...`);

  const pokemonData = await state.api.fetchPokemon(pokemon);

  const chanceToCatch = Math.random();

  if (chanceToCatch * pokemonData.base_experience > 40) {
    console.log(`${pokemon} escaped!`);
  } else {
    console.log(`${pokemon} was caught!`);

    state.pokedex[pokemonData.name] = pokemonData;
  }
}
