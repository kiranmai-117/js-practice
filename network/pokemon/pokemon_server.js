const createResponsePage = ({ name, url }, img) => {
  return `<html>
  <body>
  <h1> name : ${name} </h1>
  <p>
  <h3>IMAGE</h3>
  <img src = '${img}' alt = 'image not found'>
  <h3>more about pokemon<h3>
  <a href = '${url}'>${name}</a>
  </p>
  </body>
  </html>`
}

const getPokemon = (name, id) => {
  const pokemonsData = Deno.readFileSync('./pokemon_data.json');
  const strData = new TextDecoder().decode(pokemonsData);
  const pokemons = JSON.parse(strData);

  if (id) {
    return pokemons[id - 1];
  }

  for (const pokemon of pokemons) {
    if (pokemon.name === name) {
      return pokemon
    }
  }

}

const getData = (path) => {
  let id;
  let pokemon;

  try {
    id = parseInt(path.match(/\d+/)[0]);
    pokemon = getPokemon(null, id);
  } catch {
    pokemon = getPokemon(path.slice(1), id);
    id = pokemon.url.match(/\/\d+/)[0].slice(1);
  }
  return { id, pokemon };
}

const handler = (request) => {
  const path = new URL(request.url).pathname;
  const { id, pokemon } = getData(path);

  const img = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' +
    `${id}`.padStart(3, '0') + '.png';

  if (!pokemon) {
    return new Response('<h2> NOT FOUND </h2>', {
      headers: {
        'content-type': 'text/html'
      }
    });
  }

  const responsePage = createResponsePage(pokemon, img);
  return new Response(responsePage, {
    headers: {
      'content-type': 'text/html'
    }
  });
}

const main = () => {
  Deno.serve(handler);
}

main();