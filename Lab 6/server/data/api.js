const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemons(offset = 0) {
    try {
        const PER_PAGE = 36;

        const API_URL = `${BASE_URL}?limit=${PER_PAGE}&offset=${offset}`;

        const { data } = await axios.get(API_URL);

        const pokemons =
            data &&
            isObject(data) &&
            data.results &&
            Array.isArray(data.results) &&
            data.results.length > 0
                ? data.results.map(
                      async (currentPokemon) =>
                          await _getPokemon(currentPokemon)
                  )
                : [];
        const count = data.count || 0;

        return {
            count: count,
            result: pokemons,
        };
    } catch (error) {
        console.log(error);
        return {
            count: 0,
            result: [],
        };
    }
}

async function _getPokemon(pokemon) {
    const POKEMON_API_URL = pokemon.url;

    const pokemonDetails = await getPokemonDetails(POKEMON_API_URL);

    const pokemonData = _getPokemonData(pokemonDetails);

    return pokemonData;
}

async function getPokemonDetails(Url) {
    const { data } = await axios.get(Url);

    return data && isObject(data) ? data : {};
}

async function getPokemonById(id) {
    try {
        const API_URL = `${BASE_URL}/${id}`;

        const { data } = await axios.get(API_URL);

        const pokemonData = data ? _getPokemonData(data) : null;

        return pokemonData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function _getPokemonData(pokemon) {
    return {
        id: (pokemon && pokemon.id) || pokemon.name || "N/A",
        imageUrl:
            (pokemon &&
                pokemon.sprites &&
                pokemon.sprites.other &&
                pokemon.sprites.other["official-artwork"] &&
                pokemon.sprites.other["official-artwork"].front_default) ||
            "N/A",
        name: (pokemon && pokemon.name) || "N/A",
        types:
            pokemon &&
            pokemon.types &&
            Array.isArray(pokemon.types) &&
            pokemon.types.length > 0
                ? pokemon.types.map((currentType) => ({
                      name: currentType.type.name,
                  }))
                : [],
        abilities:
            pokemon &&
            pokemon.abilities &&
            Array.isArray(pokemon.abilities) &&
            pokemon.abilities.length > 0
                ? pokemon.abilities.map((currentAbility) => ({
                      name: currentAbility.ability.name,
                  }))
                : [],
    };
}

function isObject(obj) {
    return (
        !Array.isArray(obj) &&
        typeof obj === "object" &&
        obj !== null &&
        obj instanceof Object &&
        obj.constructor === Object
    );
}

module.exports = { getPokemons, getPokemonById };
