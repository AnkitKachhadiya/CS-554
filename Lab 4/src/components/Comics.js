import React from "react";
import useAxios from "../hooks/useAxios";

function Comics() {
    const { response, error, isLoading } = useAxios("comics");

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
                <h1>Comics</h1>
                <p>{error}</p>
                <p>{JSON.stringify(response)}</p>
            </div>
        </>
    );
}

export default Comics;
