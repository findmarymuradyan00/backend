const asyncHandler = require("../utils/asyncHandler")
const { getAllNotes, getNoteById, createNote, updateNote, deleteNote } = require("../services/notesService")

const getAll = asyncHandler((req, res) => {
    const { tag } = req.query
    const notes = getAllNotes(req.user.id, tag)
    res.status(200).json(notes)
})

const getById = asyncHandler((req, res) => {
    const note = getNoteById(req.params.id, req.user.id)
    res.status(200).json(note)
})

const create = asyncHandler((req, res) => {
    const { title, body, tags } = req.body
    const newNote = createNote(req.user.id, title, body, tags)
    res.status(201).json(newNote)
})

const update = asyncHandler((req, res) => {
    const { title, body, tags } = req.body
    const note = updateNote(req.params.id, req.user.id, title, body, tags)
    res.status(200).json(note)
})

const remove = asyncHandler((req, res) => {
    const result = deleteNote(req.params.id, req.user.id)
    res.status(200).json(result)
})

module.exports = { getAll, getById, create, update, remove }