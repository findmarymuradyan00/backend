
const fs=require("node:fs")
const path=require("node:path")
const {logger}=require("./logger.js")

const command=process.argv[2]
const commandTimestamped=logger(command)

const fullPathName=path.resolve("result.txt");


fs.appendFile(fullPathName, commandTimestamped, (err) => {
    if (err) {
        console.log("Error writing file:", err)
    } 
});