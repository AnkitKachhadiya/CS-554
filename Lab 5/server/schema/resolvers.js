const { getUnsplashImages } = require("../data/api");
const {
    getUserPostedImages,
    getBinnedImages,
    updateImage,
    isImagePostBinned,
    deletePostedImage,
    uploadImagePost,
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
    },
    ImagePost: {
        binned: async (parentValue) => {
            return await isImagePostBinned(parentValue.id);
        },
    },
    Mutation: {
        updateImage: async (_, { input }) => {
            await updateImage(input);
            return input;
        },
        deleteImage: async (_, { id }) => {
            await deletePostedImage(id);
            return null;
        },
        uploadImage: async (_, { input }) => {
            return await uploadImagePost(input);
        },
    },
};

module.exports = { resolvers };
