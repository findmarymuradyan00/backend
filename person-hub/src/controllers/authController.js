const { registerUser, loginUser, meHandler } = require("../services/authService")
const asyncHandler = require("../utils/asyncHandler")

const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const newUser = await registerUser(username, password)
    res.status(201).json(newUser)
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const token = await loginUser(username, password)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: "Logged in successfully" })
})

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })
    res.status(200).json({ message: "Logged out successfully" })
}

const me = asyncHandler((req, res) => {
    const user = meHandler(req.user.id)
    res.status(200).json(user)
})

module.exports = { register, login, logout, me }
