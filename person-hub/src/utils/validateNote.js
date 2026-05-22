const AppError = require("./AppError")

const validateNote = (title, body, tags, isUpdate = false) => {
    if (isUpdate && title === undefined && body === undefined && tags === undefined) {
        throw new AppError("at least one field must be provided", 400)
    }

    if ((isUpdate ? title !== undefined : true) && (typeof title !== "string" || title.length < 1 || title.length > 100)) {
        throw new AppError("title must be a string between 1 and 100 characters", 400)
    }

    if ((isUpdate ? body !== undefined : true) && (typeof body !== "string" || body.length < 1 || body.length > 2000)) {
        throw new AppError("body must be a string up to 2000 characters", 400)
    }

    if (tags !== undefined) {
        if (!Array.isArray(tags)) {
            throw new AppError("tags must be an array", 400)
        }

        const invalidTag = tags.find(tag => typeof tag !== "string" || tag.length < 1 || tag.length > 20)
        if (invalidTag !== undefined) {
            throw new AppError("each tag must be a string between 1 and 20 characters", 400)
        }
    }
}

module.exports = validateNote
