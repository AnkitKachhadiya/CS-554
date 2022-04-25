import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import TrainerPokemonList from "./TrainerPokemonList";

function TrainerList({ handleSelectTrainer, handleDeleteTrainer }) {
    const trainers = useSelector((state) => state.allTrainers);

    return (
        <Container className="mt-5">
            {trainers &&
                trainers.length > 0 &&
                trainers.map((currentTrainer) => (
                    <div key={currentTrainer.id}>
                        <div>
                            <p className="m-0">
                                <span className="fs-5 fw-bold mx-1">
                                    Trainer: {currentTrainer.name}
                                </span>
                            </p>

                            <div className="float-end">
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
                                            className="badge bg-info border-0 mx-1"
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
                                    <button className="badge bg-success border-0 mx-1">
                                        Selected
                                    </button>
                                )}
                            </div>
                        </div>
                        <TrainerPokemonList pokemon={currentTrainer.pokemon} />
                    </div>
                ))}
        </Container>
    );
}

export default TrainerList;
