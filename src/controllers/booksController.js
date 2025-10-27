const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require("../models/bookModel")

const getBooks = (req, res) => {
    const { reading, finished, name } = req.query;
    let books = getAllBooks();

    if (reading !== undefined) {
        const isReading = reading === "1";
        books = books.filter(book => book.reading === isReading);
    }

    if (finished !== undefined) {
        const isFinished = finished === "1";
        books = books.filter(book => book.finished === isFinished);
    }

    if (name !== undefined) {
        books = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    const filteredBooks = books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));
    res.status(200).json({
        status: "success",
        data: {
            books: filteredBooks
        }
    });
};

const getBook = (req, res) => {
    const { id } = req.params;
    const book = getBookById(id);
    if (book) {
        res.status(200).json({
            status: "success",
            data: {
                book
            }
        });
    } else {
        res.status(404).json({
            status: "fail",
            message: "Buku tidak ditemukan",
        });
    }
};

const createBook = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    if (!name) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
    }
    if (readPage > pageCount) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
    }
    const finished = pageCount === readPage;
    const newBook = addBook({
        name, year, author, summary, publisher, pageCount, readPage, finished, reading
    });
    res.status(201).json({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: newBook.id,
        }
    });
}

const updateBookHandler = (req, res) => {
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
    }
    if (readPage > pageCount) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
    }

    const finished = pageCount === readPage;
    const updatedBook = updateBook(id, { name, year, author, summary, publisher, pageCount, readPage, readPage, finished });
    if (updatedBook) {
        res.status(200).json({
            status: "success",
            message: "Buku berhasil diperbarui"
        });
    } else {
        res.status(404).json({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });
    }
};

const deleteBookHandler = (req, res) => {
    const { id } = req.params;
    const deletedBook = deleteBook(id);
    if (deletedBook) {
        res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus"
        });
    } else {
        res.status(404).json({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        });
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBookHandler,
    deleteBookHandler,
}
