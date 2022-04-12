const { getUnsplashImages } = require("../data/api");
const {
    getUserPostedImages,
    getBinnedImages,
    updateImage,
    isImagePostBinned,
    deletePostedImage,
    uploadImagePost,
    getMostPopularImages,
} = require("../data/redis-db");

const resolvers = {
    Query: {
        unsplashImages: async (_, { pageNum = 0 }) => {
            const unsplashImages = await getUnsplashImages(pageNum);
            return unsplashImages;
        },
        binnedImages: async () => {
            const binnedImages = await getBinnedImages();
            return binnedImages;
        },
        userPostedImages: async () => {
            const postedImages = await getUserPostedImages();
            return postedImages;
        },
        getTopTenBinnedPosts: async () => {
            const mostPopular = await getMostPopularImages();
            return mostPopular;
        },
    },
    ImagePost: {
        binned: async (parentValue) => {
            return await isImagePostBinned(parentValue.id);
        },
    },
    Mutation: {
        updateImage: async (
            _,
            { id, url, posterName, description, userPosted, binned, numBinned }
        ) => {
            await updateImage({
                id,
                url,
                posterName,
                description,
                userPosted,
                binned,
                numBinned,
            });
            return {
                id,
                url,
                posterName,
                description,
                userPosted,
                binned,
                numBinned,
            };
        },
        deleteImage: async (_, { id }) => {
            await deletePostedImage(id);
            return null;
        },
        uploadImage: async (_, { url, description, posterName }) => {
            return await uploadImagePost({ url, description, posterName });
        },
    },
};

module.exports = { resolvers };
