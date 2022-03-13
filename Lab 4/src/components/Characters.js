import React from "react";
import useAxios from "../hooks/useAxios";
import { Container, Spinner } from "react-bootstrap";
import AllCards from "./AllCards";

function Characters() {
    const { response, error, isLoading } = useAxios("characters");

    if (isLoading) {
        return (
            <>
                <h1 className="text-center mt-5 mb-5">MARVEL CHARACTERS</h1>
                <div className="text-center mt-5">
                    <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="text-center mt-5 mb-5">MARVEL CHARACTERS</h1>
            <Container fluid>
                {response && response.data && response.data.results && (
                    <AllCards
                        data={response.data.results}
                        listingType="characters"
                    />
                )}
            </Container>
            {error && <p>{error}</p>}
        </>
    );
}

export default Characters;
