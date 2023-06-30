const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');
const shiny = document.querySelector('.shiny-charm');

let searchPokemon = 2;
let isShiny = false;

const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonImage.style.display = 'block';
  pokemonName.textContent = 'Loading...';
  pokemonNumber.textContent = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;

    const sprites = data.sprites;
    let spriteUrl;

    if (isShiny) {
      if (data.id >= 906 && sprites.other?.['official-artwork'].front_shiny) {
        spriteUrl = sprites.other['official-artwork'].front_shiny;
      } else if (data.id >= 650) {
        spriteUrl = sprites.front_shiny;
      } else {
        spriteUrl = sprites.versions['generation-v']['black-white'].animated.front_shiny;
      }
    } else {
      if (data.id >= 650) {
        spriteUrl = sprites.front_default;
      } else {
        spriteUrl = sprites.versions['generation-v']['black-white'].animated.front_default;
      }
    }

    pokemonImage.src = spriteUrl;
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.textContent = 'Not Found :(';
    pokemonNumber.textContent = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

next.addEventListener('click', () => {
  if (searchPokemon <= 1010) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

shiny.addEventListener('click', () => {
  isShiny = !isShiny;
  renderPokemon(searchPokemon);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  } else if (event.key === 'ArrowRight') {
    if (searchPokemon <= 1010) {
      searchPokemon += 1;
      renderPokemon(searchPokemon);
    }
  }
});

renderPokemon(searchPokemon);
