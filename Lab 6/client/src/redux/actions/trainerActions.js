import { ActionTypes } from "../constants/action-types";

export const addTrainer = (trainer) => {
    return {
        type: ActionTypes.ADD_TRAINER,
        payload: { trainer: trainer },
    };
};

export const deleteTrainer = (trainerId) => {
    return {
        type: ActionTypes.DELETE_TRAINER,
        payload: { trainerId: trainerId },
    };
};

export const selectTrainer = (trainerId) => {
    return {
        type: ActionTypes.SELECT_TRAINER,
        payload: { trainerId: trainerId },
    };
};

export const catchPokemon = (pokemon) => {
    return {
        type: ActionTypes.CATCH_POKEMON,
        payload: { pokemon: pokemon },
    };
};

export const releasePokemon = (pokemonId) => {
    return {
        type: ActionTypes.RELEASE_POKEMON,
        payload: { pokemonId: pokemonId },
    };
};
