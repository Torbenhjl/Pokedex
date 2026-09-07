import { CLICommand } from "./command.js";
import { State } from "./state.js";


export async function commandMap(state: State) {
  const locations = await state.api.fetchLocations(state.nextLocationsURL);

  for (const location of locations.results) {
    console.log(location.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}

export async function commandMapBack(state: State) {
  const locations = await state.api.fetchLocations(state.prevLocationsURL);

  for (const location of locations.results) {
    console.log(location.name);

  }
  state.prevLocationsURL = locations.previous;
  state.nextLocationsURL = locations.next;
}
