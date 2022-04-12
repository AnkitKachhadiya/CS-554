const { v4: uuidv4 } = require("uuid");
const redis = require("redis");
const redisClient = redis.createClient();

const BINNED_IMAGES = "binnedImages";
const POSTED_IMAGES = "postedImages";

(async () => {
    await redisClient.connect();
})();

async function getBinnedImages() {
    const binnedImages = await redisClient.get(BINNED_IMAGES);

    return binnedImages ? JSON.parse(binnedImages) : null;
}

async function getUserPostedImages() {
    const postedImages = await redisClient.get(POSTED_IMAGES);

    return postedImages ? JSON.parse(postedImages) : null;
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
    image.binned
        ? await addImageToBin(image)
        : await removeImageFromBin(image.id);
    image.binned
        ? await addToPopularity(image)
        : await removeFromPopularity(image);
}

async function addImageToBin(image) {
    const binnedImages = await getBinnedImages();

    if (binnedImages === null) {
        await redisClient.set(BINNED_IMAGES, JSON.stringify([image]));
    } else {
        binnedImages.unshift(image);

        await redisClient.set(BINNED_IMAGES, JSON.stringify(binnedImages));
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
            BINNED_IMAGES,
            JSON.stringify(filteredBinnedImages)
        );

        return;
    }

    await redisClient.del(BINNED_IMAGES);
}

async function deletePostedImage(id) {
    const postedImages = await getUserPostedImages();

    if (postedImages === null || postedImages.length < 1) {
        return;
    }

    const filteredPostedImages = postedImages.filter(
        (currentImage) => currentImage.id !== id
    );

    const removingImage = postedImages.find(
        (currentImage) => currentImage.id === id
    );

    if (removingImage) {
        const remove = new Map();
        remove.set("id", removingImage.id);
        remove.set("url", removingImage.url);
        remove.set("posterName", removingImage.posterName);
        remove.set("description", removingImage.description);
        remove.set("userPosted", removingImage.userPosted);
        remove.set("binned", removingImage.binned);
        remove.set("numBinned", removingImage.numBinned);
        const removeObj = Object.fromEntries(remove);
        await removeFromPopularity(removeObj);
    }

    if (filteredPostedImages.length > 0) {
        await redisClient.set(
            POSTED_IMAGES,
            JSON.stringify(filteredPostedImages)
        );

        return;
    }

    await removeImageFromBin(id);

    await redisClient.del(POSTED_IMAGES);
}

async function uploadImagePost(image) {
    const postedImages = await getUserPostedImages();

    image["id"] = uuidv4();
    image["userPosted"] = true;
    image["binned"] = false;
    image["numBinned"] = 0;

    if (postedImages === null) {
        await redisClient.set(POSTED_IMAGES, JSON.stringify([image]));
    } else {
        postedImages.unshift(image);

        await redisClient.set(POSTED_IMAGES, JSON.stringify(postedImages));
    }

    return image;
}

async function getMostPopularImages() {
    const images = await redisClient.zRange("mostPopular", 0, -1, {
        REV: true,
    });

    if (images.length < 1) {
        return [];
    }

    const result = [];

    images.map((currentImage) => result.push(JSON.parse(currentImage)));

    return result;
}

async function removeFromPopularity(image) {
    image.binned = !image.binned;

    await redisClient.zRem("mostPopular", JSON.stringify(image));
}

async function addToPopularity(image) {
    await redisClient.zAdd("mostPopular", {
        score: image.numBinned,
        value: JSON.stringify(image),
    });
}

module.exports = {
    getBinnedImages,
    getUserPostedImages,
    updateImage,
    isImagePostBinned,
    deletePostedImage,
    uploadImagePost,
    getMostPopularImages,
};
