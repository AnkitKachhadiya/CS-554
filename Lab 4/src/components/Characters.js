import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { Container, Spinner } from "react-bootstrap";
import AllCards from "./AllCards";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "./PaginationComponent";
import Search from "./Search";

const TOTAL_ITEMS_PER_PAGE = 36;

function Characters() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [searchTerm, setSearchTerm] = useState("");

    const offset = page * TOTAL_ITEMS_PER_PAGE;

    const { response, error, isLoading } = useAxios(
        "characters",
        TOTAL_ITEMS_PER_PAGE,
        searchTerm,
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
        response && response.data && response.data.results.length > 0
            ? true
            : false;

    const totalItems = isResponseAvailable ? response.data.total : 0;

    const totalPages = Math.ceil(totalItems / TOTAL_ITEMS_PER_PAGE);

    function changeHandler(event, pageNumber) {
        changeNavigationPage(pageNumber - 1);
    }

    function changeNavigationPage(pageNumber) {
        setCurrentPage(pageNumber);
        const path = `/characters/page/${pageNumber}`;
        navigate(path);
    }

    function searchButtonHandler(searchInput) {
        setSearchTerm(searchInput);
        changeNavigationPage(0);
    }

    return (
        <>
            <h1 className="text-center mt-5 mb-5">MARVEL CHARACTERS</h1>

            <Container fluid className="px-5">
                <Search
                    searchButtonHandler={searchButtonHandler}
                    searchTerm={searchTerm}
                />
                {isResponseAvailable && (
                    <>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage + 1}
                            changeHandler={changeHandler}
                        />
                        <AllCards
                            data={response.data.results}
                            listingType="characters"
                        />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage + 1}
                            changeHandler={changeHandler}
                        />
                    </>
                )}
            </Container>
            {error && <p>{error}</p>}
        </>
    );
}

export default Characters;
