const fs = require("node:fs").promises
const path = require("node:path")
const { filterList } = require("./filterList.js")

const dirPath = path.resolve(process.argv[2]);
const ext = process.argv[3];

async function listing() {
    try {
        const listDir = await fs.readdir(dirPath)
        const result = filterList(listDir, ext)

        const res = result
            .map((p) => path.join(dirPath, p))
            .join("\n")
        console.log(res)
    }
    catch (err){
        console.error(err)
    }
   
}

listing()