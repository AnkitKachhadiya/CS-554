import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";

const PUBLIC_KEY = "PUBLIC_KEY";
const PRIVATE_KEY = "PRIVATE_KEY";

const timestamp = new Date().getTime();

const stringToBeHashed = timestamp + PRIVATE_KEY + PUBLIC_KEY;

const hash = md5(stringToBeHashed);

const BASE_URL = "https://gateway.marvel.com:443/v1/public";

function useAxiosList(listingType, limit, _searchTerm = "", offset = 0) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData(listingType, limit, _searchTerm, offset) {
            setIsLoading(true);

            try {
                let searchParameter = "";

                const searchTerm = _searchTerm.trim();

                if (searchTerm.length > 0 && searchTerm) {
                    searchParameter = `${getSearchByTitle()}=${searchTerm}&`;
                }

                let urlParameters = `${searchParameter}ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`;

                const API_URL = `${BASE_URL}/${listingType}?${urlParameters}`;
                const { data } = await axios.get(API_URL);
                setResponse(data);
                setError(null);
            } catch (error) {
                setError(error.toJSON());
                setResponse(null);
            } finally {
                setIsLoading(false);
            }
        }

        function getSearchByTitle() {
            switch (listingType) {
                case "characters":
                    return "nameStartsWith";
                case "comics":
                    return "titleStartsWith";
                case "series":
                    return "titleStartsWith";
                default:
                    return "nameStartsWith";
            }
        }

        if (!isNumberValid(offset)) {
            setError({ status: 400, message: "Invalid page number." });
            setResponse(null);
            setIsLoading(false);
            return { response, error, isLoading };
        }

        fetchData(listingType, limit, _searchTerm, offset);
    }, [listingType, limit, _searchTerm, offset]);

    return { response, error, isLoading };
}

function isNumberValid(_number) {
    const number = Number(_number);

    return isNaN(number) || number < 0 ? false : true;
}

function useAxiosSingle(listingType, id) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData(listingType, id) {
            setIsLoading(true);

            try {
                let urlParameters = `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;

                const API_URL = `${BASE_URL}/${listingType}/${id}?${urlParameters}`;
                const { data } = await axios.get(API_URL);
                setResponse(data);
                setError(null);
            } catch (error) {
                setError(error.toJSON());
                setResponse(null);
            } finally {
                setIsLoading(false);
            }
        }

        if (!isNumberValid(id)) {
            setError({ status: 400, message: "Invalid id." });
            setResponse(null);
            setIsLoading(false);
            return { response, error, isLoading };
        }

        fetchData(listingType, id);
    }, [listingType, id]);

    return { response, error, isLoading };
}

export { useAxiosList, useAxiosSingle };
