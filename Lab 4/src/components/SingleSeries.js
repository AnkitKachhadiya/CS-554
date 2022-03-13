import React from "react";
import useAxios from "../hooks/useAxios";

function SingleSeries() {
    const { response, error, isLoading } = useAxios("series");

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
                <h1>Single Series</h1>
                <p>{error}</p>
                <p>{JSON.stringify(response)}</p>
            </div>
        </>
    );
}

export default SingleSeries;
