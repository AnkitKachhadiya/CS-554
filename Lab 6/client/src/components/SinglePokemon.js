import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../queries";
import Loader from "./Loader";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SinglePokemon() {
    const { id } = useParams();

    const { data, error, loading } = useQuery(GET_POKEMON, {
        variables: { pokemonId: parseInt(id) },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-center mt-5">{error}</p>;
    }

    return (
        <>
            <h1 className="text-uppercase text-center mt-5">
                {(data && data.pokemon && data.pokemon.name) || "N/A"}
            </h1>
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
