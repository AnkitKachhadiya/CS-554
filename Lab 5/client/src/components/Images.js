import { useQuery } from "@apollo/client";
import { GET_UNSPLASH_IMAGES } from "../queries";

function Images() {
    const { data, loading, error } = useQuery(GET_UNSPLASH_IMAGES);

    if (data) {
        console.log(data);
    }

    return <h1>Images</h1>;
}

export default Images;
