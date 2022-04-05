const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

async function getBinnedImages() {
    const binnedImages = await redisClient.get("binnedImages");

    return binnedImages ? JSON.parse(binnedImages) : null;
}

async function getUserPostedImages() {
    const postedImages = await redisClient.get("postedImages");

    return postedImages;
}

async function isImagePostBinned(id) {
    const binnedImages = await getBinnedImages();

    if (binnedImages === null || binnedImages.length < 1) {
        return false;
    }

    for (const currentImage of binnedImages) {
        if (currentImage.id === id) {
            return true;
        }
    }

    return false;
}

async function updateImage(image) {
    image.binned ? addImageToBin(image) : removeImageFromBin(image.id);
}

async function addImageToBin(image) {
    const binnedImages = await getBinnedImages();

    if (binnedImages === null) {
        await redisClient.set("binnedImages", JSON.stringify([image]));
    } else {
        binnedImages.unshift(image);

        await redisClient.set("binnedImages", JSON.stringify(binnedImages));
    }
}

async function removeImageFromBin(id) {
    const binnedImages = await getBinnedImages();

    if (binnedImages === null || binnedImages.length < 1) {
        return;
    }

    const filteredBinnedImages = binnedImages.filter(
        (currentImage) => currentImage.id !== id
    );

    if (filteredBinnedImages.length > 0) {
        await redisClient.set(
            "binnedImages",
            JSON.stringify(filteredBinnedImages)
        );

        return;
    }

    await redisClient.del("binnedImages");
}

module.exports = {
    getBinnedImages,
    getUserPostedImages,
    updateImage,
    isImagePostBinned,
};
