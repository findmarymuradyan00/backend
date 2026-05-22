const path = require('node:path')

const BOOKSPATH  = path.join(__dirname, '../../data/books.json')
const HABITSPATH = path.join(__dirname, '../../data/habits.json')
const NOTESPATH  = path.join(__dirname, '../../data/notes.json')
const USERSPATH  = path.join(__dirname, '../../data/users.json')

module.exports = { BOOKSPATH, HABITSPATH, NOTESPATH, USERSPATH }
