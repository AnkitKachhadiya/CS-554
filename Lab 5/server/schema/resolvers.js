const { getUnsplashImages } = require("../data/api");
const { getUserPostedImages, getBinnedImages } = require("../data/redis-db");
const resolvers = {
    Query: {
        unsplashImages: async (_, { pageNum = 0 }) => {
            const unsplashImages = await getUnsplashImages(pageNum);
            return unsplashImages;
        },
        binnedImages: async () => {
            return await getBinnedImages();
        },
        userPostedImages: async () => {
            return await getUserPostedImages();
        },
    },
};

module.exports = { resolvers };
