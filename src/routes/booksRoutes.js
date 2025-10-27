const express = require("express");
const { getBooks, getBook, createBook, updateBookHandler, deleteBookHandler } = require("../controllers/booksController");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBookHandler);
router.delete("/:id", deleteBookHandler);

module.exports = router;