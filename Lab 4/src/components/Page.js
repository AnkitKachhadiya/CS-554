import React, { useState, useEffect } from "react";
import { useAxiosList } from "../hooks/useAxios";
import { Container } from "react-bootstrap";
import AllCards from "./AllCards";
import { useParams, useNavigate, Link } from "react-router-dom";
import Pagination from "./PaginationComponent";
import Search from "./Search";
import Loader from "./Loader";

const TOTAL_ITEMS_PER_PAGE = 36;

function Page({ title, listingType }) {
    const navigate = useNavigate();
    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [searchTerm, setSearchTerm] = useState("");

    const offset = page * TOTAL_ITEMS_PER_PAGE;

    const { response, error, isLoading } = useAxiosList(
        listingType,
        TOTAL_ITEMS_PER_PAGE,
        searchTerm,
        offset
    );

    useEffect(() => {
        setCurrentPage(parseInt(page));
    }, [page]);

    if (isLoading) {
        return <Loader title={title} />;
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
        const path = `/${listingType}/page/${pageNumber}`;
        navigate(path);
    }

    function searchButtonHandler(searchInput) {
        setSearchTerm(searchInput);
        changeNavigationPage(0);
    }

    if (error) {
        return (
            <>
                <h1 className="text-center mt-5 mb-5">{title}</h1>
                <div className="text-center mt-5">
                    <h2>
                        Status Code:{" "}
                        {error && error.status ? error.status : 404} <br />
                        Error Message:{" "}
                        {error && error.message
                            ? error.message
                            : "Data not found"}
                    </h2>
                    <Link
                        className="btn btn-primary btn-marvel mt-3 marvel-error-btn"
                        to={`/${listingType}/page/0`}
                    >
                        Go Back
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="text-center mt-5 mb-5">{title}</h1>

            <Container fluid className="px-5">
                <Search
                    searchButtonHandler={searchButtonHandler}
                    searchTerm={searchTerm}
                    placeHolder={listingType}
                />
                {isResponseAvailable && response && (
                    <>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage + 1}
                            changeHandler={changeHandler}
                        />
                        <AllCards
                            data={response.data.results}
                            listingType={listingType}
                        />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage + 1}
                            changeHandler={changeHandler}
                        />
                    </>
                )}

                {!isResponseAvailable && (
                    <div className="text-center mt-5">
                        <h2>
                            Status Code: 404 <br />
                            Error Message: Data not found
                        </h2>
                    </div>
                )}
            </Container>
        </>
    );
}

export default Page;
