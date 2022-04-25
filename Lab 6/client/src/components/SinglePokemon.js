import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../queries";
import Loader from "./Loader";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { catchPokemon, releasePokemon } from "../redux/actions/trainerActions";

function SinglePokemon() {
    const dispatch = useDispatch();

    const { id } = useParams();

    const trainers = useSelector((state) => state.allTrainers);

    const { data, error, loading } = useQuery(GET_POKEMON, {
        variables: { pokemonId: parseInt(id) },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-center mt-5">{error.message}</p>;
    }

    if (!data || !data.pokemon) {
        return (
            <div className="text-center mt-5">
                <h2>
                    Status Code: 404 <br />
                    Error Message: Data not found
                </h2>
            </div>
        );
    }

    const [selectedTrainer] =
        trainers && trainers.length > 0
            ? trainers.filter((currentTrainer) => currentTrainer.isSelected)
            : [];

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

    function handleCatchPokemon(id, title, url) {
        const newPokemon = {
            id,
            title,
            url,
        };

        dispatch(catchPokemon(newPokemon));
    }

    function handleReleasePokemon(pokemonId) {
        dispatch(releasePokemon(pokemonId));
    }

    return (
        <>
            <h1 className="text-uppercase text-center mt-5">
                {(data && data.pokemon && data.pokemon.name) || "N/A"}
            </h1>
            {isTrainerSelected && (
                <div className="mt-3 text-center mb-3">
                    <>
                        {!isPokemonCaught(data.pokemon.id) &&
                            !isPokemonPartyFull() && (
                                <button
                                    className="badge bg-primary border-0"
                                    type="button"
                                    onClick={() =>
                                        handleCatchPokemon(
                                            data.pokemon.id,
                                            data.pokemon.name,
                                            data.pokemon.imageUrl
                                        )
                                    }
                                >
                                    <img
                                        src="/catch.png"
                                        alt="catch pokemon"
                                        height="20"
                                    />{" "}
                                    Catch
                                </button>
                            )}
                        {isPokemonCaught(data.pokemon.id) && (
                            <button
                                className="badge bg-danger border-0"
                                type="button"
                                onClick={() =>
                                    handleReleasePokemon(data.pokemon.id)
                                }
                            >
                                <img
                                    src="/release.png"
                                    alt="release pokemon"
                                    height="20"
                                />{" "}
                                Release
                            </button>
                        )}

                        {isPokemonPartyFull() &&
                            !isPokemonCaught(data.pokemon.id) && (
                                <button
                                    className="badge bg-secondary border-0 pe-none"
                                    type="button"
                                >
                                    <img
                                        src="/party-full.png"
                                        alt="party full"
                                        height="20"
                                    />{" "}
                                    Party Full
                                </button>
                            )}
                    </>
                </div>
            )}
            <Container fluid className="px-5 text-center">
                <img
                    src={
                        (data && data.pokemon && data.pokemon.imageUrl) || "N/A"
                    }
                    alt={(data && data.pokemon && data.pokemon.name) || "N/A"}
                    onError={(event) =>
                        (event.target.src = "/pokemon-not-found.png")
                    }
                />

                <div className="mt-4">
                    {data.pokemon.types.map((currentType) => (
                        <span
                            key={currentType.name}
                            className={`text-capitalize pokemon-type ${currentType.name}-type`}
                        >
                            {currentType.name}
                        </span>
                    ))}
                </div>
                <Row className="mt-5">
                    <Col>
                        <p>Abilities</p>
                        <ul className="list-unstyled">
                            {data.pokemon.abilities.map((currentAbility) => (
                                <li
                                    key={currentAbility.name}
                                    className="text-capitalize"
                                >
                                    {currentAbility.name}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SinglePokemon;
