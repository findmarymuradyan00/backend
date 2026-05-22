const { getAll, saveAll } = require("../models/bookModel")
const AppError = require("../utils/AppError")
const validateBook = require('../utils/validateBook')
const { generateId } = require('../utils/id')

const getAllBooks = (userId, status) => {
    const books = getAll()

    let userBooks = books.filter(book => book.ownerId === userId)

    if (status) {
        userBooks = userBooks.filter(book => book.status === status)
    }

    return userBooks
}

const getBookById = (id, userId) => {
    const books = getAll()
    const book = books.find(book => book.id === id)

    if (!book || book.ownerId !== userId) {
        throw new AppError("Book not found", 404)
    }

    return book
}

const createBook = (userId, title, author, status = "to-read", rating) => {
    validateBook(title, author, status, rating)

    const books = getAll()

    const newBook = {
        id: generateId("b"),
        ownerId: userId,
        title,
        author,
        status,
        rating: rating ?? null,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    books.push(newBook)
    saveAll(books)

    return newBook
}

const updateBook = (id, userId, title, author, status, rating) => {
    validateBook(title, author, status, rating, true)

    const books = getAll()
    const book = books.find(book => book.id === id)

    if (!book || book.ownerId !== userId) {
        throw new AppError("Book not found", 404)
    }

    if (title !== undefined) book.title = title
    if (author !== undefined) book.author = author
    if (status !== undefined) book.status = status
    if (rating !== undefined) book.rating = rating
    book.updatedAt = new Date()

    saveAll(books)
    return book
}

const deleteBook = (id, userId) => {
    const books = getAll()
    const book = books.find(book => book.id === id)

    if (!book || book.ownerId !== userId) {
        throw new AppError("Book not found", 404)
    }

    const filtered = books.filter(b => b.id !== id)
    saveAll(filtered)

    return { message: "Book deleted successfully" }
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook }
