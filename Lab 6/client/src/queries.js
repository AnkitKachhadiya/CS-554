import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
    query Pokemons($offset: Int) {
        pokemons(offset: $offset) {
            count
            result {
                id
                imageUrl
                name
                types {
                    name
                }
                abilities {
                    name
                }
            }
        }
    }
`;

export const GET_POKEMON = gql`
    query Pokemon($pokemonId: Int!) {
        pokemon(id: $pokemonId) {
            id
            imageUrl
            name
            types {
                name
            }
            abilities {
                name
            }
        }
    }
`;