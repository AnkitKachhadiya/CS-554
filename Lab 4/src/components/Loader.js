import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ title }) {
    return (
        <>
            <h1 className="text-center mt-5 mb-5">{title}</h1>
            <div className="text-center mt-5">
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>
    );
}

export default Loader;
