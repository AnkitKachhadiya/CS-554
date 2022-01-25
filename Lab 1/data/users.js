const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const xss = require("xss");
const validator = require("../helpers/validator");
const ErrorCode = require("../helpers/error-code");
const bcryptjs = require("bcryptjs");

const SALT_ROUNDS = 16;

async function create(_name, _username, _password) {
    try {
        validator.isUserCreateTotalFieldsValid(arguments.length);

        const name = validator.isNameValid(xss(_name));
        const username = validator.isUsernameValid(xss(_username));
        const password = validator.isPasswordValid(xss(_password));

        const usersCollection = await users();

        const user = await usersCollection.findOne({ username: username });

        if (user) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Already registered with given username."
            );
        }

        const passwordHash = await bcryptjs.hash(password, SALT_ROUNDS);

        const newUser = {
            name: name,
            username: username,
            password: passwordHash,
        };

        const insertedInfo = await usersCollection.insertOne(newUser);

        if (!insertedInfo.insertedId) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Couldn't add user."
            );
        }
        const insertedUserId = insertedInfo.insertedId;

        return await get(insertedUserId.toString());
    } catch (error) {
        throwCatchError(error);
    }
}

async function checkUser(_username, _password) {
    try {
        validator.isCheckUserTotalFieldsValid(arguments.length);

        const username = validator.isUsernameValid(xss(_username));
        const password = validator.isPasswordValid(xss(_password));

        const usersCollection = await users();

        const user = await usersCollection.findOne(
            { username: username },
            {
                projection: {
                    _id: {
                        $toString: "$_id",
                    },
                    name: 1,
                    username: 1,
                    password: 1,
                },
            }
        );

        if (!user) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Incorrect username or password."
            );
        }

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Incorrect username or password."
            );
        }

        delete user.password;

        return user;
    } catch (error) {
        throwCatchError(error);
    }
}

async function get(_userId) {
    try {
        const userId = validator.isIdValid(xss(_userId), "user id");

        const parsedObjectId = validator.isObjectIdValid(userId);

        const usersCollection = await users();

        const user = await usersCollection.findOne(
            { _id: parsedObjectId },
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
    create,
    checkUser,
};
