const ErrorCode = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

function isIdValid(_id, variableName) {}

function isTitleValid(_title) {}

function isDescriptionValid(_description) {}

function isHoursEstimatedValid(_hoursEstimated) {}

function isCompletedValid(_completed) {}

function isNameValid(_name) {}

function isCommentValid(_comment) {}

module.exports = {
    isIdValid,
    isTitleValid,
    isDescriptionValid,
    isHoursEstimatedValid,
    isCompletedValid,
    isNameValid,
    isCommentValid,
};
