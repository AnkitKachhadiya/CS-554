const express = require("express");
const app = express();
const configRoutes = require("./routes");

const PORT = process.env.PORT || 3000;

configRoutes(app);

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
