const data = await fetch(
  'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50'
);

const pokemons = await data.json();
const strPokemon = new TextEncoder().encode(JSON.stringify(pokemons.results));

Deno.writeFileSync('./pokemon_data.json', strPokemon);
