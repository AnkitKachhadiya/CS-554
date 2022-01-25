const { ObjectId } = require("mongodb");
const common = require("./common");

const ErrorCode = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

function isIdValid(id, variableName) {
    common.isArgumentString(id, variableName);
    common.isStringEmpty(id, variableName);

    return id.trim();
}

function isObjectIdValid(objectId) {
    common.isObjectIdValid(objectId);

    return ObjectId(id);
}

function isTitleValid(_title) {}

function isCommentValid(_comment) {}

function isNameValid(_name) {
    common.isArgumentString(_name, "name");
    common.isStringEmpty(_name, "name");

    const name = _name.trim();

    common.isStringAlphaSpace(name, "Name");

    return name;
}

function isUserNameValid(userName) {
    common.isArgumentString(userName, "username");
    common.isStringEmpty(userName, "username");

    const minimumUserNameLength = 4;

    common.isStringLengthValid(userName, minimumUserNameLength, "Username");
    common.isStringAlphaNumeric(userName, "Username");

    return userName;
}

function isPasswordValid(password) {
    common.isArgumentString(password, "password");
    common.isStringEmpty(password, "password");
    common.isNonSpaceString(password, "Password");

    const minimumPasswordLength = 6;

    common.isStringLengthValid(password, minimumPasswordLength, "Password");

    return password;
}

module.exports = {
    isIdValid,
    isObjectIdValid,
    isTitleValid,
    isNameValid,
    isCommentValid,
    isUserNameValid,
    isPasswordValid,
};
