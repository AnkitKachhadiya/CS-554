import { v4 as uuidv4 } from "uuid";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function TrainerPokemonList({ pokemon }) {
    const pokemonList = [];

    function renderPokemons() {
        for (let index = 0; index < 6; index++) {
            const currentPokemon = pokemon[index];

            pokemonList.push(
                <Col
                    key={(currentPokemon && currentPokemon.id) || uuidv4()}
                    className="mb-4"
                >
                    <Card>
                        <Card.Img
                            variant="top"
                            src={
                                currentPokemon && currentPokemon.url
                                    ? currentPokemon.url
                                    : "N/A"
                            }
                            alt={
                                currentPokemon && currentPokemon.title
                                    ? currentPokemon.title
                                    : `Gotta Catch 'Em All`
                            }
                            onError={(event) => {
                                return (event.target.src =
                                    currentPokemon && currentPokemon.url
                                        ? "/pokemon-not-found.png"
                                        : "/no-pokemon.png");
                            }}
                            height="215"
                            width="215"
                        />
                        <Card.Body className="text-center">
                            <Card.Title className="text-uppercase text-truncate">
                                <Link
                                    to={
                                        currentPokemon && currentPokemon.id
                                            ? `/pokemon/${currentPokemon.id}`
                                            : "/pokemon/page/0"
                                    }
                                    className="text-decoration-none"
                                >
                                    {currentPokemon && currentPokemon.title ? (
                                        currentPokemon.title
                                    ) : (
                                        <span className="fs-6">
                                            Gotta Catch 'Em All
                                        </span>
                                    )}
                                </Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            );
        }

        return pokemonList;
    }

    return (
        <Row xs={1} md={6} className="mt-4">
            {renderPokemons()}
        </Row>
    );
}

export default TrainerPokemonList;
