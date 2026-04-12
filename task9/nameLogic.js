const path = require("node:path")

function nameLogic(fileName, pathName) {
    const lastDotIndex = fileName.lastIndexOf(".")

    const name = fileName.slice(0, lastDotIndex)
    const ext = fileName.slice(lastDotIndex + 1)

    const newFileName = name + "_backup." + ext

    return path.join(pathName, newFileName)
}

module.exports = { nameLogic }