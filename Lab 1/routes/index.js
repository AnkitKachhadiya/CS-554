const blogsRoutes = require("./blogs");
const commentsRoutes = require("./comments");
const userRoutes = require("./users");

const constructorMethod = (app) => {
    app.use("/blog/signup", userRoutes);
    app.use("/blog/login", userRoutes);
    app.use("/blog/logout", userRoutes);

    app.use("/blog", blogsRoutes);

    app.use("/blog/:id/comments", commentsRoutes);
    app.use("/blog/:blogId/:commentId", commentsRoutes);

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
