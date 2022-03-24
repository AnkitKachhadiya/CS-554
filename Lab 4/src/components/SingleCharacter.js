import React from "react";
import { useAxiosSingle } from "../hooks/useAxios";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "./Loader";
import List from "./List";

function SingleCharacter() {
    const { id } = useParams();
    const { response, error, isLoading } = useAxiosSingle("characters", id);

    if (isLoading) {
        return (
            <>
                <Loader />;
            </>
        );
    }

    const isResponseAvailable =
        response && response.data && response.data.results.length > 0
            ? true
            : false;

    if (error) {
        return (
            <>
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
                        to="/characters/page/0"
                    >
                        Go Back
                    </Link>
                </div>
            </>
        );
    }

    let data = null;

    if (isResponseAvailable) {
        [data] = response.data.results;
    }

    return (
        <>
            <Container fluid className=" marvel-black-background pt-5 pb-4">
                {!isResponseAvailable && (
                    <div className="text-center mt-5">
                        <h2>
                            Status Code: 404 <br />
                            Error Message: Data not found
                        </h2>
                    </div>
                )}
                {data && (
                    <Row>
                        <Col className="text-center">
                            <img
                                src={`${data.thumbnail.path}/detail.${data.thumbnail.extension}`}
                                onError={(event) =>
                                    (event.target.src = `${data.thumbnail.path}.${data.thumbnail.extension}`)
                                }
                                alt={data.name}
                                height="550"
                                width="550"
                            />
                        </Col>
                        <Col>
                            <h1 className="text-white text-uppercase">
                                {data.name}
                            </h1>
                            {data.description && (
                                <p className="text-white">{data.description}</p>
                            )}
                            <Row>
                                {data.comics.items && (
                                    <Col>
                                        <h2 className="text-white">Comics:</h2>
                                        <List
                                            data={data.comics.items}
                                            listingType="comics"
                                        />
                                    </Col>
                                )}

                                {data.series.items && (
                                    <Col>
                                        <h2 className="text-white">Series:</h2>
                                        <List
                                            data={data.series.items}
                                            listingType="series"
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}

export default SingleCharacter;
