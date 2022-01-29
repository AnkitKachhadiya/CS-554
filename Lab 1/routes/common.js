const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

const data = require("../data");
const usersData = data.users;
const blogsData = data.blogs;

router.get("/", async (request, response) => {
    try {
        const requestQueryData = request.query;

        const DEFAULT_SKIP = 0;
        const skip = requestQueryData.skip
            ? validator.isSkipValid(xss(requestQueryData.skip))
            : DEFAULT_SKIP;

        const DEFAULT_TAKE = 20;
        const take = requestQueryData.take
            ? validator.isTakeValid(xss(requestQueryData.take))
            : DEFAULT_TAKE;

        const blogs = await blogsData.getBlogs(skip, take);

        response.json(blogs);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
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

        const blog = await blogsData.getBlogById(blogId);

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
        console.log(error);
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

        const updatedBlog = await blogsData.update(
            userId.toString(),
            blogId,
            updateBlog
        );

        response.json(updatedBlog);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.patch("/:id", async (request, response) => {
    try {
        validator.restrictRequestQuery(Object.keys(request.query).length);

        if (!request.session.user) {
            throwError(ErrorCode.FORBIDDEN, "Error: You are not logged in.");
        }

        const requestPostData = request.body;

        if (Object.keys(requestPostData).length < 1) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: At least 1 field is required for updation."
            );
        }

        const updateBlog = {};

        if (requestPostData.title) {
            updateBlog.title = validator.isTitleValid(
                xss(requestPostData.title)
            );
        }

        if (requestPostData.body) {
            updateBlog.body = validator.isBodyValid(xss(requestPostData.body));
        }

        if (Object.keys(updateBlog).length < 1) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: At least 1 field is required for updation."
            );
        }

        const blogId = validator.isIdValid(xss(request.params.id), "blog id");

        validator.isObjectIdValid(blogId);

        const userId = request.session.user._id;

        const updatedBlog = await blogsData.update(
            userId.toString(),
            blogId,
            updateBlog
        );

        response.json(updatedBlog);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.post("/:id/comments", async (request, response) => {
    try {
        validator.restrictRequestQuery(Object.keys(request.query).length);

        if (!request.session.user) {
            throwError(ErrorCode.FORBIDDEN, "Error: You are not logged in.");
        }

        const requestPostData = request.body;

        validator.isPostCommentTotalFieldsValid(
            Object.keys(requestPostData).length
        );

        const comment = validator.isCommentValid(xss(requestPostData.comment));
        const blogId = validator.isIdValid(xss(request.params.id), "blog id");

        validator.isObjectIdValid(blogId);

        const userId = request.session.user._id;
        const username = request.session.user.username;

        const updatedBlog = await blogsData.createComment(
            userId.toString(),
            username,
            blogId,
            comment
        );

        response.json(updatedBlog);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
});

router.delete("/:blogId/:commentId", async (request, response) => {
    try {
        validator.restrictRequestQuery(Object.keys(request.query).length);

        if (!request.session.user) {
            throwError(ErrorCode.FORBIDDEN, "Error: You are not logged in.");
        }

        const blogId = validator.isIdValid(
            xss(request.params.blogId),
            "blog id"
        );
        validator.isObjectIdValid(blogId);

        const commentId = validator.isIdValid(
            xss(request.params.commentId),
            "comment id"
        );
        validator.isObjectIdValid(commentId);

        const userId = request.session.user._id;

        const deletedComment = await blogsData.deleteComment(
            userId.toString(),
            blogId,
            commentId
        );

        response.json(deletedComment);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Error: Internal server error.",
        });
    }
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
