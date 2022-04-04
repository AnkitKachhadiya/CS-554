const { gql } = require("apollo-server");

const typeDefs = gql`
    type ImagePost {
        "Unique identifier for image post"
        id: ID!

        "Image URL"
        url: String!

        "Author of the image post"
        posterName: String!

        "Image description if available"
        description: String

        "Is the post created by user on binterest or its coming from Unsplash API"
        userPosted: Boolean!

        "Has the user binned this image post"
        binned: Boolean!
    }

    type Query {
        "Get images from unsplash API"
        unsplashImages(pageNum: Int): [ImagePost]

        "Get binned images"
        binnedImages: [ImagePost]

        "Get posted images"
        userPostedImages: [ImagePost]
    }
`;

module.exports = { typeDefs };
