const { getPokemons, getPokemonById } = require("../data/api");
// const {} = require("../data/redis-db");

const resolvers = {
    Query: {
        pokemons: async (_, { offset = 0, query = "" }) => {
            const pokemons = await getPokemons(offset, query);
            return pokemons;
        },

        pokemon: async (_, { id }) => {
            const pokemon = await getPokemonById(id);
            return pokemon;
        },
    },
};

module.exports = { resolvers };
