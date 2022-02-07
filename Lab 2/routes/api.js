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
        const history = await redisClient.lRange("history", 0, 19);

        if (history.length < 1 || !history.length || !history) {
            return response.status(SUCCESS_CODE).json([]);
        }

        const accessHistoryPeople = await redisClient.mGet(history);

        const first20People = accessHistoryPeople.map((person) =>
            JSON.parse(person)
        );

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

        const personUniqueKey = `person.id.${id}`;

        const cachedPerson = await redisClient.get(personUniqueKey);

        if (cachedPerson !== null) {
            const jsonCachedPerson = JSON.parse(cachedPerson);

            await addToAccessHistory(personUniqueKey);

            return response.status(SUCCESS_CODE).json(jsonCachedPerson);
        }

        const person = await peopleData.getById(id);

        await redisClient.set(personUniqueKey, JSON.stringify(person));

        await addToAccessHistory(personUniqueKey);

        return response.status(SUCCESS_CODE).json(person);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

async function addToAccessHistory(personUniqueKey) {
    try {
        await redisClient.lPush("history", personUniqueKey);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
}

module.exports = router;
