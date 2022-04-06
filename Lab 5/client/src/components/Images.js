import { useQuery } from "@apollo/client";
import { GET_UNSPLASH_IMAGES } from "../queries";
import { Loader } from "./styles/Loader.styled";
import { StyledButton, LoadMoreContainer } from "./styles/Card.styled";
import { useTheme } from "styled-components";
import Cards from "./Cards";
import { useEffect, useState } from "react";

function Images() {
    const theme = useTheme();
    const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [myImages, setMyImages] = useState([]);
    const { loading, error } = useQuery(GET_UNSPLASH_IMAGES, {
        variables: { pageNum: currentPageNumber },
        onCompleted: (data) => {
            console.log(data);
            setMyImages(myImages.concat(data.unsplashImages));

            console.log(myImages);
        },
    });

    if (loading) {
        return <Loader />;
    }

    if (myImages) {
        return (
            <>
                {myImages && myImages.length > 0 && <Cards data={myImages} />}
                <LoadMoreContainer>
                    <StyledButton
                        bg={theme.colors.primary}
                        onClick={() =>
                            setCurrentPageNumber(currentPageNumber + 1)
                        }
                    >
                        Load More
                    </StyledButton>
                </LoadMoreContainer>
            </>
        );
    }
}

export default Images;
