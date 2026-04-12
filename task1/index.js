const path=require("node:path")
const fs=require("node:fs").promises
const {transform}=require("./data-processor.js")

const inFile=path.join(__dirname, "input.json")
const outFile=path.join(__dirname, "output.json")

async function readData(){
    try{
    const data=await fs.readFile(inFile)

    const parsed=JSON.parse(data.toString());
    const res= transform(parsed);

    await fs.writeFile(outFile, JSON.stringify(res, null, 2))
    }
    catch (err){
        console.error(err)
    }

}
readData()