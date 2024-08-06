document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonList();
});

async function fetchPokemonList() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        displayPokemonList(data.results);
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
    }
}

function displayPokemonList(pokemonList) {
    const listElement = document.getElementById('pokemon-list');
    listElement.innerHTML = '';
    pokemonList.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        listItem.addEventListener('click', () => fetchPokemonDetails(pokemon.url));
        listElement.appendChild(listItem);
    });
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const pokemon = await response.json();
        displayPokemonDetails(pokemon);
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

function displayPokemonDetails(pokemon) {
    const detailsElement = document.getElementById('pokemon-details');
    const nameElement = document.getElementById('pokemon-name');
    const statsElement = document.getElementById('pokemon-stats');
    const abilitiesElement = document.getElementById('pokemon-abilities');

    nameElement.textContent = pokemon.name;
    
    statsElement.innerHTML = `<strong>Estadísticas:</strong><br>${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>')}`;
    
    abilitiesElement.innerHTML = `<strong>Habilidades:</strong><br>${pokemon.abilities.map(ability => ability.ability.name).join('<br>')}`;
    
    detailsElement.classList.remove('hidden');
}
