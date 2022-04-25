import { ActionTypes } from "../constants/action-types";

export const trainerReducer = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_TRAINER:
            return [...state, { ...payload.trainer }];

        case ActionTypes.DELETE_TRAINER:
            return state.filter(
                (currentTrainer) => currentTrainer.id !== payload.trainerId
            );

        case ActionTypes.SELECT_TRAINER:
            return state.map((currentTrainer) => {
                return currentTrainer.id === payload.trainerId
                    ? {
                          ...currentTrainer,
                          isSelected: true,
                      }
                    : { ...currentTrainer, isSelected: false };
            });

        case ActionTypes.CATCH_POKEMON:
            return state.map((currentTrainer) => {
                if (currentTrainer.isSelected === false) {
                    return currentTrainer;
                }

                return {
                    ...currentTrainer,
                    pokemon: [
                        ...currentTrainer.pokemon,
                        { ...payload.pokemon },
                    ],
                    pokemonCount: currentTrainer.pokemonCount + 1,
                };
            });

        case ActionTypes.RELEASE_POKEMON:
            return state.map((currentTrainer) => {
                if (currentTrainer.isSelected === false) {
                    return currentTrainer;
                }

                return {
                    ...currentTrainer,
                    pokemon: currentTrainer.pokemon.filter(
                        (currentPokemon) =>
                            currentPokemon.id !== payload.pokemonId
                    ),
                    pokemonCount: currentTrainer.pokemonCount - 1,
                };
            });

        default:
            return state;
    }
};
