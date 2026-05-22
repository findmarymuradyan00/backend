const asyncHandler = require("../utils/asyncHandler")
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require("../services/booksService")
const getAll = asyncHandler((req, res) => {
    const { status } = req.query
    const books = getAllBooks(req.user.id, status)
    res.status(200).json(books)
})

const getById = asyncHandler((req, res) => {
    const book = getBookById(req.params.id, req.user.id)
    res.status(200).json(book)
})

const create = asyncHandler((req, res) => {
    const { title, author, status, rating } = req.body
    const book = createBook(req.user.id, title, author, status, rating)
    res.status(201).json(book)
})

const update = asyncHandler((req, res) => {
    const { title, author, status, rating } = req.body
    const book = updateBook(req.params.id, req.user.id, title, author, status, rating)
    res.status(200).json(book)
})

const remove = asyncHandler((req, res) => {
    const result = deleteBook(req.params.id, req.user.id)
    res.status(200).json(result)
})

module.exports = { getAll, getById, create, update, remove }