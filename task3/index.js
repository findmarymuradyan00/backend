const path=require("node:path")
const fs=require("node:fs").promises
const {generate}=require("./codeGenerator")

const title = process.argv[2]
const dir=path.resolve(process.argv[3])

const content=generate(title)

const fullFileName=title+".html"
const fullPathName=path.join(dir, fullFileName)

async function writeNewFile(){
    try{
         await fs.writeFile(fullPathName, content)
    }
    catch (err){
        console.error(err)
    }
}

writeNewFile()

