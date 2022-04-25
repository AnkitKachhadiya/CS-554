import { useSelector } from "react-redux";
import TrainerPokemonList from "./TrainerPokemonList";

function TrainerList({ handleSelectTrainer, handleDeleteTrainer }) {
    const trainers = useSelector((state) => state.allTrainers);

    return (
        <div className="mt-5">
            {trainers &&
                trainers.length > 0 &&
                trainers.map((currentTrainer) => (
                    <div key={currentTrainer.id} className="mt-4">
                        <div>
                            <p className="m-0 d-inline-block">
                                <span className="fs-5 fw-bold mx-1">
                                    Trainer: {currentTrainer.name}
                                </span>
                            </p>

                            <div className="float-end d-inline-block">
                                {!currentTrainer.isSelected && (
                                    <>
                                        <button
                                            className="badge bg-danger border-0 mx-1"
                                            onClick={() =>
                                                handleDeleteTrainer(
                                                    currentTrainer.id
                                                )
                                            }
                                        >
                                            Delete Trainer
                                        </button>
                                        <button
                                            className="badge bg-info border-0 mx-1 text-black"
                                            onClick={() =>
                                                handleSelectTrainer(
                                                    currentTrainer.id
                                                )
                                            }
                                        >
                                            Select Trainer
                                        </button>
                                    </>
                                )}
                                {currentTrainer.isSelected && (
                                    <button className="badge bg-success border-0 mx-1 pe-none">
                                        Selected
                                    </button>
                                )}
                            </div>
                        </div>
                        <TrainerPokemonList pokemon={currentTrainer.pokemon} />
                    </div>
                ))}
        </div>
    );
}

export default TrainerList;
