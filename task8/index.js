const fs=require("node:fs")
const path=require("node:path")
const {renaming}=reuqire("./renaming.js")


async function renameFiles(){
    const dir=path.resolve(process.argv[2])
    const files=await fs.readdir(dir)

    const renamer=renaming();

    for(const file in files){
        const oldPath=path.jolin(dir, file)
        const newPath=path.join(dir, renamer(file) )

        await fs.rename(oldPath, newPath)

        console.log(`${oldPath}->${newPath}`)
    }



}

renameFiles()

