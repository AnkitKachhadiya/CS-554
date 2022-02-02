const express = require("express");
const router = express.Router();

const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

const xss = require("xss");

const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

const data = require("../data");
const peopleData = data.people;

router.get("/people/history", async (request, response) => {
    const history = await redisClient.get("history");

    const accessHistory = history === null ? [] : JSON.parse(history);

    response.json(accessHistory);
});

router.get("/people/:id", async (request, response) => {
    try {
        const person = await peopleData.getById(request.params.id);

        const history = await redisClient.get("history");

        if (history === null) {
            await redisClient.set("history", JSON.stringify([person]));
        } else {
            const jsonHistory = JSON.parse(history);

            jsonHistory.unshift(person);

            await redisClient.set("history", JSON.stringify(jsonHistory));
        }
    } catch (error) {
        console.log(error);
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

const throwError = (code = 500, message = "Error: Internal Server Error") => {
    throw { code, message };
};

module.exports = router;
