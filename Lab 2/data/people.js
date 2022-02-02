const peopleJson = require("./people.json");

async function getById(_id) {
    for (const currentPerson of peopleJson) {
        if (currentPerson.id === parseInt(_id)) {
            return currentPerson;
        }
    }
}

module.exports = {
    getById,
};
