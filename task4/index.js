const path=require("node:path")
const fs=require("node:fs")
const {parsing}=require("./template-engine.js")

const data=fs.readFileSync("./template.txt", 'utf-8')
const varObj=JSON.parse(fs.readFileSync("./varObj.json", 'utf-8'))

const fullPathName=path.resolve("output.txt")
const result=parsing(data, varObj)

fs.writeFileSync(fullPathName, result)


