const AppError = require("../utils/AppError")
const { verifyToken } = require("../utils/token")

const auth = (req, res, next) => {
    try {
        let token

        const authHeader = req.headers.authorization

        if (authHeader) {
            const [type, value] = authHeader.split(" ")

            if (type !== "Bearer") {
                return next(new AppError("Authorization header must use Bearer scheme", 401))
            }

            token = value
        }

        if (!token) {
            token = req.cookies.token
        }

        if (!token) {
            throw new AppError("No token provided", 401)
        }

        const decoded = verifyToken(token)

        req.user = { id: decoded.id }

        next()
    } catch (err) {
        next(err instanceof AppError ? err : new AppError("Invalid or expired token", 401))
    }
}

module.exports = auth
