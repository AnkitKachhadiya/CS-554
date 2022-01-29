const express = require("express");
const app = express();
const configRoutes = require("./routes");
const session = require("express-session");
const ErrorCode = require("./helpers/error-code");
const dataValidator = require("./data/validator");

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(function (request, response, next) {
    response.header(
        "Cache-Control",
        "private, no-cache, no-store, must-revalidate"
    );
    response.header("Expires", "-1");
    response.header("Pragma", "no-cache");
    next();
});

app.use(
    session({
        name: "AuthCookie",
        secret: `There !$ /\/0 $ecret f0r /\/\Y $e$$!0/\/`,
        resave: false,
        saveUninitialized: true,
    })
);

//for blogs
app.use((request, response, next) => {
    const requestUrl = request.url;
    const requestMethod = request.method;

    if (requestMethod === "PUT" || requestMethod === "PATCH") {
        if (!request.session.user) {
            response.status(ErrorCode.FORBIDDEN).send({
                serverResponse: "Error: You are not logged in.",
            });
            return;
        }
    }

    //matches signup and/or login keywords
    const ignoreWordsRegex = /signup|login/i;

    if (requestMethod === "POST" && !ignoreWordsRegex.test(requestUrl)) {
        if (!request.session.user) {
            response.status(ErrorCode.FORBIDDEN).send({
                serverResponse: "Error: You are not logged in.",
            });
            return;
        }
    }

    next();
});

app.use("/blog/:id", async (request, response, next) => {
    try {
        const requestMethod = request.method;

        if (requestMethod === "PUT" || requestMethod === "PATCH") {
            const blogId = request.params.id;
            const userId = request.session.user._id;

            await dataValidator.isUserBlogComboValid(userId.toString(), blogId);
        }
    } catch (error) {
        return response
            .status(error.code || ErrorCode.INTERNAL_SERVER_ERROR)
            .send({
                serverResponse:
                    error.message || "Error: Internal server error.",
            });
    }
    next();
});

//for comments
app.use((request, response, next) => {
    const requestUrl = request.url;
    const requestMethod = request.method;

    if (requestMethod === "DELETE") {
        if (!request.session.user) {
            response.status(403).send({
                serverResponse: "Error: You are not logged in.",
            });
            return;
        }
    }

    //matches comments
    const ignoreWordsRegex = /comments/i;

    if (requestMethod === "POST" && ignoreWordsRegex.test(requestUrl)) {
        if (!request.session.user) {
            response.status(ErrorCode.FORBIDDEN).send({
                serverResponse: "Error: You are not logged in.",
            });
            return;
        }
    }

    next();
});

app.use("/blog/:blogId/:commentId", async (request, response, next) => {
    try {
        const requestMethod = request.method;

        if (requestMethod === "DELETE") {
            const blogId = request.params.blogId;
            const commentId = request.params.commentId;
            const userId = request.session.user._id;

            await dataValidator.isUserBlogCommentComboValid(
                userId.toString(),
                blogId,
                commentId
            );
        }
    } catch (error) {
        return response
            .status(error.code || ErrorCode.INTERNAL_SERVER_ERROR)
            .send({
                serverResponse:
                    error.message || "Error: Internal server error.",
            });
    }
    next();
});

configRoutes(app);

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
