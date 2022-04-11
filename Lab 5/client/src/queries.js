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
            numBinned
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
            numBinned
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
            numBinned
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
        $numBinned: Int
    ) {
        updateImage(
            id: $id
            url: $url
            posterName: $posterName
            description: $description
            userPosted: $userPosted
            binned: $binned
            numBinned: $numBinned
        ) {
            id
        }
    }
`;

export const UPLOAD_IMAGE = gql`
    mutation UploadImage(
        $url: String!
        $description: String
        $posterName: String
    ) {
        uploadImage(
            url: $url
            description: $description
            posterName: $posterName
        ) {
            id
        }
    }
`;

export const DELETE_IMAGE = gql`
    mutation DeleteImage($id: ID!) {
        deleteImage(id: $id) {
            id
        }
    }
`;

export const GET_POPULAR_IMAGES = gql`
    query GetTopTenBinnedPosts {
        getTopTenBinnedPosts {
            id
            url
            posterName
            description
            userPosted
            binned
            numBinned
        }
    }
`;
