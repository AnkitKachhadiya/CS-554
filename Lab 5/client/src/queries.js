import { gql } from "@apollo/client";

export const GET_UNSPLASH_IMAGES = gql`
    query UnsplashImages($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;
