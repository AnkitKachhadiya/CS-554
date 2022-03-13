import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";

const PUBLIC_KEY = "875175d4d2e7d46ee03a11521673f4f8";
const PRIVATE_KEY = "568731aae996814b06edf9552e264a8b8f8df3cd";

const timestamp = new Date().getTime();

const stringToBeHashed = timestamp + PRIVATE_KEY + PUBLIC_KEY;

const hash = md5(stringToBeHashed);

const BASE_URL = "https://gateway.marvel.com:443/v1/public";

function useAxios(listingType) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        try {
            const API_URL = `${BASE_URL}/${listingType}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=36`;
            const { data } = await axios.get(API_URL);
            setResponse(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { response, error, isLoading };
}

export default useAxios;
