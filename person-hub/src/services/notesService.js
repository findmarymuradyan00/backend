const { getAll, saveAll } = require("../models/noteModel")
const AppError = require("../utils/AppError")
const { generateId } = require("../utils/id")
const validateNote = require("../utils/validateNote")

const getAllNotes = (userId, tag) => {
    const notes = getAll()

    let userNotes = notes.filter(note => note.ownerId === userId)

    if (tag) {
        userNotes = userNotes.filter(note => note.tags.includes(tag))
    }

    return userNotes
}

const getNoteById = (id, userId) => {
    const notes = getAll()
    const note = notes.find(note => note.id === id)

    if (!note || note.ownerId !== userId) {
        throw new AppError("Note not found", 404)
    }

    return note
}

const createNote = (userId, title, body, tags) => {
    validateNote(title, body, tags)

    const notes = getAll()

    const newNote = {
        id: generateId("n"),
        ownerId: userId,
        title,
        body,
        tags: tags ?? [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
    notes.push(newNote)
    saveAll(notes)

    return newNote
}

const updateNote = (id, userId, title, body, tags) => {
    validateNote(title, body, tags, true)

    const notes = getAll()
    const note = notes.find(note => note.id === id)

    if (!note || note.ownerId !== userId) {
        throw new AppError("Note not found", 404)
    }

    if (title !== undefined) note.title = title
    if (body !== undefined) note.body = body
    if (tags !== undefined) note.tags = tags
    note.updatedAt = new Date()

    saveAll(notes)

    return note
}

const deleteNote = (id, userId) => {
    const notes = getAll()
    const note = notes.find(note => note.id === id)

    if (!note || note.ownerId !== userId) {
        throw new AppError("Note not found", 404)
    }

    const filtered = notes.filter(n => n.id !== id)
    saveAll(filtered)

    return { message: "Note deleted successfully" }
}

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote }
