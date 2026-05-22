const AppError = require("./AppError")

const VALID_STATUSES = ["to-read", "reading", "finished"]

const validateBook = (title, author, status, rating, isUpdate = false) => {
    if (isUpdate && title === undefined && author === undefined && status === undefined && rating === undefined) {
        throw new AppError("at least one field must be provided", 400)
    }

    if ((isUpdate ? title !== undefined : true) && (typeof title !== "string" || title.length < 1 || title.length > 200)) {
        throw new AppError("title must be a string between 1 and 200 characters", 400)
    }

    if ((isUpdate ? author !== undefined : true) && (typeof author !== "string" || author.length < 1 || author.length > 100)) {
        throw new AppError("author must be a string between 1 and 100 characters", 400)
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new AppError("status must be one of: to-read, reading, finished", 400)
    }

    if (rating !== undefined && rating !== null) {
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw new AppError("rating must be an integer between 1 and 5", 400)
        }

        if (status !== undefined && status !== "finished") {
            throw new AppError("rating is only allowed when status is finished", 400)
        }
    }
}

module.exports = validateBook
