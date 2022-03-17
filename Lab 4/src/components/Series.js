import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { Container, Spinner } from "react-bootstrap";
import AllCards from "./AllCards";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "./PaginationComponent";

const TOTAL_ITEMS_PER_PAGE = 36;

function Series() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(page));

    const offset = page * TOTAL_ITEMS_PER_PAGE;

    const { response, error, isLoading } = useAxios(
        "series",
        TOTAL_ITEMS_PER_PAGE,
        "",
        offset
    );
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

    const isResponseAvailable =
        response && response.data && response.data.results;

    const totalItems = isResponseAvailable ? response.data.total : 0;

    const totalPages = Math.ceil(totalItems / TOTAL_ITEMS_PER_PAGE);

    function changeHandler(event, pageNumber) {
        setCurrentPage(pageNumber - 1);
        const path = `/series/page/${pageNumber - 1}`;
        navigate(path);
    }

    return (
        <>
            <h1 className="text-center mt-5 mb-5">MARVEL SERIES</h1>
            <Container fluid className="px-5">
                {isResponseAvailable && (
                    <AllCards
                        data={response.data.results}
                        listingType="series"
                    />
                )}
                {isResponseAvailable && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage + 1}
                        changeHandler={changeHandler}
                    />
                )}
            </Container>
            {error && <p>{error}</p>}
        </>
    );
}

export default Series;
