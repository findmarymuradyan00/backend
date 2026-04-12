const fs = require("node:fs").promises
const path = require("node:path")
const raw = require("./raw.js")


const fullFileName=path.resolve(process.argv[2])

async function handler(fileName){
   try{
        const stats=await fs.stat(fileName)

        if(stats.size<1000){
            await fs.writeFile(fileName, JSON.stringify(raw, null, 2))
        }

   } catch (err){
    console.log(err)
   }

}

handler(fullFileName)