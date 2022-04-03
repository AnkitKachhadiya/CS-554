const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

async function getBinnedImages() {
    const binnedImages = await redisClient.get("binnedImages");

    return binnedImages;
}

async function getUserPostedImages() {
    const postedImages = await redisClient.get("postedImages");

    return postedImages;
}

module.exports = {
    getBinnedImages,
    getUserPostedImages,
};
