const express = require("express");
const router = express.Router();
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
    console.log("Hello");
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
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.post("/login", async (request, response) => {
    console.log("Hello1");
});

const throwError = (code = 500, message = "Internal Server Error") => {
    throw { code, message };
};

module.exports = router;
