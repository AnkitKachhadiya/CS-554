import React from "react";
import useAxios from "../hooks/useAxios";

function SingleCharacter() {
    const { response, error, isLoading } = useAxios("characters");

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
                <h1>Single Character</h1>
                <p>{error}</p>
                <p>{JSON.stringify(response)}</p>
            </div>
        </>
    );
}

export default SingleCharacter;
