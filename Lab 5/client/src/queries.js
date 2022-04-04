import { gql } from "@apollo/client";

export const GET_UNSPLASH_IMAGES = gql`
    query {
        unsplashImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;
