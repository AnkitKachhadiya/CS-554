const mongoColletions = require("../config/mongoCollections");
const tasks = mongoColletions.tasks;
const validator = require("../helpers/validator");

async function getTasks() {}

async function getTaskById(_taskId) {}

async function addTask() {}

async function updateTask() {}

module.exports = {
    getTasks,
    getTaskById,
    addTask,
    updateTask,
};
