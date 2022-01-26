const { ObjectId } = require("mongodb");
const common = require("./common");

function isIdValid(id, variableName) {
    common.isArgumentString(id, variableName);
    common.isStringEmpty(id, variableName);

    return id.trim();
}

function isObjectIdValid(objectId) {
    common.isObjectIdValid(objectId);

    return ObjectId(objectId);
}

function isTitleValid(title) {
    common.isArgumentString(title, "title");
    common.isStringEmpty(title, "title");

    return title.trim();
}

function isBodyValid(body) {
    common.isArgumentString(body, "body");
    common.isStringEmpty(body, "body");

    return body.trim();
}

function isCommentValid(_comment) {}

function isNameValid(_name) {
    common.isArgumentString(_name, "name");
    common.isStringEmpty(_name, "name");

    const name = _name.trim();

    common.isStringAlphaSpace(name, "Name");

    return name;
}

function isUsernameValid(username) {
    common.isArgumentString(username, "username");
    common.isStringEmpty(username, "username");

    const MINIMUM_USERNAME_LENGTH = 4;

    common.isStringLengthValid(username, MINIMUM_USERNAME_LENGTH, "Username");
    common.isStringAlphaNumeric(username, "Username");

    return username;
}

function isPasswordValid(password) {
    common.isArgumentString(password, "password");
    common.isStringEmpty(password, "password");
    common.isNonSpaceString(password, "Password");

    const MINIMUM_PASSWORD_LENGTH = 6;

    common.isStringLengthValid(password, MINIMUM_PASSWORD_LENGTH, "Password");

    return password;
}

function isSignUpTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 3;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isUserCreateTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 3;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isLoginTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 2;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isCheckUserTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 2;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isPostBlogTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 2;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isBlogCreateTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 4;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isBlogGetTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 1;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isPutBlogTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 2;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function isBlogUpdateTotalFieldsValid(totalFields) {
    const TOTAL_MANDATORY_FIELDS = 3;

    common.isTotalFieldsValid(totalFields, TOTAL_MANDATORY_FIELDS);
}

function restrictRequestQuery(total) {
    common.isRequestQueryPresent(total);
}

function restrictRequestBody(total) {
    common.isRequestBodyPresent(total);
}

module.exports = {
    isIdValid,
    isObjectIdValid,
    isTitleValid,
    isBodyValid,
    isNameValid,
    isCommentValid,
    isUsernameValid,
    isPasswordValid,
    isSignUpTotalFieldsValid,
    isUserCreateTotalFieldsValid,
    isLoginTotalFieldsValid,
    isCheckUserTotalFieldsValid,
    isPostBlogTotalFieldsValid,
    isBlogCreateTotalFieldsValid,
    isBlogGetTotalFieldsValid,
    isPutBlogTotalFieldsValid,
    isBlogUpdateTotalFieldsValid,
    restrictRequestQuery,
    restrictRequestBody,
};
