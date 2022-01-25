const { ObjectId } = require("mongodb");

const ErrorCode = require("./error-code");

function isObjectIdValid(id) {
    if (!ObjectId.isValid(id)) {
        throwError(ErrorCode.BAD_REQUEST, "Error: id is not a valid ObjectId.");
    }
}

function isArgumentString(string, variableName) {
    if (typeof string !== "string") {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid argument passed for ${
                variableName || "provided variable"
            }. Expected string.`
        );
    }
}

function isStringEmpty(string) {
    if (!string.trim() || string.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || "provided variable"
            }.`
        );
    }
}

function isStringAlphaSpace(string, variableName) {
    //should match alphabetical characters and spaces
    const alphaSpaceRegex = /[^a-zA-Z ]/;

    if (alphaSpaceRegex.test(string)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} should have only alphabetical characters and/or spaces.`
        );
    }
}

function isStringLengthValid(string, requiredLength, variableName) {
    if (string.trim().length < requiredLength) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} should be of at least ${requiredLength} characters long.`
        );
    }
}

function isStringAlphaNumeric(string, variableName) {
    //should match alphanumeric characters
    const alphaNumericRegex = /[^a-zA-Z0-9]/;

    if (alphaNumericRegex.test(string)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} should have only alphanumeric characters.`
        );
    }
}

function isNonSpaceString(string, variableName) {
    //should match alphanumeric characters, special characters and no spaces
    const nonSpaceRegex = /[^\S]/;

    if (nonSpaceRegex.test(string)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} should have only alphanumeric or special characters and no spaces.`
        );
    }
}

const throwError = (code = 500, message = "Internal Server Error") => {
    throw { code, message };
};

module.exports = {
    isObjectIdValid,
    isArgumentString,
    isStringEmpty,
    isStringAlphaSpace,
    isStringAlphaNumeric,
    isNonSpaceString,
    isStringLengthValid,
};
