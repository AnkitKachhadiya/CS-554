import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { catchPokemon, releasePokemon } from "../redux/actions/trainerActions";

function SingleCard({
    id,
    title,
    url,
    isTrainerSelected,
    isCaught,
    isPartyFull,
}) {
    const dispatch = useDispatch();

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
        <Card>
            <Card.Img
                variant="top"
                src={url}
                alt={title}
                onError={(event) =>
                    (event.target.src = "/pokemon-not-found.png")
                }
                height="215"
                width="215"
            />
            <Card.Body className="text-center">
                <Card.Title className="text-uppercase text-truncate">
                    <Link
                        to={`/pokemon/${id}`}
                        className="text-decoration-none"
                    >
                        {title}
                    </Link>
                    <div className="mt-3">
                        {isTrainerSelected && (
                            <>
                                {!isCaught && !isPartyFull && (
                                    <button
                                        className="badge bg-primary border-0"
                                        type="button"
                                        onClick={() =>
                                            handleCatchPokemon(id, title, url)
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
                                {isCaught && (
                                    <button
                                        className="badge bg-danger border-0"
                                        type="button"
                                        onClick={() => handleReleasePokemon(id)}
                                    >
                                        <img
                                            src="/release.png"
                                            alt="release pokemon"
                                            height="20"
                                        />{" "}
                                        Release
                                    </button>
                                )}

                                {isPartyFull && !isCaught && (
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
                        )}
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default SingleCard;
