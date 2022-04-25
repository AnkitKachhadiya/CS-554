import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function TrainerPokemonList({ pokemon }) {
    console.log(pokemon);

    function renderPokemons() {
        for (let index = 0; index < 6; index++) {
            console.log(pokemon[index]);
        }
        return (
            <Col key="d" className="mb-4">
                <Card>
                    <Card.Img />
                    <Card.Body>
                        <Card.Title>
                            <Link
                                to={`/pokemon/`}
                                className="text-decoration-none"
                            ></Link>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    return (
        <Row xs={1} md={6} className="mt-4">
            {renderPokemons()}
        </Row>
    );
}

export default TrainerPokemonList;
