import { useQuery } from "@apollo/client";
import { GET_POPULAR_IMAGES } from "../queries";
import { Loader } from "./styles/Loader.styled";
import Cards from "./Cards";

function MostPopular() {
    const { data, loading } = useQuery(GET_POPULAR_IMAGES, {
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    if (loading) {
        return <Loader />;
    }

    if (data) {
        return (
            <>
                {data &&
                data.getTopTenBinnedPosts &&
                data.getTopTenBinnedPosts.length > 0 ? (
                    <Cards data={data.getTopTenBinnedPosts} mostPopular />
                ) : (
                    <p className="text-center">No Popular Images Found.</p>
                )}
            </>
        );
    }
}

export default MostPopular;
