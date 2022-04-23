import React from "react";
import SingleCard from "./SingleCard";
import { Row, Col } from "react-bootstrap";

function AllCards({ data }) {
    return (
        <Row xs={1} md={6}>
            {data.map((currentElement) => {
                return (
                    <Col key={currentElement.id} className="mb-4">
                        <SingleCard
                            id={currentElement.id}
                            url={currentElement.imageUrl}
                            title={currentElement.name}
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

export default AllCards;
