const ErrorCode = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

function isIdValid(_id, variableName) {}

function isTitleValid(_title) {}

function isCommentValid(_comment) {}

function isNameValid(_name) {}

function isUserNameValid(_userName) {}

function isPasswordValid(_password) {}

module.exports = {
    isIdValid,
    isTitleValid,
    isNameValid,
    isCommentValid,
    isUserNameValid,
    isPasswordValid,
};
