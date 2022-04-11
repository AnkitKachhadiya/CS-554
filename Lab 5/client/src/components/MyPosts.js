import { useMutation, useQuery } from "@apollo/client";
import { GET_MY_POSTS, UPDATE_IMAGE, DELETE_IMAGE } from "../queries";
import { Loader } from "./styles/Loader.styled";
import Cards from "./Cards";
import { useTheme } from "styled-components";
import { StyledLink, LoadMoreContainer } from "./styles/Card.styled";
import { useState } from "react";

function MyPosts() {
    const theme = useTheme();
    const [myPostedImages, setMyPostedImages] = useState([]);
    const { data, loading, refetch } = useQuery(GET_MY_POSTS, {
        onCompleted: (data) => {
            data.userPostedImages
                ? setMyPostedImages(data.userPostedImages)
                : setMyPostedImages([]);
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    const [updateImage] = useMutation(UPDATE_IMAGE, { onCompleted: refetch });
    const [deleteImage] = useMutation(DELETE_IMAGE, { onCompleted: refetch });

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
        const image = myPostedImages.find((currentImage) => {
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

    function handleDeletePost(id) {
        deleteImage({
            variables: {
                id: id,
            },
        });
    }

    if (data) {
        return (
            <>
                <LoadMoreContainer>
                    <StyledLink bg={theme.colors.primary} to="/new-post">
                        Upload a Post
                    </StyledLink>
                </LoadMoreContainer>
                {myPostedImages && myPostedImages.length > 0 ? (
                    <Cards
                        data={myPostedImages}
                        handleAddToBin={handleAddToBin}
                        handleRemoveFromBin={handleRemoveFromBin}
                        handleDeletePost={handleDeletePost}
                        showDelete
                    />
                ) : (
                    <p className="text-center">No Uploaded Images Found.</p>
                )}
            </>
        );
    }
}

export default MyPosts;
