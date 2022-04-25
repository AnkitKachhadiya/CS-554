const { gql } = require("apollo-server");

const typeDefs = gql`
    type Pokemon {
        "Unique identifier for pokemon"
        id: ID!

        "Image URL"
        imageUrl: String!

        "Name of the pokemon"
        name: String!
    }

    type SinglePokemon {
        "Unique identifier for pokemon"
        id: ID!

        "Image URL"
        imageUrl: String!

        "Name of the pokemon"
        name: String!

        "Pokemon types"
        types: [Type!]

        "Pokemon abilities"
        abilities: [Ability!]
    }

    type Type {
        "Pokemon type"
        name: String!
    }

    type Ability {
        "Pokemon ability"
        name: String!
    }

    type Pokemons {
        "Pokemon total count"
        count: Int!

        "Pokemons"
        result: [Pokemon!]
    }

    type Query {
        "Get all pokemons"
        pokemons(offset: Int): Pokemons

        "Get pokemon by id"
        pokemon(id: Int!): SinglePokemon
    }
`;

module.exports = { typeDefs };
