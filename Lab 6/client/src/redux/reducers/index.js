import { combineReducers } from "redux";
import { trainerReducer } from "./trainerReducer";

const reducers = combineReducers({
    allTrainers: trainerReducer,
});

export default reducers;
