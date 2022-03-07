import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Pagination = ({
    previousHandler,
    nextHandler,
    pageCount,
    isFirstPage,
    isLastPage,
}) => {
    return (
        <>
            {!isFirstPage && (
                <Button
                    component={Link}
                    to={`/shows/page/${pageCount - 1}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={previousHandler}
                >
                    Previous Page
                </Button>
            )}{" "}
            {!isLastPage && (
                <Button
                    component={Link}
                    to={`/shows/page/${pageCount + 1}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={nextHandler}
                >
                    Next Page
                </Button>
            )}
        </>
    );
};

export default Pagination;
