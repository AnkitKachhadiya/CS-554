const axios = require("axios");
const { setPokemonPage, getPokemonPage } = require("./redis-db");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const BASE_OFFICIAL_ARTWORK_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

async function getPokemons(offset = 0) {
    try {
        if (offset === null) {
            return null;
        }

        //check cache data available or not
        const cacheData = await getPokemonPage(offset);

        if (cacheData !== null) {
            return cacheData;
        }

        const PER_PAGE = 36;

        const API_URL = `${BASE_URL}?limit=${PER_PAGE}&offset=${offset}`;

        const { data } = await axios.get(API_URL);

        const pokemons =
            data &&
            isObject(data) &&
            data.results &&
            Array.isArray(data.results) &&
            data.results.length > 0
                ? data.results.map((currentPokemon) =>
                      _getPokemon(currentPokemon)
                  )
                : [];
        const count = data.count || 0;

        const result = {
            count: count,
            result: pokemons,
        };

        //set cache data
        if (pokemons && pokemons.length > 0) {
            await setPokemonPage(result, offset);
        }

        return result;
    } catch (error) {
        console.log(error);
        return {
            count: 0,
            result: [],
        };
    }
}

function _getPokemon(pokemon) {
    const splitUrl = pokemon.url.split("/");
    splitUrl.pop();

    const pokemonId = splitUrl.pop();

    const newPokemon = {
        id: pokemonId,
        imageUrl: `${BASE_OFFICIAL_ARTWORK_URL}${pokemonId}.png`,
        name: pokemon.name,
    };

    return newPokemon;
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
