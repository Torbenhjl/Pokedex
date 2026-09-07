import { Cache } from "./pokecache.js";

const cache = new Cache(30);

export class PokeAPI {
private static readonly baseURL = "https://pokeapi.co/api/v2";


  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    const cached = cache.get<ShallowLocations>(url);

    if (cached !== undefined) {
      console.log("Using Cache: ", url);
      return cached;
    }
    console.log("fetching from API", url);
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }

    const data = (await response.json()) as ShallowLocations;
    cache.add(url,data);
  return data;
  }
  
  async fetchPokemon(pokemon: string): Promise<Pokemon> {
   
    const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;
    const cached = cache.get<Pokemon>(url);
    if (cached != undefined) {
      return cached;
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failedto fetch pokemon: ${pokemon}, status: ${response.status}`);

    }
    const data = (await response.json()) as Pokemon;
    cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = cache.get<LocationArea>(url);
    if(cached !== undefined) {
      console.log("Fetching data from cache: ");
      return cached;
    }
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Failed to fetch location: ${locationName}, Status: ${response.status}`);
    }
    const data = (await response.json()) as LocationArea;
    cache.add(url, data);
    return data;

  }
}

export type ShallowLocations = {
 count: number;
  next: string | null;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};

export type LocationArea = {
  name: string,
  pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
  pokemon: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];

  types: {
    type: {
      name: string;
    };
  }[];
};
