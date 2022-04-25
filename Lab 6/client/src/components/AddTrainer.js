import { v4 as uuidv4 } from "uuid";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTrainer } from "../redux/actions/trainerActions";

function AddTrainer() {
    const dispatch = useDispatch();

    const [trainerName, setTrainerName] = useState("");
    const [errors, setErrors] = useState("");

    function handleAddTrainer() {
        let errors = "";

        if (trainerName.length < 1) {
            errors += `Trainer name is required.`;
        }

        setErrors(errors);

        if (errors.trim().length > 0) {
            return false;
        }

        const newTrainer = {
            id: uuidv4(),
            name: trainerName,
            isSelected: false,
            pokemonCount: 0,
            pokemon: [],
        };

        dispatch(addTrainer(newTrainer));
        resetAddTrainerForm();
    }

    function resetAddTrainerForm() {
        setTrainerName("");
    }

    return (
        <>
            <InputGroup className="mb-3 mt-3 pokemon-input-group">
                <FormControl
                    placeholder="Enter trainer name"
                    aria-label="Search"
                    aria-describedby="search-button"
                    className="pokemon-form-control"
                    onChange={(event) =>
                        setTrainerName(event.target.value.trim())
                    }
                    value={trainerName}
                />
                <Button
                    id="submit-button"
                    type="button"
                    onClick={handleAddTrainer}
                >
                    Submit
                </Button>
            </InputGroup>
            {errors.length > 0 && (
                <p className="text-danger text-center">{errors}</p>
            )}
        </>
    );
}

export default AddTrainer;
