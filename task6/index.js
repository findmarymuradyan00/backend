const fs = require("node:fs/promises")
const path = require("node:path")
const { parsing } = require("./parsing.js")

async function run() {
    try {
        const filePath = path.join(__dirname, "config.env")

        const content = await fs.readFile(filePath, "utf-8")
        const result = parsing(content);

        const configObjFileName = path.resolve(__dirname, "configObj.txt")

        await fs.writeFile(configObjFileName, JSON.stringify(result, null, 2))

    } catch (err) {
        console.error(err)
    }
}

run();