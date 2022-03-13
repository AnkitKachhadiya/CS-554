import React from "react";
import useAxios from "../hooks/useAxios";
import { Container, Spinner } from "react-bootstrap";
import AllCards from "./AllCards";

function Comics() {
    const { response, error, isLoading } = useAxios("comics");

    if (isLoading) {
        return (
            <>
                <h1 className="text-center mt-5 mb-5">MARVEL COMICS</h1>
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
            <h1 className="text-center mt-5 mb-5">MARVEL COMICS</h1>
            <Container fluid>
                {response && response.data && response.data.results && (
                    <AllCards
                        data={response.data.results}
                        listingType="comics"
                    />
                )}
            </Container>
            {error && <p>{error}</p>}
        </>
    );
}

export default Comics;
