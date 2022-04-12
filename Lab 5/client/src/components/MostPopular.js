import { useQuery } from "@apollo/client";
import { GET_POPULAR_IMAGES } from "../queries";
import { Loader } from "./styles/Loader.styled";
import Cards from "./Cards";
import { useState } from "react";

function MostPopular() {
    const [mainstreamTotal, setMainstreamTotal] = useState(0);
    const { data, loading } = useQuery(GET_POPULAR_IMAGES, {
        onCompleted: (popularImages) => {
            let total = 0;

            popularImages.getTopTenBinnedPosts.map(
                (currentImage) => (total += currentImage.numBinned)
            );

            setMainstreamTotal(total);
        },
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
                    <>
                        <p className="text-center">
                            {mainstreamTotal >= 200
                                ? "Mainstream"
                                : "Non-mainstream"}
                        </p>
                        <Cards data={data.getTopTenBinnedPosts} mostPopular />
                    </>
                ) : (
                    <p className="text-center">No Popular Images Found.</p>
                )}
            </>
        );
    }
}

export default MostPopular;
