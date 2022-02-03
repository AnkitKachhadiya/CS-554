const common = require("./common");

function isIdValid(_id, variableName) {
    common.isStringValidInteger(_id, variableName);

    const id = parseInt(_id, 10);

    common.isNumberPositive(id, variableName);

    return id;
}

module.exports = {
    isIdValid,
};
