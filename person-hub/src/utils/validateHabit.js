const AppError = require("./AppError")

const VALID_FREQUENCIES = ["daily", "weekly", "monthly"]

const validateHabit = (name, frequency, isUpdate = false) => {
    if (isUpdate && name === undefined && frequency === undefined) {
        throw new AppError("at least one field must be provided", 400)
    }

    if ((isUpdate ? name !== undefined : true) && (typeof name !== "string" || name.length < 1 || name.length > 60)) {
        throw new AppError("name must be a string between 1 and 60 characters", 400)
    }

    if ((isUpdate ? frequency !== undefined : true) && !VALID_FREQUENCIES.includes(frequency)) {
        throw new AppError("frequency must be one of: daily, weekly, monthly", 400)
    }
}

module.exports = { validateHabit }
