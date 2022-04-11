import { useMutation, useQuery } from "@apollo/client";
import { GET_BINNED_IMAGES, UPDATE_IMAGE } from "../queries";
import { Loader } from "./styles/Loader.styled";
import Cards from "./Cards";
import { useState } from "react";

function MyBin() {
    const [myBinnedImages, setMyBinnedImages] = useState([]);
    const { data, loading, refetch } = useQuery(GET_BINNED_IMAGES, {
        onCompleted: (data) => {
            data.binnedImages
                ? setMyBinnedImages(data.binnedImages)
                : setMyBinnedImages([]);
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    const [updateImage] = useMutation(UPDATE_IMAGE, { onCompleted: refetch });

    if (loading) {
        return <Loader />;
    }

    function handleAddToBin(id) {
        updateBinnedStatus(id, true);
    }

    function handleRemoveFromBin(id) {
        updateBinnedStatus(id, false);
    }

    function updateBinnedStatus(id, binStatus) {
        const image = myBinnedImages.find((currentImage) => {
            return currentImage.id === id;
        });

        updateImage({
            variables: {
                id: image.id,
                url: image.url,
                posterName: image.posterName,
                description: image.description,
                userPosted: image.userPosted,
                binned: binStatus,
                numBinned: image.numBinned,
            },
        });
    }

    if (data) {
        return (
            <>
                {myBinnedImages && myBinnedImages.length > 0 ? (
                    <Cards
                        data={myBinnedImages}
                        handleAddToBin={handleAddToBin}
                        handleRemoveFromBin={handleRemoveFromBin}
                    />
                ) : (
                    <p className="text-center">No Binned Images Found.</p>
                )}
            </>
        );
    }
}

export default MyBin;
