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

export const GET_BINNED_IMAGES = gql`
    query BinnedImages {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

export const UPDATE_IMAGE = gql`
    mutation UpdateImage($input: UpdateImageInput!) {
        updateImage(input: $input) {
            id
        }
    }
`;
