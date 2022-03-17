import React from "react";
import SingleCard from "./SingleCard";
import { Row, Col } from "react-bootstrap";

function AllCards({ data, listingType }) {
    const [imageType, titleKey] = getImageTypeAndTitleKey(listingType);

    function getImageTypeAndTitleKey(listingType) {
        switch (listingType) {
            case "characters":
                return ["portrait_uncanny", "name"];
            case "comics":
                return ["portrait_uncanny", "title"];
            case "series":
                return ["standard_incredible", "title"];
            default:
                return [null, null];
        }
    }

    return (
        <Row xs={1} md={6}>
            {data.map((currentElement) => {
                return (
                    <Col key={currentElement.id} className="mb-4">
                        <SingleCard
                            listingType={listingType}
                            id={currentElement.id}
                            url={`${currentElement.thumbnail.path}/${imageType}.${currentElement.thumbnail.extension}`}
                            fallbackUrl={`${currentElement.thumbnail.path}.${currentElement.thumbnail.extension}`}
                            title={currentElement[titleKey]}
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

export default AllCards;
