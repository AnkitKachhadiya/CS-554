const express = require("express");
const router = express.Router();
const xss = require("xss");
const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

const data = require("../data");
const peopleData = data.people;

router.get("/people/history", async (request, response) => {
    console.log("history");
});

router.get("/people/:id", async (request, response) => {
    await redisClient.set("demoKey", "demoValue");
    const value = await redisClient.get("demoKey");

    console.log(value);
});

module.exports = router;
