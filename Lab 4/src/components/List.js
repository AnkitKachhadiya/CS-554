import React from "react";
import { Link } from "react-router-dom";

function List({ data, listingType }) {
    return (
        <div>
            <ul className="list-unstyled">
                {data.map((currentElement, currentIndex) => (
                    <li key={currentIndex}>
                        <Link
                            className="marvel-link"
                            to={`/${listingType}/${currentElement.resourceURI
                                .split("/")
                                .pop()}`}
                        >
                            {currentElement.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;
