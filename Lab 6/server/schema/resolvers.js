const { getPokemons, getPokemonById } = require("../data/api");
// const {} = require("../data/redis-db");

const resolvers = {
    Query: {
        pokemons: async (_, { pageNum = 0 }) => {
            const pokemons = await getPokemons(pageNum);
            return pokemons;
        },

        pokemon: async (_, { id }) => {
            const pokemon = await getPokemonById(id);
            return pokemon;
        },
    },
};

module.exports = { resolvers };
