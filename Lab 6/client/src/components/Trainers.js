import { Container } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTrainer, selectTrainer } from "../redux/actions/trainerActions";

import AddTrainer from "./AddTrainer";
import TrainerList from "./TrainerList";

function Trainers() {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);

    function handleDeleteTrainer(trainerId) {
        dispatch(deleteTrainer(trainerId));
    }

    function handleSelectTrainer(trainerId) {
        dispatch(selectTrainer(trainerId));
    }

    function handleAddTrainerForm() {
        setShowForm(!showForm);
    }

    return (
        <>
            <h1 className="text-center mt-5 mb-3">Pokémon Trainers</h1>

            <Container fluid className="px-5">
                <div className="text-center">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleAddTrainerForm}
                    >
                        Add Trainer
                    </button>
                </div>

                {showForm && <AddTrainer />}

                <TrainerList
                    handleDeleteTrainer={handleDeleteTrainer}
                    handleSelectTrainer={handleSelectTrainer}
                />
            </Container>
        </>
    );
}

export default Trainers;
