const express = require("express");
const app = express();
const configRoutes = require("./routes");
const session = require("express-session");

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

configRoutes(app);

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
