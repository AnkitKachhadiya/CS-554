import { useMutation, useQuery } from "@apollo/client";
import { GET_UNSPLASH_IMAGES, UPDATE_IMAGE } from "../queries";
import { Loader } from "./styles/Loader.styled";
import { StyledButton, LoadMoreContainer } from "./styles/Card.styled";
import { useTheme } from "styled-components";
import Cards from "./Cards";
import { useState } from "react";

function Images() {
    const theme = useTheme();
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [myImages, setMyImages] = useState([]);
    const { loading } = useQuery(GET_UNSPLASH_IMAGES, {
        variables: { pageNum: currentPageNumber },
        onCompleted: (data) => {
            data.unsplashImages
                ? setMyImages(data.unsplashImages)
                : setMyImages([]);
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });
    const [updateImage] = useMutation(UPDATE_IMAGE);

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
        const image = myImages.find((currentImage) => {
            return currentImage.id === id;
        });

        image.binned = binStatus;

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

    if (myImages) {
        return (
            <>
                {myImages && myImages.length > 0 ? (
                    <>
                        <Cards
                            data={myImages}
                            handleAddToBin={handleAddToBin}
                            handleRemoveFromBin={handleRemoveFromBin}
                        />
                        <LoadMoreContainer>
                            {currentPageNumber > 1 && (
                                <StyledButton
                                    bg={theme.colors.primary}
                                    onClick={() =>
                                        setCurrentPageNumber(
                                            currentPageNumber - 1
                                        )
                                    }
                                >
                                    Previous Page
                                </StyledButton>
                            )}
                            <StyledButton
                                bg={theme.colors.primary}
                                onClick={() =>
                                    setCurrentPageNumber(currentPageNumber + 1)
                                }
                            >
                                Get More Images
                            </StyledButton>
                        </LoadMoreContainer>
                    </>
                ) : (
                    <p className="text-center">Images Not Found.</p>
                )}
            </>
        );
    }
}

export default Images;
