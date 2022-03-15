import React from "react";
import useAxios from "../hooks/useAxios";
import { Container, Spinner } from "react-bootstrap";
import AllCards from "./AllCards";

function Series() {
    const { response, error, isLoading } = useAxios("series");

    if (isLoading) {
        return (
            <>
                <h1 className="text-center mt-5 mb-5">MARVEL SERIES</h1>
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
            <h1 className="text-center mt-5 mb-5">MARVEL SERIES</h1>
            <Container fluid className="px-5">
                {response && response.data && response.data.results && (
                    <AllCards
                        data={response.data.results}
                        listingType="series"
                    />
                )}
            </Container>
            {error && <p>{error}</p>}
        </>
    );
}

export default Series;
