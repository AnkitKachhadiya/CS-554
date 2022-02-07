const express = require("express");
const router = express.Router();

const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

const xss = require("xss");

const data = require("../data");
const peopleData = data.people;

const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

const SUCCESS_CODE = 200;

router.get("/people/history", async (request, response) => {
    try {
        const history = await redisClient.get("history");

        const accessHistory = history === null ? [] : JSON.parse(history);

        const first20People = accessHistory.slice(0, 20);

        response.status(SUCCESS_CODE).json(first20People);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.get("/people/:id", async (request, response) => {
    try {
        const id = validator.isIdValid(xss(request.params.id), "id");

        const cachedPerson = await redisClient.get(`person.id.${id}`);

        if (cachedPerson !== null) {
            const jsonCachedPerson = JSON.parse(cachedPerson);

            await addToAccessHistory(jsonCachedPerson);

            return response.status(SUCCESS_CODE).json(jsonCachedPerson);
        }

        const person = await peopleData.getById(id);

        await redisClient.set(`person.id.${person.id}`, JSON.stringify(person));

        await addToAccessHistory(person);

        return response.status(SUCCESS_CODE).json(person);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

async function addToAccessHistory(person) {
    try {
        const history = await redisClient.get("history");

        if (history === null) {
            await redisClient.set("history", JSON.stringify([person]));
        } else {
            const jsonHistory = JSON.parse(history);

            jsonHistory.unshift(person);

            await redisClient.set("history", JSON.stringify(jsonHistory));
        }
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
}

module.exports = router;
