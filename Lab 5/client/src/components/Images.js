import { useQuery } from "@apollo/client";
import { GET_UNSPLASH_IMAGES } from "../queries";
import { Loader } from "./styles/Loader.styled";
import Cards from "./Cards";

function Images() {
    const { data, loading, error } = useQuery(GET_UNSPLASH_IMAGES);

    if (loading) {
        return <Loader />;
    }

    if (data) {
        return (
            <>
                {data &&
                    data.unsplashImages &&
                    data.unsplashImages.length > 0 && (
                        <Cards data={data.unsplashImages} />
                    )}
            </>
        );
    }
}

export default Images;
