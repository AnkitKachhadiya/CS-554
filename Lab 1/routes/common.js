const { ObjectId } = require("mongodb");
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
        validator.restrictRequestQuery(Object.keys(request.query).length);

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
    try {
        validator.restrictRequestQuery(Object.keys(request.query).length);
        validator.restrictRequestBody(Object.keys(request.body).length);

        const blogId = validator.isIdValid(xss(request.params.id), "blog id");

        validator.isObjectIdValid(blogId);

        const blog = await blogsData.get(blogId);

        console.log(blog);
        response.json(blog);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.post("/", async (request, response) => {
    try {
        validator.restrictRequestQuery(Object.keys(request.query).length);

        if (!request.session.user) {
            throwError(ErrorCode.FORBIDDEN, "Error: You are not logged in.");
        }

        const requestPostData = request.body;

        validator.isPostBlogTotalFieldsValid(
            Object.keys(requestPostData).length
        );

        const title = validator.isTitleValid(xss(requestPostData.title));
        const body = validator.isBodyValid(xss(requestPostData.body));

        const userId = request.session.user._id;
        const username = request.session.user.username;

        const blog = await blogsData.create(
            userId.toString(),
            username,
            title,
            body
        );

        if (!blog) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal server error"
            );
        }

        response.json(blog);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.put("/:id", async (request, response) => {
    try {
        validator.restrictRequestQuery(Object.keys(request.query).length);

        if (!request.session.user) {
            throwError(ErrorCode.FORBIDDEN, "Error: You are not logged in.");
        }

        const requestPostData = request.body;

        validator.isPutBlogTotalFieldsValid(
            Object.keys(requestPostData).length
        );

        const updateBlog = {};

        updateBlog.title = validator.isTitleValid(xss(requestPostData.title));
        updateBlog.body = validator.isBodyValid(xss(requestPostData.body));
        const blogId = validator.isIdValid(xss(request.params.id), "blog id");

        validator.isObjectIdValid(blogId);

        const userId = request.session.user._id;

        const updatedBlog = await blogsData.update(userId, blogId, updateBlog);

        response.json(updatedBlog);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
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
        validator.restrictRequestQuery(Object.keys(request.query).length);

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
        validator.restrictRequestQuery(Object.keys(request.query).length);

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

        request.session.user = {
            _id: ObjectId(user._id),
            username: user.username,
        };

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
