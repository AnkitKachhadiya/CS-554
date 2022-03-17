import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function Search({ searchButtonHandler, searchTerm }) {
    const [searchInput, setSearchInput] = useState(searchTerm);

    return (
        <InputGroup className="mb-3 marvel-input-group">
            <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-button"
                onChange={(event) => {
                    setSearchInput(event.target.value);
                }}
                value={searchInput}
                className="marvel-form-control"
            />
            <Button
                id="search-button"
                onClick={() => searchButtonHandler(searchInput)}
                className="btn-marvel"
            >
                SEARCH
            </Button>
        </InputGroup>
    );
}

export default Search;
