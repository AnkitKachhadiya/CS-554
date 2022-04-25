import { useQuery } from "@apollo/client";
import { GET_POKEMON_LIST } from "../queries";
import { useState } from "react";
import Loader from "./Loader";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import AllCards from "./AllCards";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "./PaginationComponent";

const TOTAL_ITEMS_PER_PAGE = 36;

function Pokemon() {
    const navigate = useNavigate();
    const { pageNum } = useParams();

    const [currentPage, setCurrentPage] = useState(parseInt(pageNum));
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);

    const offset = pageNum * TOTAL_ITEMS_PER_PAGE;
    const { data, error, loading, refetch } = useQuery(GET_POKEMON_LIST, {
        variables: { offset: offset },
        onCompleted: () => {
            setCurrentPage(parseInt(pageNum));
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    function changeHandler(event, pageNumber) {
        changeNavigationPage(pageNumber - 1);
    }

    function changeNavigationPage(pageNumber) {
        setCurrentPage(pageNumber);
        const path = `/pokemon/page/${pageNumber}`;
        navigate(path);
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-center mt-5">{error.message}</p>;
    }

    const isResponseAvailable =
        data &&
        data.pokemons &&
        data.pokemons.result &&
        data.pokemons.result.length > 0
            ? true
            : false;

    const totalItems = isResponseAvailable ? data.pokemons.count : 0;

    const totalPages = Math.ceil(totalItems / TOTAL_ITEMS_PER_PAGE);

    return (
        <>
            <h1 className="text-center mt-5 mb-5">Pokédex</h1>

            <Container fluid className="px-5">
                <InputGroup className="mb-3 mt-3 pokemon-input-group">
                    <FormControl
                        placeholder="Search pokémon"
                        aria-label="Search"
                        aria-describedby="search-button"
                        className="pokemon-form-control"
                        onChange={(event) =>
                            setSearchInput(event.target.value.trim())
                        }
                        value={searchInput}
                    />
                    <Button
                        id="submit-button"
                        type="button"
                        onClick={() => {
                            setIsSearchOn(searchInput.length > 0);
                            refetch({
                                offset: offset,
                                query: searchInput,
                            });
                        }}
                    >
                        Search
                    </Button>
                </InputGroup>

                {isResponseAvailable && (
                    <>
                        {!isSearchOn && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage + 1}
                                changeHandler={changeHandler}
                            />
                        )}
                        <AllCards data={data.pokemons.result} />

                        {!isSearchOn && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage + 1}
                                changeHandler={changeHandler}
                            />
                        )}
                    </>
                )}

                {!isResponseAvailable && (
                    <div className="text-center mt-5">
                        <h2>
                            Status Code: 404 <br />
                            Error Message: Data not found
                        </h2>
                    </div>
                )}
            </Container>
        </>
    );
}

export default Pokemon;
