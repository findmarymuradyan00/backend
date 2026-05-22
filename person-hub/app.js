const express = require("express")
const cookieParser = require("cookie-parser")
const notFoundMiddleware = require("./src/middlewares/notFoundMiddleware")
const errorMiddleware = require("./src/middlewares/errorMiddleware")
const authRouter = require("./src/routes/authRoutes")
const noteRouter = require("./src/routes/noteRoutes")
const bookRouter = require("./src/routes/bookRoutes")
const habitRouter = require("./src/routes/habitRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/notes", noteRouter)
app.use("/api/books", bookRouter)
app.use("/api/habits", habitRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

module.exports = app
