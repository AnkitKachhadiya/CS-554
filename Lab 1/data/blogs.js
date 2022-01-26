const mongoCollections = require("../config/mongoCollections");
const blogs = mongoCollections.blogs;
const users = mongoCollections.users;
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");

async function create(_userId, _username, _title, _body) {
    try {
        validator.isBlogCreateTotalFieldsValid(arguments.length);

        const userId = validator.isIdValid(xss(_userId), "user id");

        const parsedObjectId = validator.isObjectIdValid(userId);
        const username = validator.isUsernameValid(xss(_username));
        const title = validator.isTitleValid(xss(_title));
        const body = validator.isBodyValid(xss(_body));

        await isValidUser(parsedObjectId);

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

        return await get(insertedBlogId.toString());
    } catch (error) {
        throwCatchError(error);
    }
}

async function get(_blogId) {
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
                        _id: { $toString: "$_id" },
                        username: 1,
                    },
                    comments: 1,
                },
            }
        );

        if (!blog) {
            throwError(ErrorCode.NOT_FOUND, "Error: Blog not found.");
        }

        return blog;
    } catch (error) {
        console.log(error);
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

            isAnyChange = toBeUpdated.body === blog.body ? false : true;
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

        return await get(blogId);
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
    create,
    get,
    update,
};
