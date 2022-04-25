const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

async function getPokemonPage(offset) {
    const cacheData = await redisClient.get(`offsetPage-${offset}`);

    return cacheData ? JSON.parse(cacheData) : null;
}

async function setPokemonPage(data, offset) {
    await redisClient.set(`offsetPage-${offset}`, JSON.stringify(data));
}

module.exports = { setPokemonPage, getPokemonPage };
