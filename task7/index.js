const fs=require("node:fs")
const path=require("node:path")
const struct=require("./dirStrcture.js")

function makeDirectory(struct, base="."){
    
    if(struct!=null && typeof struct=="object"){
        for(const key in struct){
            const fullPathName=path.join(base, key)
            fs.mkdir(fullPathName,(err) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log("Folder created")
            })
            makeDirectory(struct[key], fullPathName)
        }
    }
}
makeDirectory(struct)