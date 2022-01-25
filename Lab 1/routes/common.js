const express = require("express");
const router = express.Router();
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

const data = require("../data");
const commentsData = data.comments;
const usersData = data.users;
const blogsData = data.blogs;

router.get("/", async (request, response) => {
    console.log("Hello19");
    console.log(request.query);
});

router.get("/logout", async (request, response) => {
    try {
        const user = request.session.user;

        if (user) {
            request.session.destroy();
            response.json({ message: "You are logged out." });
        } else {
            throwError(ErrorCode.FORBIDDEN, "Error: You are not logged in.");
        }
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.get("/:id", async (request, response) => {
    console.log("Hello18");
});

router.post("/", async (request, response) => {
    console.log("Hello17");
});

router.put("/:id", async (request, response) => {
    console.log("Hello16");
});

router.patch("/:id", async (request, response) => {
    console.log("Hello15");
});

router.post("/:id/comments", async (request, response) => {
    console.log("Hello14");
});

router.delete("/:blogId/:commentId", async (request, response) => {
    console.log("Hello13");
});

router.post("/signup", async (request, response) => {
    try {
        if (request.session.user) {
            throwError(
                ErrorCode.FORBIDDEN,
                "Error: You are already logged in."
            );
        }

        const requestPostData = request.body;

        validator.isSignUpTotalFieldsValid(Object.keys(requestPostData).length);

        const name = validator.isNameValid(xss(requestPostData.name));
        const username = validator.isUsernameValid(
            xss(requestPostData.username)
        );
        const password = validator.isPasswordValid(
            xss(requestPostData.password)
        );

        const user = await usersData.create(name, username, password);

        if (!user) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal server error"
            );
        }

        response.json(user);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.post("/login", async (request, response) => {
    try {
        if (request.session.user) {
            throwError(
                ErrorCode.FORBIDDEN,
                "Error: You are already logged in."
            );
        }

        const requestPostData = request.body;

        validator.isLoginTotalFieldsValid(Object.keys(requestPostData).length);

        const username = validator.isUsernameValid(
            xss(requestPostData.username)
        );
        const password = validator.isPasswordValid(
            xss(requestPostData.password)
        );

        const user = await usersData.checkUser(username, password);

        if (!user) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal Server Error"
            );
        }

        request.session.user = { _id: user._id, username: user.username };

        response.json(user);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

const throwError = (code = 500, message = "Error: Internal Server Error") => {
    throw { code, message };
};

module.exports = router;
