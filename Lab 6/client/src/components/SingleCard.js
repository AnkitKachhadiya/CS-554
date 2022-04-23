import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function SingleCard({ id, title, url }) {
    return (
        <Link to={`/pokemon/${id}`} className="text-decoration-none">
            <Card>
                <Card.Img
                    variant="top"
                    src={url}
                    alt={title}
                    onError={(event) =>
                        (event.target.src = "/pokemon-not-found.png")
                    }
                    height="215"
                    width="215"
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
