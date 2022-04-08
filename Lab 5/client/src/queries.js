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

export const GET_MY_POSTS = gql`
    query UserPostedImages {
        userPostedImages {
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
    mutation UpdateImage(
        $id: ID!
        $url: String
        $posterName: String
        $description: String
        $userPosted: Boolean
        $binned: Boolean
    ) {
        updateImage(
            id: $id
            url: $url
            posterName: $posterName
            description: $description
            userPosted: $userPosted
            binned: $binned
        ) {
            id
        }
    }
`;
