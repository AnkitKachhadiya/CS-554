import React from "react";
import useAxios from "../hooks/useAxios";
import { Container, Spinner, Pagination } from "react-bootstrap";
import AllCards from "./AllCards";
import { useParams, useNavigate } from "react-router-dom";

const TOTAL_ITEMS_PER_PAGE = 36;

function Characters() {
    const navigate = useNavigate();
    const { page } = useParams();

    const offset = page * TOTAL_ITEMS_PER_PAGE;

    const { response, error, isLoading } = useAxios(
        "characters",
        TOTAL_ITEMS_PER_PAGE,
        "",
        offset
    );

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

    const isResponseAvailable =
        response && response.data && response.data.results;

    const totalItems = isResponseAvailable ? response.data.total : 0;

    const totalPages = Math.ceil(totalItems / TOTAL_ITEMS_PER_PAGE);

    function changePage(pageNumber) {
        const path = `/characters/page/${pageNumber}`;
        navigate(path);
    }

    function getPageItems() {
        const pageItems = [];

        for (
            let currentNumber = 0;
            currentNumber < totalPages;
            currentNumber++
        ) {
            pageItems.push(
                <Pagination.Item
                    key={currentNumber}
                    onClick={() => changePage(currentNumber)}
                >
                    {currentNumber}
                </Pagination.Item>
            );
        }

        return pageItems;
    }

    return (
        <>
            <h1 className="text-center mt-5 mb-5">MARVEL CHARACTERS</h1>
            <Container fluid>
                {isResponseAvailable && (
                    <AllCards
                        data={response.data.results}
                        listingType="characters"
                    />
                )}
            </Container>
            {error && <p>{error}</p>}
            {isResponseAvailable && (
                <Pagination className="justify-content-center">
                    {getPageItems()}
                </Pagination>
            )}
        </>
    );
}

export default Characters;
