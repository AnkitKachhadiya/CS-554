import React from "react";
import SingleCard from "./SingleCard";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function AllCards({ data }) {
    const trainers = useSelector((state) => state.allTrainers);

    const [selectedTrainer] =
        trainers && trainers.length > 0
            ? trainers.filter((currentTrainer) => currentTrainer.isSelected)
            : [];

    console.log(selectedTrainer);

    const isTrainerSelected = selectedTrainer ? true : false;

    function isPokemonCaught(pokemonId) {
        if (!selectedTrainer) {
            return false;
        }

        if (selectedTrainer.pokemonCount < 1) {
            return false;
        }

        for (const currentPokemon of selectedTrainer.pokemon) {
            if (currentPokemon.id === pokemonId) {
                return true;
            }
        }

        return false;
    }

    function isPokemonPartyFull() {
        if (!selectedTrainer) {
            return false;
        }

        if (selectedTrainer.pokemonCount < 1) {
            return false;
        }

        if (
            selectedTrainer.pokemonCount > 5 ||
            selectedTrainer.pokemon.length > 5
        ) {
            return true;
        }
    }

    return (
        <Row xs={1} md={6}>
            {data.map((currentElement) => {
                return (
                    <Col key={currentElement.id} className="mb-4">
                        <SingleCard
                            id={currentElement.id}
                            url={currentElement.imageUrl}
                            title={currentElement.name}
                            isTrainerSelected={isTrainerSelected}
                            isCaught={isPokemonCaught(currentElement.id)}
                            isPartyFull={isPokemonPartyFull()}
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

export default AllCards;
