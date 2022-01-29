const mongoCollections = require("../config/mongoCollections");
const blogs = mongoCollections.blogs;
const users = mongoCollections.users;
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

async function isUserBlogComboValid(_userId, _blogId) {
    try {
        validator.isUserBlogComboTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");
        const parsedUserObjectId = validator.isObjectIdValid(userId);

        const blogId = validator.isIdValid(xss(_blogId), "blog id");
        const parsedBlogObjectId = validator.isObjectIdValid(blogId);

        await isValidUser(parsedUserObjectId);

        const blog = await blogsCollection.findOne({
            _id: parsedBlogObjectId,
            "userThatPosted._id": parsedUserObjectId,
        });

        if (!blog) {
            throwError(ErrorCode.NOT_FOUND, "Error: Blog not found.");
        }
    } catch (error) {
        throwCatchError(error);
    }
}

async function isUserBlogCommentComboValid(_userId, _blogId, _commentId) {
    try {
        validator.isUserBlogCommentComboTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");
        const parsedUserObjectId = validator.isObjectIdValid(userId);

        const blogId = validator.isIdValid(xss(_blogId), "blog id");

        const commentId = validator.isIdValid(xss(_commentId), "comment id");
        const parsedCommentObjectId = validator.isObjectIdValid(commentId);

        await isValidUser(parsedUserObjectId);

        const blogsCollection = await blogs();

        const commentResult = await blogsCollection.findOne(
            {
                "comments._id": parsedCommentObjectId,
            },
            { projection: { _id: 1, "comments.$": 1 } }
        );

        if (!commentResult) {
            throwError(ErrorCode.NOT_FOUND, "Error: Comment not found.");
        }

        const [comment] = commentResult.comments;

        if (
            commentResult._id.toString() !== blogId ||
            comment._id.toString() !== commentId ||
            comment.userThatPostedComment._id.toString() !== userId
        ) {
            throwError(ErrorCode.NOT_FOUND, "Error: Comment not found.");
        }
    } catch (error) {
        throwCatchError(error);
    }
}

async function isValidUser(userId) {
    try {
        const usersCollection = await users();

        const user = await usersCollection.findOne(
            { _id: userId },
            {
                projection: {
                    _id: {
                        $toString: "$_id",
                    },
                    name: 1,
                    username: 1,
                },
            }
        );

        if (!user) {
            throwError(ErrorCode.NOT_FOUND, "Error: User not found.");
        }

        return user;
    } catch (error) {
        throwCatchError(error);
    }
}

const throwError = (code = 500, message = "Error: Internal Server Error") => {
    throw { code, message };
};

const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Error: Internal server error."
    );
};

module.exports = {
    isUserBlogComboValid,
    isUserBlogCommentComboValid,
};
