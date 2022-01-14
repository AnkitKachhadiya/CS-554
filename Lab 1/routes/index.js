const tasksRoutes = require("./tasks");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/api/tasks", tasksRoutes);
    app.use("/api/comments", commentsRoutes);

    //for accessing unknown routes
    app.use("*", (request, response) => {
        response.status(404).json({ serverResponse: "Not found." });
    });

    //for invalid URI
    app.use(function (error, request, response, next) {
        response
            .status(error.statusCode)
            .json({ serverResponse: "Bad Request." });
    });
};

module.exports = constructorMethod;
