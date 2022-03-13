import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function SingleCard({ listingType, id, title, url }) {
    return (
        <Link to={`/${listingType}/${id}`} className="text-decoration-none">
            <Card>
                <Card.Img variant="top" src={url} alt={title} />
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
