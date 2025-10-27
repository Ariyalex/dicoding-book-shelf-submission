const { nanoid } = require("nanoid");

let books = [];

function getAllBooks() {
    return books;
}

function getBookById(id) {
    return books.find(book => book.id === id);
}

function addBook(bookData) {
    const newBook = { id: nanoid(16), finished: false, insertedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...bookData };
    books.push(newBook);
    return newBook;
}

function updateBook(id, updatedData) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], updatedAt: new Date().toISOString(), ...updatedData };
        return books[bookIndex];
    };
    return null;
}

function deleteBook(id) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        return books.splice(bookIndex, 1)[0];
    };
    return null;
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};