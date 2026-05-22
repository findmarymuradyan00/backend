const { getAll, saveAll } = require("../models/userModel")
const AppError = require("../utils/AppError")
const { hashPassword, verifyPassword } = require("../utils/hash")
const { generateId } = require("../utils/id")
const { signToken } = require("../utils/token")

const registerUser = async (username, password) => {
    if (!username || typeof username !== "string") {
        throw new AppError("username is required and must be a string", 400)
    }
    if (!password || typeof password !== "string") {
        throw new AppError("password is required and must be a string", 400)
    }

    const users = getAll()

    if (users.find(u => u.username === username)) {
        throw new AppError("Username already taken", 409)
    }

    const hashedPassword = await hashPassword(password)

    const newUser = {
        id: generateId("u"),
        username,
        password: hashedPassword,
        createdAt: new Date()
    }
    users.push(newUser)
    saveAll(users)

    const { password: _, ...safeUser } = newUser
    return safeUser
}

const loginUser = async (username, password) => {
    if (!username || typeof username !== "string") {
        throw new AppError("username is required and must be a string", 400)
    }
    if (!password || typeof password !== "string") {
        throw new AppError("password is required and must be a string", 400)
    }

    const users = getAll()
    const user = users.find(u => u.username === username)

    if (!user) {
        throw new AppError("Invalid username or password", 401)
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
        throw new AppError("Invalid username or password", 401)
    }

    return signToken({ id: user.id })
}

const meHandler = (id) => {
    const users = getAll()
    const user = users.find(u => u.id === id)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const { password, ...safeUser } = user
    return safeUser
}

module.exports = { registerUser, loginUser, meHandler }
