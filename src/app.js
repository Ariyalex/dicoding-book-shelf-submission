const express = require("express");
const router = require("./routes/booksRoutes");

const app = express();

app.use(express.json());

app.use("/books", router);


module.exports = app;