const mongoCollections = require("../config/mongoCollections");
const blogs = mongoCollections.blogs;
const users = mongoCollections.users;
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");
const { ObjectId } = require("mongodb");

async function create(_userId, _username, _title, _body) {
    try {
        validator.isBlogCreateTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");

        const parsedObjectId = validator.isObjectIdValid(userId);
        const username = validator.isUsernameValid(xss(_username));
        const title = validator.isTitleValid(xss(_title));
        const body = validator.isBodyValid(xss(_body));

        const user = await isValidUser(parsedObjectId);

        if (user.username !== username) {
            throwError(ErrorCode.NOT_FOUND, "Error: User not found.");
        }

        const blogsCollection = await blogs();

        const newBlog = {
            title: title,
            body: body,
            userThatPosted: {
                _id: parsedObjectId,
                username: username,
            },
            comments: [],
        };

        const insertedInfo = await blogsCollection.insertOne(newBlog);

        if (!insertedInfo.insertedId) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Couldn't add blog."
            );
        }

        const insertedBlogId = insertedInfo.insertedId;

        return await getBlogById(insertedBlogId.toString());
    } catch (error) {
        throwCatchError(error);
    }
}

async function getBlogById(_blogId) {
    try {
        validator.isBlogGetTotalFieldsValid(arguments.length);

        const blogId = validator.isIdValid(xss(_blogId), "blog id");

        const parsedObjectId = validator.isObjectIdValid(blogId);

        const blogsCollection = await blogs();

        const blog = await blogsCollection.findOne(
            { _id: parsedObjectId },
            {
                projection: {
                    _id: {
                        $toString: "$_id",
                    },
                    title: 1,
                    body: 1,
                    userThatPosted: {
                        _id: { $toString: "$userThatPosted._id" },
                        username: 1,
                    },
                    comments: {
                        $map: {
                            input: "$comments",
                            in: {
                                _id: { $toString: "$$this._id" },
                                comment: "$$this.comment",
                                userThatPostedComment: {
                                    _id: {
                                        $toString:
                                            "$$this.userThatPostedComment._id",
                                    },
                                    username:
                                        "$$this.userThatPostedComment.username",
                                },
                            },
                        },
                    },
                },
            }
        );

        if (!blog) {
            throwError(ErrorCode.NOT_FOUND, "Error: Blog not found.");
        }

        return blog;
    } catch (error) {
        throwCatchError(error);
    }
}

async function update(_userId, _blogId, updateBlog) {
    try {
        validator.isBlogUpdateTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");
        const parsedUserObjectId = validator.isObjectIdValid(userId);

        const blogId = validator.isIdValid(xss(_blogId), "blog id");
        const parsedBlogObjectId = validator.isObjectIdValid(blogId);

        validateUpdateBlog(updateBlog);

        await isValidUser(parsedUserObjectId);

        const blogsCollection = await blogs();

        const blog = await blogsCollection.findOne({
            _id: parsedBlogObjectId,
            "userThatPosted._id": parsedUserObjectId,
        });

        if (!blog) {
            throwError(ErrorCode.NOT_FOUND, "Error: Blog not found.");
        }

        const toBeUpdated = {};

        let isAnyChange = false;

        if (updateBlog.title) {
            toBeUpdated.title = validator.isTitleValid(xss(updateBlog.title));

            isAnyChange = toBeUpdated.title === blog.title ? false : true;
        }

        if (updateBlog.body) {
            toBeUpdated.body = validator.isBodyValid(xss(updateBlog.body));

            isAnyChange =
                toBeUpdated.body === blog.body && !isAnyChange ? false : true;
        }

        if (Object.keys(toBeUpdated).length < 1) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: At least 1 field is required for updation."
            );
        }

        if (!isAnyChange) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: No fields have been changed from their initial values, so no update has occurred."
            );
        }

        const updatedInfo = await blogsCollection.updateOne(
            {
                _id: parsedBlogObjectId,
                "userThatPosted._id": parsedUserObjectId,
            },
            { $set: toBeUpdated }
        );

        if (updatedInfo.modifiedCount !== 1) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Could not update blog."
            );
        }

        return await getBlogById(blogId);
    } catch (error) {
        throwCatchError(error);
    }
}

async function createComment(_userId, _username, _blogId, _comment) {
    try {
        validator.isCreateCommentTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");
        const parsedUserObjectId = validator.isObjectIdValid(userId);

        const username = validator.isUsernameValid(xss(_username));

        const blogId = validator.isIdValid(xss(_blogId), "blog id");
        const parsedBlogObjectId = validator.isObjectIdValid(blogId);

        const comment = validator.isCommentValid(xss(_comment));

        const user = await isValidUser(parsedUserObjectId);

        if (user.username !== username) {
            throwError(ErrorCode.NOT_FOUND, "Error: User not found.");
        }

        const blogsCollection = await blogs();

        const blog = await blogsCollection.findOne({
            _id: parsedBlogObjectId,
        });

        if (!blog) {
            throwError(ErrorCode.NOT_FOUND, "Error: Blog not found.");
        }

        const newComment = {
            _id: ObjectId(),
            userThatPostedComment: {
                _id: parsedUserObjectId,
                username: username,
            },
            comment: comment,
        };

        const updatedInfo = await blogsCollection.updateOne(
            { _id: parsedBlogObjectId },
            {
                $push: { comments: newComment },
            }
        );

        if (updatedInfo.modifiedCount !== 1) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Could not add comment."
            );
        }

        return await getBlogById(blogId);
    } catch (error) {
        throwCatchError(error);
    }
}

async function getBlogs(_skip, _take) {
    try {
        validator.isGetBlogsTotalFieldsValid(arguments.length);

        const DEFAULT_SKIP = 0;
        const skip = _skip ? validator.isSkipValid(xss(_skip)) : DEFAULT_SKIP;

        const DEFAULT_TAKE = 20;
        const take = _take ? validator.isTakeValid(xss(_take)) : DEFAULT_TAKE;

        const blogsCollection = await blogs();

        const relevantBlogs = await blogsCollection
            .find(
                {},
                {
                    projection: {
                        _id: {
                            $toString: "$_id",
                        },
                        title: 1,
                        body: 1,
                        userThatPosted: {
                            _id: { $toString: "$userThatPosted._id" },
                            username: 1,
                        },
                        comments: {
                            $map: {
                                input: "$comments",
                                in: {
                                    _id: { $toString: "$$this._id" },
                                    comment: "$$this.comment",
                                    userThatPostedComment: {
                                        _id: {
                                            $toString:
                                                "$$this.userThatPostedComment._id",
                                        },
                                        username:
                                            "$$this.userThatPostedComment.username",
                                    },
                                },
                            },
                        },
                    },
                }
            )
            .skip(skip)
            .limit(take)
            .toArray();

        return relevantBlogs;
    } catch (error) {
        throwCatchError(error);
    }
}

async function deleteComment(_userId, _blogId, _commentId) {
    try {
        validator.isDeleteCommentTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");
        const parsedUserObjectId = validator.isObjectIdValid(userId);

        const blogId = validator.isIdValid(xss(_blogId), "blog id");
        const parsedBlogObjectId = validator.isObjectIdValid(blogId);

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

        const updatedInfo = await blogsCollection.updateOne(
            {
                _id: parsedBlogObjectId,
            },
            {
                $pull: {
                    comments: {
                        _id: parsedCommentObjectId,
                    },
                },
            }
        );

        if (updatedInfo.modifiedCount !== 1) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Could not delete comment."
            );
        }

        return { commentId: commentId, deleted: true };
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

function validateUpdateBlog(updateBlog) {
    isArgumentObject(updateBlog, "update blog");
    isObjectEmpty(updateBlog, "update blog");

    const validTotalUpdateElements = [1, 2];

    if (!validTotalUpdateElements.includes(Object.keys(updateBlog).length)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Update blog has invalid number of parameters."
        );
    }

    if (
        !updateBlog.hasOwnProperty("title") &&
        !updateBlog.hasOwnProperty("body")
    ) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Update blog does not have valid parameters."
        );
    }
}

const isArgumentObject = (obj, variableName) => {
    if (!isObject(obj)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid argument passed for ${
                variableName || "provided variable"
            }. Expected object.`
        );
    }
};

const isObject = (obj) => {
    return (
        !Array.isArray(obj) &&
        typeof obj === "object" &&
        obj !== null &&
        obj instanceof Object &&
        obj.constructor === Object
    );
};

const isObjectEmpty = (obj, variableName) => {
    if (Object.keys(obj).length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty object passed for ${
                variableName || "provided variable"
            }.`
        );
    }
};

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
    create,
    getBlogById,
    update,
    createComment,
    getBlogs,
    deleteComment,
};
