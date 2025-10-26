const express = require("express");
// const userRoutes = require("./routes/userRoutes");

const app = express();

// app.use()

app.use(express.json());

app.get("/", (req, res) => {
    const greetings = "halo jo cow weee";
    res.send(greetings);
});

module.exports = app;