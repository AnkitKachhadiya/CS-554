const express = require("express");
const router = express.Router();
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
    console.log("Hello12");
});

router.post("/login", async (request, response) => {
    console.log("Hello1");
});

module.exports = router;
