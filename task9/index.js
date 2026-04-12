const fs = require("node:fs/promises");
const path = require("node:path");
const { nameLogic } = require("./nameLogic.js")

async function copyFile(sourceFile, targetPathName) {
    try {
        const fullSourceFile = path.resolve(sourceFile)

        const fullTargetPath = nameLogic(sourceFile, targetPathName)

        await fs.copyFile(fullSourceFile, fullTargetPath)

        console.log("File copied successfully")
    } catch (err) {
        console.log("Error:", err)
    }
}

copyFile("./copyfile.txt", "../task2")