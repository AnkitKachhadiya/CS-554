const peopleJson = require("./people.json");
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

async function getById(_id) {
    try {
        //5 seconds or 5000 milliseconds
        const WAIT_TIME = 5000;

        await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

        const id = validator.isIdValid(xss(_id), "id");

        for (const currentPerson of peopleJson) {
            if (currentPerson.id === id) {
                return currentPerson;
            }
        }

        throwError(
            ErrorCode.NOT_FOUND,
            "Error: Person not found with provided id."
        );
    } catch (error) {
        throwCatchError(error);
    }
}

const throwError = (code = 500, message = "Error: Internal Server Error") => {
    throw { code, message };
};

const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Error: Internal server error."
    );
};

module.exports = {
    getById,
};
