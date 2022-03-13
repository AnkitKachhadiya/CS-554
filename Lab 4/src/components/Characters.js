import React from "react";
import useAxios from "../hooks/useAxios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Characters() {
    const { response, error, isLoading } = useAxios("characters");

    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    return (
        <>
            <div>
                <h1>MARVEL CHARACTERS LIST</h1>
                <Container fluid>
                    <Row xs={1} md={6}>
                        {response &&
                            response.data.results.map((currentCharacter) => {
                                return (
                                    <Col>
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={`${currentCharacter.thumbnail.path}/portrait_fantastic.${currentCharacter.thumbnail.extension}`}
                                            />
                                            <Card.Body>
                                                <Card.Title>
                                                    {currentCharacter.name}
                                                </Card.Title>
                                                <Button variant="primary">
                                                    Go somewhere
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
                <p>{error}</p>
            </div>
        </>
    );
}

export default Characters;
