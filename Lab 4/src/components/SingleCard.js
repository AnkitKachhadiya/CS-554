import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function SingleCard({ listingType, id, title, url, fallbackUrl }) {
    const [imageWidth, imageHeight] = getImageWidthAndHeight(listingType);

    function getImageWidthAndHeight(listingType) {
        switch (listingType) {
            case "characters":
                return [215, 323];
            case "comics":
                return [215, 323];
            case "series":
                return [215, 215];
            default:
                return [null, null];
        }
    }

    return (
        <Link to={`/${listingType}/${id}`} className="text-decoration-none">
            <Card>
                <Card.Img
                    variant="top"
                    src={url}
                    alt={title}
                    onError={(event) => (event.target.src = fallbackUrl)}
                    width={imageWidth}
                    height={imageHeight}
                />
                <Card.Body>
                    <Card.Title className="text-uppercase text-truncate">
                        {title}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default SingleCard;
