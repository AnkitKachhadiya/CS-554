const mongoCollections = require("../config/mongoCollections");
const blogs = mongoCollections.blogs;
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
